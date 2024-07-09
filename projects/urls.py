from django.urls import path
from . import views

urlpatterns = [
    path("", views.projects_index, name="projects_index"),
    path("project/<int:pk>/", views.project_detail, name="project_detail"),
]

