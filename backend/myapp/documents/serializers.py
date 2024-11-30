from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Document

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'name', 'file', 'uploaded_at')
        read_only_fields = ('id', 'uploaded_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)