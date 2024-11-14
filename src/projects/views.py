from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Project

def projects_index(request):
    projects = Project.objects.all()
    context = {'projects': projects}
    return render(request, "projects/index.html", context)

def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    context = {'project': project}
    return render(request, "projects/detail.html", context)

def project_locations(request):
    projects = Project.objects.values('title', 'city', 'latitude', 'longitude')
    return JsonResponse(list(projects), safe=False)
