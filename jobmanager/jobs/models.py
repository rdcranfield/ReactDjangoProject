from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100, default="")
    employer_email = models.EmailField(max_length=100, unique=True)
    job_description = models.CharField(max_length=500,  default="")
    owner = models.ForeignKey(User, related_name="jobs", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

