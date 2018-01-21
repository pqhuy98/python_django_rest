from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Item, Comment, Register


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Register
        fields = ('username', 'email', 'password')


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ('url', 'name', 'owner', 'price', 'amount', 'sold', 'created_at', 'updated_at')


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('url', 'owner', 'to', 'header', 'body', 'score', 'created_at', 'updated_at')
