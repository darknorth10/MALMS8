from djoser.serializers import UserCreateSerializer
from . models import *

class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ['id', 'url', 'username', 'first_name', 'middle_name', 'last_name', 'email', 'is_active', 'is_superuser', 'is_verified', 'profile_img']