from django.shortcuts import render
from . models import *
from . serializers import UserCreateSerializer
from rest_framework import permissions, viewsets
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    queryset = UserAccount.objects.all().order_by('-date_joined')
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserCreateSerializer