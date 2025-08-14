from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    ProfileView,
    RegisterView,
    RequestPasswordResetView,
    ResetPasswordConfirmView,
)


urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/password-reset/", RequestPasswordResetView.as_view(), name="password_reset"),
    path(
        "auth/password-reset/<uidb64>/<token>/",
        ResetPasswordConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("user/profile/", ProfileView.as_view(), name="user_profile"),
]
