# Generated by Django 5.0.4 on 2024-04-21 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_category_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(default='Name Category', max_length=200),
        ),
    ]