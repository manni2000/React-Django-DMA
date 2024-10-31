# documents/views.py

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Document
from .serializers import UserSerializer, DocumentSerializer

# Sign-up view allowing anyone to create a new user
class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

# Login view using JWT authentication, accessible to anyone
class LoginView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)

# List and create documents, only accessible to authenticated users
class DocumentListCreateView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Retrieve a specific document, only accessible to the document's owner
class DocumentRetrieveView(generics.RetrieveAPIView):
    serializer_class = DocumentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)
