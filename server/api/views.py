from django.shortcuts import render
from . models import *
from . serializers import *
from rest_framework import permissions, viewsets, status
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    queryset = UserAccount.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]