from django.shortcuts import render
# some_app/views.py
from django.views.generic import TemplateView

class IndexView(TemplateView):
    template_name = "index.html"

class AboutUsView(TemplateView):
    template_name = "about-us.html"