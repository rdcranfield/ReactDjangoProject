# from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.contrib.auth.models import AbstractUser, User
from django.db import models

# # Create your models here.

# class User(AbstractUser):
#     is_employer = models.BooleanField(default=False)
#     is_applicant = models.BooleanField(default=False)

# class UserType(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#     is_employer = models.BooleanField(default=False)
#     is_applicant = models.BooleanField(default=False)
#     # jobApplications = models.ManyToManyField(Application, through='Applied')

# class CustomUser(AbstractUser):
#     user = models.OneToOneField(User, unique=True, related_name="profile")
#     user_type = models.CharField(blank=True, max_length=50)
#     # user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#     # is_employer = models.BooleanField(default=False)
#     # is_applicant = models.BooleanField(default=False)
#     def __str__(self):
#         return self.email

class UserType(models.Model):
    user_type = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="usertypes", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class PDFFile(models.Model):
    afile = models.FileField(blank=False, null=False)
    owner = models.ForeignKey(User, related_name="userupload", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title