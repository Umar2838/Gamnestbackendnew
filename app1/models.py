
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=10 , null=True, blank=True)
    user_profile = models.ImageField(upload_to='avatars/', null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=(('Male', 'Male'), ('Female', 'Female')), null=True, blank=True)

    def __str__(self):
        return self.user.username 

class SupportTicket(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    useremail = models.EmailField(max_length=255 , null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    attachment = models.FileField(upload_to='tickets/attachments/', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
