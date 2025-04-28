from django.db import models

from consultations.validators import validate_number_phone


class Question(models.Model):
    order = models.PositiveIntegerField()
    text = models.CharField(max_length=255)
    is_protected = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]

    def __str__(self) -> str:
        return self.text


class ChoiceOption(models.Model):
    order = models.PositiveIntegerField()
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="choices"
    )
    text = models.CharField(max_length=255)

    class Meta:
        ordering = ["question"]

    def __str__(self) -> str:
        return f"q:{self.question.order} {self.text}"


class ConsultationRequest(models.Model):
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=15, validators=[validate_number_phone]
    )
    question = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_active", "-created_at"]

    def __str__(self) -> str:
        return f"{self.customer_name} {self.created_at.date()}"
