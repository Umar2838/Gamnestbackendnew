from django.contrib import admin
from django.urls import path
from app1 import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="index"),
    path('signup', views.signup, name="signup"),
    path('signupemail', views.signupemail, name="signupemail"),
    path('loginshow', views.loginshow, name="loginshow"),
    path('loginemail', views.loginemail, name="loginemail"),
    path('forgetPassword', views.forgetPassword, name="forgetpassword"),
    path('emailverifymessage', views.emailverifymessage, name="emailverifymessage"),
    path('resetPassword', views.resetPassword, name="resetpassword"),
    path('userdetails', views.userdetails, name="userdetails"),
    path('gamepage01', views.gamepage01, name="gamepage01"),
    path('submitTicket',views.supportTicket,name="supportTicket"),
    path('api/tickets/', views.TicketListView.as_view(), name='ticket-list'),
    path('notification', views.notification, name="notification"),
    path('seeAllgames', views.seeAllgames, name="seeAllgames"),
    path('paymentMethod', views.paymentMethod, name="paymentMethod"),
    path('paymentconfirmation', views.paymentconfirmation, name="paymentconfirmation"),
    path('successfulpayment', views.successfulpayment, name="successfulpayment"),
    path('editprofile', views.editProfile, name="editprofile"),
    path('language', views.language, name="language"),
    path('location', views.location, name="location"),
    path('setting', views.setting, name="setting"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

