from rest_framework import serializers

from consultations.models import ChosenAnswer


class ChosenAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChosenAnswer
        fields = (
            "id",
            "option",
            "question",
            "custom_answer"
        )
