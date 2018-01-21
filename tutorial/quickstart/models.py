# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Item(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=45)
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
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    to = models.ForeignKey(Item, on_delete=models.CASCADE)
    header = models.CharField(max_length=45)
    body = models.CharField(max_length=1000)
    score = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.writer.name + "'s comment for " + self.to.name


class Register(models.Model):
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
