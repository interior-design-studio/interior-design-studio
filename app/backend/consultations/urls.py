from django.urls import path

from consultations.views import ConsultationCreateView, QuestionListView


urlpatterns = [
    path("requests/", ConsultationCreateView.as_view(), name="consultation-create"),
    path("questions/", QuestionListView.as_view(), name="question-list"),
]

app_name = "consultations"
