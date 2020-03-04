from jobs.models import Job
from rest_framework import viewsets, permissions
from .serializers import JobSerializer

class AllJobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.jobs.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    serializer_class = JobSerializer