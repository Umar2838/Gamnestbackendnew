# serializers.py
from rest_framework import serializers
from .models import SupportTicket

class SupportTicketSerializer(serializers.ModelSerializer):
    # If you want to display the user's name and profile picture
    user_name = serializers.CharField(source='user_profile.user.username', read_only=True)
    profile_picture = serializers.ImageField(source='user_profile.user_profile', allow_null=True, read_only=True)

    class Meta:
        model = SupportTicket
        fields = ['id', 'title', 'description', 'attachment', 'created_at', 'user_name', 'profile_picture','useremail']
