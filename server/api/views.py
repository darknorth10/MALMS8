from django.shortcuts import render
from . models import *
from . serializers import UserCreateSerializer
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    queryset = UserAccount.objects.all().order_by('-date_joined')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserCreateSerializer
    
    @action(detail=True, methods=['get'])
    def lrn(self, request,  pk):
        users = UserAccount.objects.filter(lrn=pk)
        page = self.paginate_queryset(users)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(users, many=True)
        
        return Response(serializer.data)