from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignUpView, LoginView, DocumentListCreateView, DocumentRetrieveView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('documents/', DocumentListCreateView.as_view(), name='document-list-create'),
    path('documents/<int:pk>/', DocumentRetrieveView.as_view(), name='document-retrieve'),
]