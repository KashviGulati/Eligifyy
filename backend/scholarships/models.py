from django.db import models

class Scholarship(models.Model):
    name = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)

    min_cgpa = models.FloatField()
    max_income = models.FloatField()
    category = models.CharField(max_length=50)

    amount = models.IntegerField()
    deadline = models.DateField()

    def __str__(self):
        return self.name