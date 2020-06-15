from django.db import models

# Create your models here.
class Users(models.Model):
     email=models.EmailField()
     name=models.CharField(max_length=20)
     password=models.CharField(max_length=10)

class Posts(models.Model):
     p1=models.CharField(max_length=300)
     title=models.CharField(max_length=30)
     userId=models.ForeignKey(Users,on_delete=models.CASCADE)


     