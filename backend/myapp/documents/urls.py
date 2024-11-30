# documents/urls.py

from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignUpView, LoginView, DocumentListCreateView, DocumentRetrieveView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),  # Signup endpoint
    path('login/', LoginView.as_view(), name='login'),  # Login endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh endpoint
    path('documents/', DocumentListCreateView.as_view(), name='document-list-create'),  # List and create documents
    path('documents/<int:pk>/', DocumentRetrieveView.as_view(), name='document-retrieve'),  # Retrieve a single document
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)