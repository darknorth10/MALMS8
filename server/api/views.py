from django.shortcuts import render
from . models import *
from . serializers import *
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
    
    @action(detail=True, methods=['get'])  
    def enrolled(self, request,  pk):
        users = UserAccount.objects.filter(class_id=pk)
        page = self.paginate_queryset(users)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(users, many=True)
        
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])  
    def no_page(self, request,  pk):
        self.pagination_class = None
        users = UserAccount.objects.all()
        
        serializer = self.get_serializer(users, many=True)
        
        return Response(serializer.data)
    
class ClassRoomViewSet(viewsets.ModelViewSet):

    queryset = ClassRoom.objects.all().order_by('-id')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClassRoomSerializer
    
    @action(detail=True, methods=['get'])
    def code(self, request,  pk):
        classroom = ClassRoom.objects.filter(code=pk)
        page = self.paginate_queryset(classroom)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(classroom, many=True)
        
        return Response(serializer.data)
    
    
class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all().order_by('-id')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AssessmentSerializer
    
    
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('id')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = QuestionSerializer
    pagination_class = None
    
    @action(detail=True, methods=['get'])
    def assessment(self, request,  pk):
        assessment = Question.objects.filter(assessment=pk)
        page = self.paginate_queryset(assessment)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(assessment, many=True)
        
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def random_order(self, request,  pk):
        assessment = Question.objects.filter(assessment=pk).order_by('?')
        page = self.paginate_queryset(assessment)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(assessment, many=True)
        
        return Response(serializer.data)
    
    
    
class Act1Module1ViewSet(viewsets.ModelViewSet):
    queryset = Act1Module1.objects.all().order_by('-id')
    permission_classes = [permissions.AllowAny]
    serializer_class = Act1Module1Serializer
    pagination_class = None
    
class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all().order_by('-id')
    permission_classes = [permissions.AllowAny]
    serializer_class = ScoreSerializer
    pagination_class = None
    
    
class ActViewSet(viewsets.ModelViewSet):
    queryset = Act.objects.all().order_by('-id')
    permission_classes = [permissions.AllowAny]
    serializer_class = ActSerializer
    pagination_class = None
    
    @action(detail=True, methods=['get'])
    def user(self, request,  pk):
        acts = Act.objects.filter(student=pk).order_by('-id')
        
        serializer = self.get_serializer(acts, many=True)
        
        return Response(serializer.data)
    
    
    
    