from rest_framework import routers
from .api import JobViewSet
from .api import AllJobViewSet

router = routers.DefaultRouter()
router.register('api/jobs', JobViewSet, 'jobs')
router.register('api/alljobs', AllJobViewSet, 'jobs')
urlpatterns = router.urls