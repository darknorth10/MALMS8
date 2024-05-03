from rest_framework import serializers
from . models import *

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'url', 'lrn', 'first_name', 'middle_name', 'last_name', 'email', 'is_active', 'is_superuser', 'profile_img', 'role', 'class_id', 'mastery', 'pretest', 'posttest')
        
        
class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ('id', 'name', 'code', 'teacher', 'date_created', 'batch', 'status' )


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ('__all__')
        
        
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('__all__')
        
        
class Act1Module1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Act1Module1
        fields = ('__all__')
        
class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('__all__')
        
class ActSerializer(serializers.ModelSerializer):
    class Meta:
        model = Act
        fields = ('__all__')
        
        

        