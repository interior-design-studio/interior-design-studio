from django.contrib import admin
from django.utils.html import format_html

from core.forms import ProjectAdminForm, ProjectImageAdminForm
from core.models import (
    Tag,
    Project,
    ProjectStyle,
    ProjectImage,
    Service,
    ProjectConfiguration,
    Consultation,
)


admin.site.register(Tag)
admin.site.register(ProjectStyle)
admin.site.register(Service)
admin.site.register(ProjectConfiguration)
admin.site.register(Consultation)


class ImageInline(admin.TabularInline):
    model = ProjectImage
    form = ProjectImageAdminForm
    extra = 1
    readonly_fields = ("preview",)

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 200px;" />',
                obj.image.url
            )
        return "-"

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
        if obj.main_image:
            return format_html(
                '<img src="{}" style="max-height: 200px;" />',
                obj.main_image.url
            )
        return "-"

    preview.short_description = "Preview"
