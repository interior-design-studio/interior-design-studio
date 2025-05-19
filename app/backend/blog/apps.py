from django.apps import AppConfig


class BlogConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "blog"

    def ready(self):
        from utils.signals import (
            register_image_cleanup,
            optimize_image_size,
            delete_replaced_image_signal
        )
        from blog.models import Article, ArticleComponent

        register_image_cleanup(Article, "image")
        register_image_cleanup(ArticleComponent, "image")

        optimize_image_size(Article, "image")
        optimize_image_size(ArticleComponent, "image")

        delete_replaced_image_signal(Article, "image")
        delete_replaced_image_signal(ArticleComponent, "image")
