# from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.contrib.auth.models import AbstractUser, User
from django.db import models

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