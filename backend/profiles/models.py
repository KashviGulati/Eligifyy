from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    age = models.IntegerField()
    income = models.FloatField()
    category = models.CharField(max_length=50)
    gender= models.CharField(max_length=10)
    cgpa = models.FloatField()
    state = models.CharField(max_length=100)

    def __str__(self):
        return str(self.user)