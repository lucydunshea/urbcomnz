from django.urls import path
from . import views

urlpatterns = [
    path("", views.projects_index, name="projects_index"),
    path("project/<int:pk>/", views.project_detail, name="project_detail"),
    path('api/project-locations/', views.project_locations, name='project-locations'),
    path('region/<region>/', views.project_region, name='project_region'),
]

