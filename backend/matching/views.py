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
            return Response({
                "message": "Profile not found",
                "data": []
            })

        scholarships = Scholarship.objects.all()
        results = []

        for sch in scholarships:
            score = 0
            reasons = []

            if profile.cgpa >= sch.min_cgpa:
                score += 30
            else:
                reasons.append("CGPA below requirement")

            if profile.income <= sch.max_income:
                score += 30
            else:
                reasons.append("Income exceeds limit")

            if profile.category.lower() == sch.category.lower():
                score += 20
            else:
                reasons.append("Category mismatch")

            if sch.state.lower() == "all" or profile.state.lower() == sch.state.lower():
                score += 20
            else:
                reasons.append("State mismatch")

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
                "amount": sch.amount,
                "state": sch.state,
                "reasons": reasons
            })

        results.sort(key=lambda x: x['score'], reverse=True)

        return Response(results)