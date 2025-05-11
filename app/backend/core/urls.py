from django.urls import path

from core.views import (
    TagListView,
    ProjectStyleListView,
    ProjectListView,
    ProjectDetailView,
    ProjectConfigurationListView
)


urlpatterns = [
    path("tags/", TagListView.as_view(), name="tag-list"),
    path(
        "project-styles/",
        ProjectStyleListView.as_view(),
        name="project-style-list"
    ),
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path(
        "projects/<int:pk>/",
        ProjectDetailView.as_view(),
        name="project-detail"
    ),
    path(
        "project-configurations/",
        ProjectConfigurationListView.as_view(),
        name="project-configuration-list"
    )
]

app_name = "core"
