from django.conf.urls import url, include
from rest_framework import routers
from tutorial.quickstart import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'items', views.ItemViewSet)
router.register(r'comments', views.CommentViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^SilkRoad/api/', include(router.urls)),
    url(r'^SilkRoad/api/register/', views.CreateUser),
    url(r'^SilkRoad/api/login/', views.CheckAuth),
    url(r'^SilkRoad/api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
