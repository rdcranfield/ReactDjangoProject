from django.shortcuts import render
from django.template import RequestContext
from rest_framework import generics, permissions
# Create your views here.
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
# from .serializers import FileSerializer

# class FileUploadView(generics.GenericAPIView):
#     # serializer_class = JobSerializer
#     parser_class = (FileUploadParser)
#     print ("incoming1")
#     def post(self, request, *args, **kwargs):
#         print ('Hello, boris!', request.data)
    # def post(self, request, *args, **kwargs):
    #     print ("incoming2")
        # fileSerializer = FileSerializer(data=request.data)

        # print ('filename', request.FILES['document'])
        # if fileSerializer.is_valid():
        #     file_serializer.save()
        #     return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Reponse(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
