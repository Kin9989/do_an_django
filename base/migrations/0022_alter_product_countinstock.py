# Generated by Django 3.2.6 on 2024-05-08 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0021_auto_20240507_0148'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='countInStock',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
