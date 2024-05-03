from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)
router.register(r'classes', views.ClassRoomViewSet)
router.register(r'assessments', views.AssessmentViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'act1module1', views.Act1Module1ViewSet)
router.register(r'scores', views.ScoreViewSet)
router.register(r'activities', views.ActViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include('rest_framework.urls'), name="rest_framework"),
]
