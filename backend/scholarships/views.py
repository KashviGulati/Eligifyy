from rest_framework import generics
from .models import Scholarship
from .serializers import ScholarshipSerializer
from users.pagination import UserPagination

class ScholarshipListView(generics.ListAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
    pagination_class= UserPagination