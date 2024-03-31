from rest_framework import serializers
from . models import *

class UserCreateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'url', 'lrn', 'first_name', 'middle_name', 'last_name', 'email', 'is_active', 'is_superuser', 'profile_img', 'role', 'class_id')
        
        
class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ('id', 'name', 'code', 'teacher_id', 'date_created', 'batch', 'status' )