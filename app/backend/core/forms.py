from django import forms
from core.models import Project, ProjectImage


class ProjectAdminForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "short_description",
            "full_description",
            "style",
            "tags",
            "main_image"
        )


class ProjectImageAdminForm(forms.ModelForm):
    class Meta:
        model = ProjectImage
        fields = ("image",)
