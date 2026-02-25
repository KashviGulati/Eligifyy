from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.filter(user=request.user).first()

        if not profile:
            return Response({
                "exists": False,
                "data": None
            })

        serializer = ProfileSerializer(profile)
        return Response({
            "exists": True,
            "data": serializer.data
        })

    def post(self, request):
        profile = Profile.objects.filter(user=request.user).first()

        if profile:
            return Response({"message": "Profile already exists"})

        serializer = ProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)

        return Response(serializer.errors)