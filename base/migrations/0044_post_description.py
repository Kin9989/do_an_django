# Generated by Django 3.2.6 on 2024-06-03 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0043_remove_order_coupon'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
