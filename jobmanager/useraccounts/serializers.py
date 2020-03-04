from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserType, PDFFile
from django.contrib.auth import authenticate

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFFile
        fields = "__all__"

    # def create(self, serializer):
    #     serializer.save(owner=self.request.user)
    #     print ("yp ", type_data)
    #     print ("yp2 ", type_data['user_type'])
    #    # user_type = serializers.CharField()
    #     userType = UserType.objects.create(**type_data)
    #     return UserType.objects.create(userType=user_type)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
    
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Login Details")