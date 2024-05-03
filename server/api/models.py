from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from datetime import datetime
        

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
    class_id = models.CharField(max_length=50, null=True)
    mastery = models.DecimalField(max_digits=5, decimal_places=1, default=0)
    pretest = models.IntegerField(null=True)
    posttest = models.IntegerField(null=True)
    
    objects = UserAccountManager()
    USERNAME_FIELD = 'lrn'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'role', 'mastery', 'pretest', 'posttest']
    
      
    
    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
    
    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.lrn + ' | ' + self.email
    
    
    
class ClassRoom(models.Model):

    name = models.CharField(max_length=100, null=False)
    code = models.CharField(max_length=50, null=False, unique=True)
    teacher = models.CharField(max_length=50, null=False)
    date_created = models.DateField(auto_now_add=True)
    batch = models.CharField(max_length=50, null=False, default=datetime.now().year)
    status = models.CharField(max_length=50, null=False)

    def __str__(self):
        return self.name
    
    
class Assessment(models.Model):
    TEST_TYPES = {
        "formative": "FORMATIVE",
        "post_test": "POST-TEST",
        "pre_test": "PRE-TEST",
        "mastery": "MASTERY",
    }
    
    level = models.DecimalField(max_digits=2, decimal_places=1)
    
    type_of = models.CharField(max_length=50, null=False, choices=TEST_TYPES)
    items = models.IntegerField(null=False)

    def __str__(self):
        return str(self.level)
    
class Score(models.Model):
    student = models.ForeignKey(UserAccount,  on_delete=models.CASCADE)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    score = models.IntegerField(null=True)
    remarks = models.CharField(max_length=50, null=True)
    
    def __str__(self):
        return self.student
    
class Question(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    question = models.TextField(max_length=550, null=False)
    a = models.CharField(max_length=250, null=False)
    b = models.CharField(max_length=250, null=False)
    c = models.CharField(max_length=250, null=False)
    d = models.CharField(max_length=250, null=False)
    answer = models.CharField(max_length=1, null=False)
    
    def __str__(self):
        return self.question


class Act1Module1(models.Model):
    student = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    mean = models.TextField(max_length=600, null=False)
    median = models.TextField(max_length=600, null=False)
    mode = models.TextField(max_length=600, null=False)
    feedbacks = models.TextField(max_length=600, null=True)
    grade = models.IntegerField(null=True)
    status = models.CharField(max_length=50, default="submitted")
    

    def __str__(self):
        return str(self.student.lrn)


class Act(models.Model):

    act_no = models.IntegerField(null=False)
    remarks = models.TextField(max_length=260, null=True)
    feedback = models.TextField(max_length=660, null=True)
    grade = models.IntegerField(null=True)
    student = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    files = models.FileField(upload_to="activity_files", max_length=100, null=True)
    def __str__(self):
        return str(self.student.lrn) + " Activity # " + str(self.act_no) 




