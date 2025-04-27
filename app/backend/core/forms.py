from core.models import Project, ProjectImage
from utils.image_utils import NewImageOptimizationFormMixin


class ProjectAdminForm(NewImageOptimizationFormMixin):
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

    def clean_main_image(self):
        return self.optimize_new_image("main_image")


class ProjectImageAdminForm(NewImageOptimizationFormMixin):
    class Meta:
        model = ProjectImage
        fields = ("image",)

    def clean_image(self):
        return self.optimize_new_image("image")
