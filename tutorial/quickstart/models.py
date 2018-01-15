# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=45)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.FloatField()
    amount = models.IntegerField()
    sold = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        res = self.name + " ($" + str(self.price) + " x " + str(self.amount)
        if (self.sold):
            res += ", sold"
        return res + ")"


class Comment(models.Model):
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    to = models.ForeignKey(Item, on_delete=models.CASCADE)
    header = models.CharField(max_length=45)
    body = models.CharField(max_length=1000)
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.writer.name + "'s comment for " + self.to.name
