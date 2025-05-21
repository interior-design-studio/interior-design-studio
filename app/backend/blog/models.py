import pathlib
import uuid

from django.db import models
from django.utils.text import slugify


def post_image_path(article: "Article", filename: str) -> pathlib.Path:
    filename_suffix = pathlib.Path(filename).suffix
    unique_id = uuid.uuid4()
    slug_name = slugify(article.title)
    new_file_name = f"{slug_name}-{unique_id}{filename_suffix}"
    return pathlib.Path("upload/articles/main_images/") / new_file_name


def component_image_path(
        component: "ArticleComponent", filename: str
) -> pathlib.Path:
    filename_suffix = pathlib.Path(filename).suffix
    unique_id = uuid.uuid4()
    slug_name = slugify(component.title)
    new_file_name = f"{slug_name}-{unique_id}{filename_suffix}"
    return pathlib.Path("upload/articles/components/") / new_file_name


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to=post_image_path)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class ArticleComponent(models.Model):
    article = models.ForeignKey(
        Article,
        related_name="components",
        on_delete=models.CASCADE
    )
    number = models.PositiveIntegerField(help_text="Position in the article (1,2,3..)")
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to=component_image_path, blank=True, null=True)

    class Meta:
        ordering = ["number"]

    def __str__(self) -> str:
        return self.title


class ComponentAdvantage(models.Model):
    component = models.ForeignKey(
        ArticleComponent,
        related_name="advantages",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class ComponentFeature(models.Model):
    component = models.ForeignKey(
        ArticleComponent,
        related_name="features",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name
