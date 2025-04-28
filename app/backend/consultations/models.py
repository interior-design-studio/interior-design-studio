from django.db import models


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
