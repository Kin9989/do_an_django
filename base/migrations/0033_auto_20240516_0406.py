# Generated by Django 3.2.6 on 2024-05-15 21:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0032_auto_20240514_1846'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='numberSoldByDay',
        ),
        migrations.RemoveField(
            model_name='order',
            name='numberSoldByM',
        ),
        migrations.RemoveField(
            model_name='order',
            name='numberSoldByY',
        ),
        migrations.RemoveField(
            model_name='order',
            name='rateProduct',
        ),
        migrations.RemoveField(
            model_name='order',
            name='rateUser',
        ),
        migrations.RemoveField(
            model_name='order',
            name='statPaidD',
        ),
        migrations.RemoveField(
            model_name='order',
            name='statPaidM',
        ),
        migrations.RemoveField(
            model_name='order',
            name='statPaidY',
        ),
        migrations.RemoveField(
            model_name='order',
            name='topProductPaid',
        ),
        migrations.RemoveField(
            model_name='order',
            name='userBoughtHigh',
        ),
        migrations.RemoveField(
            model_name='order',
            name='userPaidMoneyHigh',
        ),
    ]