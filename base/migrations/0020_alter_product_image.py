# Generated by Django 3.2.6 on 2024-05-03 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0019_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
