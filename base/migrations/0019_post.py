# Generated by Django 5.0.4 on 2024-04-29 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_alter_category_name_alter_category_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
