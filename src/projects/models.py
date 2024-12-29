from django.db import models
from blog.models import Category
from ckeditor.fields import RichTextField

class Project(models.Model):
    REGION_CHOICES = (
        ('AKL', 'Auckland'),
        ('BOP', 'Bay of Plenty'),
        ('CAN', 'Canterbury'),
        ('GIS', 'Gisborne'),
        ('HB', 'Hawke\'s Bay'),
        ('MW', 'Manawatu-Wanganui'),
        ('MLB', 'Marlborough'),
        ('NEL', 'Nelson'),
        ('NLD', 'Northland'),
        ('OTA', 'Otago'),
        ('SLD', 'Southland'),
        ('TKI', 'Taranaki'),
        ('TAS', 'Tasman'),
        ('WKO', 'Waikato'),
        ('WEL', 'Wellington'),
        ('WCT', 'West Coast'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    url = models.URLField(blank=True)
    content = RichTextField(blank=True, null=True)
    categories = models.ManyToManyField(Category, blank=True)
    city = models.CharField(max_length=100, null=True)
    region = models.CharField(max_length=100, choices=REGION_CHOICES, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.title
    

