from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from base.test import IsSuperUser, IsStaffUser


# Create a dummy view to test permissions
class DummyView(APIView):
    permission_classes = []

    def get(self, request):
        return Response({"detail": "Permission granted"}, status=status.HTTP_200_OK)


class PermissionTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.superuser = User.objects.create_superuser(
            username="superuser", password="superpassword", email="superuser@test.com"
        )
        self.staffuser = User.objects.create_user(
            username="staffuser",
            password="staffpassword",
            email="staffuser@test.com",
            is_staff=True,
        )
        self.regularuser = User.objects.create_user(
            username="regularuser",
            password="regularpassword",
            email="regularuser@test.com",
        )

    def test_is_superuser(self):
        request = self.factory.get("/dummy/")
        force_authenticate(request, user=self.superuser)

        view = DummyView.as_view(permission_classes=[IsSuperUser])
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        request = self.factory.get("/dummy/")
        force_authenticate(request, user=self.staffuser)

        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        request = self.factory.get("/dummy/")
        force_authenticate(request, user=self.regularuser)

        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_is_staffuser(self):
        request = self.factory.get("/dummy/")
        force_authenticate(request, user=self.superuser)

        view = DummyView.as_view(permission_classes=[IsStaffUser])
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        request = self.factory.get("/dummy/")
        force_authenticate(request, user=self.staffuser)

        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        request = self.factory.get("/dummy/")
        force_authenticate(request, user=self.regularuser)

        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
