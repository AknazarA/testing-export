"""URL configuration for the project."""
from django.conf import settings
from django.contrib import admin
from django.urls import path
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def health(request):
    return Response({
        'status': 'ok',
        'message': 'Hello from Django!',
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health, name='health'),
]

# API documentation - only available in DEBUG mode
if settings.DEBUG:
    from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

    urlpatterns += [
        path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
        path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    ]
