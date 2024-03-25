from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

        

# Create your models here.
class UserAccountManager(BaseUserManager):
    
    def create_user(self, email, lrn,  first_name, last_name, role, password=None):
        if not email:
            raise ValueError("User must have an email address.")
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, role=role, last_name=last_name, lrn=lrn)
        
        user.set_password(password)
        user.save()
        
        return user
    
    def create_superuser(self, email, lrn,  first_name, last_name, role, password=None):
        if not email:
            raise ValueError("User must have email address.")
        if not lrn:
            raise ValueError("User must have email address.")
        
        email = self.normalize_email(email)
        user = self.model(email=email, lrn=lrn, first_name=first_name, last_name=last_name, role="admin", is_staff=True, is_superuser=True)
        
        user.set_password(password)
        user.save()
        
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    
    USER_ROLES = {
        "admin" : "Admin",
        "teacher": "Teacher",
        "student" : "Student",    
    }
    default_img_url = "https://cdn-icons-png.flaticon.com/128/13403/13403524.png"
    
    email = models.EmailField(max_length=254, unique=True)
    lrn = models.CharField(max_length=25, null=False, unique=True)
    
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    middle_name = models.CharField(max_length=100, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    role = models.CharField(max_length=50, choices=USER_ROLES)
    date_joined = models.DateField(auto_now_add=True)
    profile_img = models.URLField(max_length=255, default=default_img_url)
    objects = UserAccountManager()
    USERNAME_FIELD = 'lrn'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'role']    
    
    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
    
    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.lrn + ' | ' + self.email
    
    
    
class ClassRoom(models.Model):

    name = models.CharField(max_length=100, null=False)
    code = models.CharField(max_length=50, null=False, unique=True)
    teacher = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    date_created = models.DateField(auto_now_add=False)
    batch = models.CharField(max_length=50, null=False)
    status = models.CharField(max_length=50, null=False)

    def __str__(self):
        return self.name


