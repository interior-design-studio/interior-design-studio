from nested_admin import nested

from django.contrib import admin
from django.utils.html import format_html

from blog.models import Article
from blog.forms import ArticleAdminForm


# admin.site.register(ArticleComponent)
# admin.site.register(ComponentAdvantage)
# admin.site.register(ComponentFeature)


@admin.register(Article)
class ArticleAdmin(nested.NestedModelAdmin):
    form = ArticleAdminForm
    readonly_fields = ("preview",)

    list_display = ("title",)
    search_fields = ("title",)

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 200px;" />',
                obj.image.url
            )
        return "-"

    preview.short_description = "Preview"
