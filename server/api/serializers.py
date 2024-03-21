from rest_framework import serializers
from . models import UserAccount

class UserCreateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'url', 'lrn', 'first_name', 'middle_name', 'last_name', 'email', 'is_active', 'is_superuser', 'profile_img', 'role')