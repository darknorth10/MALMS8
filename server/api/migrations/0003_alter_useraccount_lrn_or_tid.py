# Generated by Django 5.0.2 on 2024-03-19 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_lrn_useraccount_lrn_or_tid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='lrn_or_tid',
            field=models.CharField(max_length=20, null=True, unique=True),
        ),
    ]