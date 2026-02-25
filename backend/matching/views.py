from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from profiles.models import Profile
from scholarships.models import Scholarship


class MatchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = Profile.objects.filter(user=user).first()

        if not profile:
            return Response({"error": "Profile not found"})

        scholarships = Scholarship.objects.all()
        results = []

        for sch in scholarships:
            score = 0

            # CGPA check
            if profile.cgpa >= sch.min_cgpa:
                score += 40

            # Income check
            if profile.income <= sch.max_income:
                score += 40

            # Category check
            if profile.category.lower() == sch.category.lower():
                score += 20

            # Determine status
            if score >= 80:
                status = "Eligible"
            elif score >= 50:
                status = "Partially Eligible"
            else:
                status = "Not Eligible"

            results.append({
                "name": sch.name,
                "provider": sch.provider,
                "score": score,
                "status": status,
                "amount": sch.amount
            })

        # sort by score (highest first)
        results.sort(key=lambda x: x['score'], reverse=True)

        return Response(results)