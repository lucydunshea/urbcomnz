# Generated by Django 3.2.15 on 2024-06-15 02:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_auto_20240615_1415'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='created_at',
            new_name='created_on',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='updated_at',
            new_name='updated_on',
        ),
    ]
