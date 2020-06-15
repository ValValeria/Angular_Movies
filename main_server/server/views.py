from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
import json
from server.models import Users
from django.db.models import Q
from django.contrib.auth import login

def status_of_user(request):
    if request.method=="POST" and 'Authorization' in request.headers:
        user=json.loads(request.headers.get('Authorization'))
        status="guest"
        try:
            user_data= Users.objects.get(Q(email__exact=user.email),Q(name__exact=user.name))
            login(request,user_data)
            status='user'
        except:
            pass
        else:
            return HttpResponse()
    return HttpResponse(json.dumps({status:status}),content_type="application/json")