from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib import messages
from app1.form import UserRegistrationForm,LoginForm
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.contrib.auth import authenticate,login
from django.contrib.auth.decorators import login_required
from .models import UserProfile
from django.http import JsonResponse

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
            User.objects.create_user(username, useremail, userpassword)
            messages.success(request, _("Registration successful! Welcome, %(username)s."), {'username': username})
            return redirect('userdetails') 
        else:
            for error in form.errors.values():
                messages.error(request, error)
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
                messages.error(request, "Invalid username or password")
        else:

            messages.error(request, "Please correct the errors below.")
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form})


   

def forgetPassword(request):
    return render(request,'forgetpassword.html')
def emailverifymessage(request):
    return render(request,'emailverifymessage.html')
def resetPassword(request):
    return render(request,'resetpassword.html')

@login_required
def userdetails(request):
    if request.method == 'POST':
        user = request.user
        user_profile = request.FILES.get('avatar')
        dob = request.POST.get('dob')
        gender = request.POST.get('gender')

        # Update or create the UserProfile
        userdetails, created = UserProfile.objects.get_or_create(user=user)

        # Log the values to debug
        print(f"Avatar: {user_profile}, DOB: {dob}, Gender: {gender}")

        if user_profile:
            userdetails.user_profile = user_profile  # Save the uploaded file
        if dob:
            userdetails.dob = dob
        if gender:
            userdetails.gender = gender

        userdetails.save()

        return redirect('gamepage01')
    
    return render(request, 'userdetails.html')


def gamepage01(request):
    return render(request,'gamepage01.html')
def notification(request):
    return render(request,'notification.html')
def seeAllgames(request):
    return render(request,'seeAllgames.html')
def paymentMethod(request):
    return render(request,'paymentMethod.html')
def paymentconfirmation(request):
    return render(request,'paymentConfirmation.html')
def successfulpayment(request):
    return render(request,'successfulpayment.html')
def editProfile(request):
    return render(request,'editProfile.html')
def language(request):
    return render(request,'language.html')
def location(request):
    return render(request,'location.html')
def setting(request):
    return render(request,'setting.html')
