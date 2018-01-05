# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
# Register your models here.
from django.contrib.auth.models import Item, Comment

admin.site.register(Item)
admin.site.register(Comment)
