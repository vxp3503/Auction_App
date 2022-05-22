from email import message
import imp
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from .models import User, Listing, Bid, Comment
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import ListingForm 
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token
from django.middleware.csrf import get_token
# from django.contrib.sessions.middleware import
# Create your views here.
def index(request):
        l=Listing.objects.all()
        amount=[]
        for item in l:
            if(Bid.objects.filter(listing=item).exists()):
                currentbid=Bid.objects.filter(listing=item).order_by('-date').first()
                amount.append(currentbid.amount)
            else:
                amount.append(item.startbid)
        List= list(zip([listing.serialize() for listing in l],amount))
        data={
            "present": 1,
            "List":List,
        }
        return JsonResponse(data)

@csrf_exempt
def register(request):
    if request.method=="POST":
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        first_name=request.POST['first_name']
        last_name=request.POST['last_name']
        try:
            user=User.objects.create_user(username,email,password,first_name=first_name,last_name=last_name)
            user.save()
        except IntegrityError:
            data={
                "Send": 0,
                "error": "Username already taken"
            }
            return JsonResponse(data);
        data={
                "username":username,
                "email": email,
                "password": password,
                "first_name": first_name,
                "last_name": last_name,
                "Send": 1
            }
        return  JsonResponse(data);
    else:
        data={
            "error":"occur"
        }
        return JsonResponse(data)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        username= request.POST['username']
        password= request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            data={
                "username":user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "watchlist": [l.serialize() for l in user.watchlist.all()],
                "Send": 1
            }
            return JsonResponse(data);
        else:
            data={
                "Send": 0,
                "message": "Invalid username and / or password"
            }
            return JsonResponse(data)
    else:
        data={
            "error":"occur"
        }
        return JsonResponse(data);


def logout_view(request):
    logout(request)
    data={
        "message": "logout successfully"
    }
    return JsonResponse(data)

@csrf_exempt
def createlist(request):
    if request.method=="POST":
        title=request.POST['title']
        description=request.POST['description']
        startbid=request.POST['startbid']
        image=request.POST['image']
        category=request.POST['category']
        listing= Listing(Owner=request.user, title=title, description=description, startbid=startbid, image=image, category=category)
        listing.save()
        data={
            "message":"Item created successfully"
        }
        return JsonResponse(data);



def product_info(request,product_id):
    l=Listing.objects.get(id=product_id)
    if(Bid.objects.filter(listing=l).exists()):
        currentbid=Bid.objects.filter(listing=l).order_by('-date').first()
        amount=currentbid.amount
    else:
        amount=l.startbid



    no_of_bids=len(Bid.objects.filter(listing=l))
    comments= Comment.objects.filter(listing=l)


    if request.user.is_authenticated:
        in_watchlist=l in request.user.watchlist.all()
    else:
        in_watchlist=False
    return l, comments, in_watchlist, amount, no_of_bids


def current_user(request):
    user=request.user
    if user.username is "":
        return JsonResponse({
            "Send":0
        })
    l=user.watchlist.all()
    amount=[]
    for item in l:
            if(Bid.objects.filter(listing=item).exists()):
                currentbid=Bid.objects.filter(listing=item).order_by('-date').first()
                amount.append(currentbid.amount)
            else:
                amount.append(item.startbid)
    List= list(zip([listing.serialize() for listing in l],amount))
    data={
            "username":user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "watchlist": List,
            "Send": 1
            }
    return JsonResponse(data)

def product_inside_view(request, product_id):
    l, comments, in_watchlist, amount, no_of_bids=product_info(request,product_id)
    data={
        "listing":l.serialize(),
        "in_watchlist":in_watchlist,
        "comments":[c.comment for c in comments],
        "amount":amount,
        "no_of_bids":no_of_bids
    }
    return JsonResponse(data)

@csrf_exempt
def add_comment(request, product_id):
    l, comments, in_watchlist, amount, no_of_bids=product_info(request,product_id)
    content=request.POST['content']
    comment=Comment(comment=content,commenter=request.user, listing=l)
    comment.save()
    data={
        "message":"comment added successfully"
    }
    return JsonResponse(data)


@csrf_exempt
def add_bid(request, product_id):
    l, comments, in_watchlist, amount, no_of_bids=product_info(request,product_id)
    bid_price=request.POST['bid_price']
    bid=Bid(listing=l,amount=bid_price,bidder=request.user)
    bid.save()
    data={
        "message":"bid created successfully",
        "amount":amount
    }
    return JsonResponse(data)

def update_watchlist(request, product_id):
    l, comments, in_watchlist, amount, no_of_bids=product_info(request,product_id)
    if in_watchlist:
        request.user.watchlist.remove(l)
    else:
        request.user.watchlist.add(l)
    data={
        "in_watchlist": in_watchlist,
        "message": "watchlist_updated"
    }
    return JsonResponse(data)


def close_auction(request, product_id):
    l, comments, in_watchlist, amount, no_of_bids=product_info(request,product_id)
    winning_bid=Bid.objects.filter(listing=l).order_by('-date').first()

    if winning_bid:
        l.winner=winning_bid.bidder
    
    l.closed=True
    l.save()

    data={
        "winner":l.winner.username
    }
    return JsonResponse(data)



