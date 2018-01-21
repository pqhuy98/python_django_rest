from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from tutorial.quickstart import serializers
from .models import Item, Comment
from rest_framework.decorators import api_view
from rest_framework import status, permissions
from rest_framework.response import Response
from .permissions import IsOwnerOrReadOnlyOrAdminDelete, IsSelf


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsSelf,)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-created_at')
    serializer_class = serializers.ItemSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnlyOrAdminDelete,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('created_at')
    serializer_class = serializers.CommentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnlyOrAdminDelete,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


@api_view(['POST'])
def CheckAuth(request):
    serialized = serializers.RegisterSerializer(data=request.data, context={'request': request})
    if serialized.is_valid():
        try:
            u = User.objects.get(username=serialized.validated_data["username"])
            if not u.check_password(serialized.validated_data["password"]):
                return Response(serialized.data, status=status.HTTP_201_CREATED)
        except:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def CreateUser(request):
    serialized = serializers.RegisterSerializer(data=request.data, context={'request': request})
    if serialized.is_valid():
        print()
        User.objects.create_user(
            email=serialized.validated_data['email'],
            username=serialized.validated_data['username'],
            password=serialized.validated_data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
