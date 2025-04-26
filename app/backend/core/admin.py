from django.contrib import admin
from django.utils.html import format_html

from core.forms import ProjectAdminForm
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
admin.site.register(ProjectImage)
admin.site.register(Service)
admin.site.register(ProjectConfiguration)
admin.site.register(Consultation)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
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
