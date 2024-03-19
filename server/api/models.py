from django.db import models
from django.contrib.auth.models import AbstractUser


class UserAccount(AbstractUser):
    
    USER_ROLES = {
        "admin" : "Admin",
        "professor": "Professor",
        "student" : "Student",    
    }
    
    default_img_url = "https://cdn-icons-png.flaticon.com/128/13403/13403524.png"
    
    middle_name = models.CharField(max_length=50, null=True)
    
    role = models.CharField(max_length=50, choices=USER_ROLES)
    
    profile_img = models.URLField(max_length=255, default=default_img_url)
    
    is_verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username