from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer, UserListSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from .models import User
from .pagination import UserPagination

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"})
        
        return Response(serializer.errors)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data

            refresh = RefreshToken.for_user(user)

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            })

        return Response(serializer.errors)
    
class UserListView(generics.ListAPIView):
    queryset= User.objects.all()
    serializer_class= UserListSerializer
    pagination_class= UserPagination
