from django.contrib import admin

from consultations.models import (
    ConsultationRequest,
    SurveyAnswer,
    ChosenAnswer,
    ChoiceOption,
    Question
)


admin.site.register(ConsultationRequest)
admin.site.register(SurveyAnswer)
admin.site.register(ChosenAnswer)
admin.site.register(ChoiceOption)
admin.site.register(Question)
