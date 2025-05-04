from django.urls import path

from consultations.views import ConsultationCreateView


urlpatterns = [
    path("requests/", ConsultationCreateView.as_view(), name="consultation-create"),
]

app_name = "consultations"
