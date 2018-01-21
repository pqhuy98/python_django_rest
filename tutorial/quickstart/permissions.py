from rest_framework import permissions
from django.contrib.auth.models import User


class IsOwnerOrReadOnlyOrAdminDelete(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if User.objects.get(username='admin') == request.user and request.method == "DELETE":
            return True

        return obj.owner == request.user


class IsSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj == request.user
