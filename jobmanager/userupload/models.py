from django.db import models
from django.contrib.auth.models import User
# Create your models here.
# class PDFFile(models.Model):
#     file = models.FileField(blank=False, null=False)
#     owner = models.ForeignKey(User, related_name="userupload", on_delete=models.CASCADE, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    # def __str__(self):
    #     return self.file.name 