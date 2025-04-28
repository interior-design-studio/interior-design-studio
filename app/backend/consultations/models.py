from django.db import models


class Question(models.Model):
    order = models.PositiveIntegerField()
    text = models.CharField(max_length=255)
    is_protected = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]

    def __str__(self) -> str:
        return self.text
