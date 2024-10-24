from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from app1.form import UserRegistrationForm,LoginForm
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.contrib.auth import authenticate,login
from django.contrib.auth.decorators import login_required
from .models import UserProfile,SupportTicket,PurchasedTickets
from django.db.models import Sum
from django.http import JsonResponse
import json
from rest_framework import generics
from .serializers import SupportTicketSerializer
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
import requests


def index(request):
    return render(request,'index.html')
def signup(request):
    return render(request,'signup.html')
def signupemail(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            useremail = form.cleaned_data['email']
            userpassword = form.cleaned_data['password']
            user = User.objects.create_user(username, useremail, userpassword)
            user.save()
            return redirect('loginemail') 
        else:
            for error in form.errors.values():
                errormessage = messages.error(request, error)
    else:
        form = UserRegistrationForm()
    return render(request, 'signupemail.html', {'form': form})


def loginshow(request):
    return render(request,'loginshow.html')


def loginemail(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            remember_me = form.cleaned_data.get('remember_me')

            # Authenticate the user using username and password
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                if not remember_me:
                    request.session.set_expiry(0)  
                messages.success(request, "Login successful!")
                return redirect('userdetails') 
            else:
                errormessage = messages.error(request, "Invalid username or password")
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form})


   

def forgetPassword(request):
    return render(request,'forgetpassword.html')
def emailverifymessage(request):
    return render(request,'emailverifymessage.html')
def resetPassword(request):
    return render(request,'resetpassword.html')

def userdetails(request):
    if request.method == 'POST':
        user = request.user
        name = request.POST.get('name')
        user_profile = request.FILES.get('avatar')
        dob = request.POST.get('dob')
        gender = request.POST.get('gender')

        # Update or create the UserProfile
        userdetails, created = UserProfile.objects.get_or_create(user=user)

        if name:
            userdetails.name = name
        if user_profile:
            userdetails.user_profile = user_profile
        if dob:
            userdetails.dob = dob
        if gender:
            userdetails.gender = gender

        userdetails.save()

        # Return success response as JSON
        return JsonResponse({'status': 'success'})

    # For non-POST requests, render the HTML page
    return render(request, 'userdetails.html')

def gamepage01(request):
    user = request.user
    print(user)
    try:
        user_profile = UserProfile.objects.get(user=user)
        name = UserProfile.objects.get(user=user) 
        response = requests.get('http://107.23.241.131/api/getTickets/')
        tickets = response.json()
        purchasedTicket = PurchasedTickets.objects.filter(user=user)
        total_count = PurchasedTickets.objects.filter(user=user).aggregate(total=Sum('ticket_count'))['total']


    except UserProfile.DoesNotExist:
        user_profile = None

   
    return render(request,'gamepage01.html',{
        'user': user,
        'user_profile': user_profile,
        'name':name,
        'tickets':tickets,
        'purchasedTicket':purchasedTicket,
        'totalcount':total_count
    })



def supportTicket(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            user = request.user
            email = user.email
        try:
            # Use request.POST for text fields and request.FILES for files
            title = request.POST.get('title')
            description = request.POST.get('description')
            attachments = request.FILES.get('attachment')

            if not title or not description or not attachments:
                return JsonResponse({'error': "Ticket title, description, and attachment are required."}, status=400)

            submitTicket = SupportTicket(
                user_profile=request.user.userprofile,
                useremail = email,
                title=title,
                description=description,
                attachment=attachments  # Make sure this field can accept file uploads
            )         
            submitTicket.save()
            return JsonResponse({'status': 'success', 'message': 'Ticket submitted successfully.'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
        
class TicketListView(generics.ListAPIView):
    queryset = SupportTicket.objects.all()
    serializer_class = SupportTicketSerializer


    
def notification(request):
    return render(request,'notification.html')
def seeAllgames(request):
    return render(request,'seeAllgames.html')
def paymentMethod(request):
    return render(request,'paymentMethod.html')

def paymentconfirmation(request):
    if request.method == 'POST':
        # Parse the data from the frontend (ticket info sent via fetch request)
        ticket_data = json.loads(request.body)
        ticket_id = ticket_data.get('id')
        ticket_name = ticket_data.get('name')
        ticket_price = ticket_data.get('price')

        # Check if the user already has this ticket in their purchases
        purchased_ticket, created = PurchasedTickets.objects.get_or_create(
            user=request.user,
            ticketid=ticket_id,
            defaults={
                'ticketname': ticket_name,
                'ticketprice': ticket_price,
            }
        )

        if not created:
            purchased_ticket.ticket_count += 1
            purchased_ticket.save()

        return JsonResponse({'message': 'Ticket purchase recorded successfully'}, status=200)

    return render(request, 'paymentConfirmation.html')

def successfulpayment(request):
    return render(request,'successfulpayment.html') 
def editProfile(request):
    user = request.user
    try:
        user_profile = UserProfile.objects.get(user=user)

        if request.method == 'POST':
          

            fileInput = request.FILES.get('fileInput')
            fname = request.POST.get('fname')
            username = request.POST.get('username')
            email = request.POST.get('email')
            date = request.POST.get('date')
            currentPassword = request.POST.get('currentPassword')
            newPassword = request.POST.get('newPassword')
            confirmPassword = request.POST.get('confirmPassword')


            # Debugging prints
            print(f"fname: {fname}, username: {username}, date: {date}, fileInput: {fileInput}, currentPassword:{currentPassword},newPassword:{newPassword},confirmPassword:{confirmPassword},")

            # Update user fields
            if username:
                user.username = username
            if email:
                user.email = email    
            user.save()    
           

            # Update UserProfile fields
            if fname:
                user_profile.name = fname
            if date:
                user_profile.dob = date
            if fileInput:
                user_profile.user_profile = fileInput
            user_profile.save()
            

            if currentPassword and  newPassword and newPassword:

                if currentPassword:
                    if not user.check_password(currentPassword):
                        return JsonResponse({'error': 'Current password is incorrect.'}, status=400)
            

        # Step 2: Check if the new password matches confirm password
                if newPassword and currentPassword:
                    if newPassword != confirmPassword:
                        return JsonResponse({'error': 'New password and confirm password do not match.'}, status=400)

                try:
                    validate_password(newPassword,user=user)
                except ValidationError as e:
                    return JsonResponse({'error': e.messages}, status=400)
            
                user.set_password(newPassword)
                user.save()
                return redirect('loginemail')


        return render(request, 'editprofile.html', {
                'username': user.username,
                'email': user.email,
                'user_profile': user_profile,
                'name': user_profile.name,
                'dob': user_profile.dob,
            })
    except UserProfile.DoesNotExist:
        return HttpResponse("Profile not found", status=404)





def language(request):
    return render(request,'language.html')
def location(request):
    
    if request.method == 'POST':
        try:
            
            data = json.loads(request.body)
            location = data.get('location')
            latitude = data.get('latitude', None)
            longitude = data.get('longitude', None)

            # Assuming you have a UserProfile model linked to the user
            user_profile = UserProfile.objects.get(user=request.user)

            if location == 'current':
                user_profile.latitude = latitude
                user_profile.longitude = longitude
            else:
                user_profile.selected_location = location
                user_profile.latitude = None  # Clear any previous coordinates
                user_profile.longitude = None

            user_profile.save()

            return JsonResponse({'status': 'success', 'message': 'Location saved successfully'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'An error occurred'})
    
    return render(request,'location.html')
def setting(request):
    return render(request,'setting.html')