# Generated by Django 5.0.2 on 2024-04-03 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_classroom_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classroom',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]