from django.conf.urls import url, include
from rest_framework import routers
from tutorial.quickstart import views
from django.urls import path

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'items', views.ItemViewSet)
router.register(r'comments', views.CommentViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
	url(r'^register/', views.create_auth),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]