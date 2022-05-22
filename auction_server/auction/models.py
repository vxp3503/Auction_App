from unicodedata import category
from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
from pytz import timezone
# Create your models here.


class User(AbstractUser):
    watchlist = models.ManyToManyField(
        "Listing", blank=True, related_name="watclist")
    pass


class Listing(models.Model):
    category_choice = [
        ('BOOKS', 'Books'),
        ('MUSIC', 'Music'),
        ('MOVIES', 'Movies'),
        ('GAMES', 'Games'),
        ('COMPUTERS', 'Computers'),
        ('ELECTRONICS', 'Electronics'),
        ('KITCHEN', 'Kitchen'),
        ('HOME', 'Home'),
        ('HEALTH', 'Health'),
        ('PETS', 'Pets'),
        ('TOYS', 'Toys'),
        ('FASHION', 'Fashion'),
        ('SHOES', 'Shoes'),
        ('SPORTS', 'Sports'),
        ('BABY', 'Baby'),
        ('TRAVEL', 'Travel')
    ]
    Owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="listings", null=True)
    title = models.CharField(max_length=20, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    startbid = models.IntegerField(verbose_name="Starting Bid")
    image = models.URLField(blank=True, verbose_name="Image URL", null=True)
    category = models.CharField(
        max_length=200, verbose_name="Category", blank=True, null=True, choices=category_choice)
    closed = models.BooleanField(default=False)
    winner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateTimeField(default=datetime.datetime.now)

    def serialize(self):
        if self.winner is not None:
            return {
                "id": self.id,
                "Owner": self.Owner.username,
                "title": self.title,
                "description": self.description,
                "startbid": self.startbid,
                "image": self.image,
                "category": self.category,
                "closed": self.closed,
                "winner": self.winner.username,
                "date": self.date
            }
        else:
            return {
                "id": self.id,
                "Owner": self.Owner.username,
                "title": self.title,
                "description": self.description,
                "startbid": self.startbid,
                "image": self.image,
                "category": self.category,
                "closed": self.closed,
                "date": self.date
            }

    def __str__(self):
        return self.title


class Bid(models.Model):
    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, related_name="bids")
    amount = models.IntegerField(verbose_name="bid_price", null=True)
    bidder = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="bider")
    date = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return f"{self.bidder} bid ${self.amount} for {self.listing}"


class Comment(models.Model):
    comment = models.TextField()
    commenter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments")
    date = models.DateTimeField(default=datetime.datetime.now)
    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, related_name="current_comment")

    def __str__(self):
        return f"{self.commenter} commented on {self.listing} ({self.date()})"
