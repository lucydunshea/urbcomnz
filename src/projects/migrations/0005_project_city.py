# Generated by Django 3.2.15 on 2024-11-12 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_auto_20241112_1220'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='city',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
