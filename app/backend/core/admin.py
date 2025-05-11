from django.contrib import admin

from core.forms import ProjectAdminForm, ProjectImageAdminForm
from utils.image_utils import preview_display
from core.models import (
    Tag,
    Project,
    ProjectStyle,
    ProjectImage,
    Service,
    ProjectConfiguration
)


admin.site.register(Tag)
admin.site.register(ProjectStyle)
admin.site.register(Service)
admin.site.register(ProjectConfiguration)

class ImageInline(admin.TabularInline):
    model = ProjectImage
    form = ProjectImageAdminForm
    extra = 1
    readonly_fields = ("preview",)

    def preview(self, obj):
        return preview_display(obj, "image")

    preview.short_description = "Preview"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    inlines = (ImageInline,)
    readonly_fields = ("preview",)

    list_display = ("name",)
    list_filter = ("style", "tags")
    search_fields = ("name",)

    def preview(self, obj):
        return preview_display(obj, "main_image")

    preview.short_description = "Preview"
