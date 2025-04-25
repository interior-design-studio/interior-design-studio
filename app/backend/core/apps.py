from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        from core.models import Project, ProjectImage
        from utils.signals import register_image_cleanup

        register_image_cleanup(Project, "main_image")
        register_image_cleanup(ProjectImage, "image")
