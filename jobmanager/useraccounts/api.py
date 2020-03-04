from rest_framework import generics, permissions
import os
from rest_framework.response import Response
from knox.models import AuthToken
import json
from .serializers import UserTypeSerializer, UserSerializer, RegisterSerializer, LoginSerializer,FileSerializer
from .models import UserType
from rest_framework.parsers import FileUploadParser
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import FileSystemStorage
from django.core.exceptions import ValidationError

class FileUploadView(generics.GenericAPIView):
    
    parser_class = (MultiPartParser)

    def post(self, request, *args, **kwargs):
        myfile = request.FILES['file']
      
        ext = os.path.splitext(myfile.name)[1] 
        valid_extensions = ['.pdf']
        if not ext.lower() in valid_extensions:
            raise ValidationError('Unsupported file extension.')

        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        full_file_name = request.upload_handlers[0].file_name

        return Response({
            "result":  "success file stored", 
        })
    
class UserTypeRegistry(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserTypeSerializer

    def get(self, request):
        userType = UserType.objects.filter(owner=request.user)

        return Response({
            "user_type":  userType.get().user_type, 
        }) 

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_type = serializer.save(owner=self.request.user)

        return Response({
            "user_type":  serializer['user_type'].value, 

        })

class RegisterAPI(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": AuthToken.objects.create(user)[1]
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user