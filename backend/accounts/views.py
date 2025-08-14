from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RequestPasswordResetView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        form = PasswordResetForm(data=request.data)
        if form.is_valid():
            form.save(request=request, use_https=request.is_secure())
        return Response({"detail": "If your email is registered, you will receive a password reset email."})


class ResetPasswordConfirmView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            form = SetPasswordForm(user, data=request.data)
            if form.is_valid():
                form.save()
                return Response({"detail": "Password has been reset."})
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Invalid reset link."}, status=status.HTTP_400_BAD_REQUEST)
