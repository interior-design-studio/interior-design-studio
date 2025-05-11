from django.apps import AppConfig


class BlogConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "blog"

    def ready(self):
        from utils.signals import register_image_cleanup
        from blog.models import Article, ArticleComponent

        register_image_cleanup(Article, "image")
        register_image_cleanup(ArticleComponent, "image")
