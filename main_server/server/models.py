from django.db import models

# Create your models here.
 class Posts(models.Model):
     p1=models.CharField(max_length=300)
     title=models.CharField(max_length=30)
     userId=models.ForeignKey(User,on_delete=models.CASCADE)

 class Users(models.Model):
     email=models.EmailField()
     name=models.CharFields()
     password=models.CharField()

     