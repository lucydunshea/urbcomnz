# Generated by Django 3.2.15 on 2024-11-12 09:39

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_alter_post_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='description',
            new_name='short_description',
        ),
        migrations.AddField(
            model_name='category',
            name='long_description',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='category',
            name='photos',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]