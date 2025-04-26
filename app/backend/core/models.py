import os.path
import pathlib
import uuid

from django.core.validators import MinValueValidator
from django.db import models
from django.utils.text import slugify

from core.validators import validate_number_phone


def project_main_image_path(project: "Project", filename: str) -> pathlib.Path:
    filename_suffix = pathlib.Path(filename).suffix
    unique_id = uuid.uuid4()
    slug_name = slugify(project.name)
    new_filename = f"{slug_name}-{unique_id}{filename_suffix}"
    return pathlib.Path("upload/projects/main_images/") / new_filename


def project_image_path(instance: "ProjectImage", filename: str) -> pathlib.Path:
    filename_suffix = pathlib.Path(filename).suffix
    unique_id = uuid.uuid4()
    slug_name = slugify(instance.project.name)
    new_filename = f"{slug_name}-{unique_id}{filename_suffix}"
    return pathlib.Path("upload/projects/gallery_images/") / new_filename


class BaseNamedModel(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
        help_text="Only unique names."
    )

    class Meta:
        abstract = True
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Tag(BaseNamedModel):
    pass


class ProjectStyle(BaseNamedModel):
    pass


class Project(models.Model):
    name = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255)
    full_description = models.TextField()
    style = models.ForeignKey(
        ProjectStyle,
        on_delete=models.CASCADE,
        related_name="projects"
    )
    tags = models.ManyToManyField(
        Tag,
        related_name="projects"
    )
    main_image = models.ImageField(upload_to=project_main_image_path)

    def __str__(self) -> str:
        return self.name

    def save(
        self,
        *args,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):

        try:
            old_instance = Project.objects.get(id=self.pk)
            if old_instance.main_image and old_instance.main_image != self.main_image:
                old_path = old_instance.main_image.path
                if os.path.isfile(old_path):
                    os.remove(old_path)
        except Project.DoesNotExist:
            pass

        return super().save(force_insert, force_update, using, update_fields)


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="gallery"
    )
    image = models.ImageField(upload_to=project_image_path)

    def __str__(self) -> str:
        return f"{self.project.name} image"

    def save(
        self,
        *args,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        try:
            old_instance = ProjectImage.objects.get(id=self.pk)
            if old_instance.image and old_instance.image != self.image:
                old_path = old_instance.image.path
                if os.path.isfile(old_path):
                    os.remove(old_path)
        except ProjectImage.DoesNotExist:
            pass

        return super().save(force_insert, force_update, using, update_fields)


class Service(BaseNamedModel):
    pass


class ProjectConfiguration(models.Model):
    name = models.CharField(
        max_length=255, unique=True, help_text="Only unique names."
    )
    min_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Price for 20 square meters."
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Price per 1 square meter."
    )
    services = models.ManyToManyField(
        Service,
        related_name="project_configurations"
    )

    def __str__(self) -> str:
        return f"{self.name} ({self.price} USD)"


class Consultation(models.Model):
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
        return f"{self.customer_name} - {self.created_at.date()}"
