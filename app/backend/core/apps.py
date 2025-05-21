from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        from core.models import Project, ProjectImage
        from utils.signals import (
            register_image_cleanup,
            optimize_image_size,
            delete_replaced_image_signal
        )

        register_image_cleanup(Project, "main_image")
        register_image_cleanup(ProjectImage, "image")

        optimize_image_size(Project, "main_image")
        optimize_image_size(ProjectImage, "image")

        delete_replaced_image_signal(Project, "main_image")
        delete_replaced_image_signal(ProjectImage, "image")
