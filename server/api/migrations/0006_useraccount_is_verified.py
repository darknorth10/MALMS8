# Generated by Django 5.0.2 on 2024-03-19 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_useraccount_lrn_or_tid_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]