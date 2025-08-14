from django.contrib.auth.models import AbstractUser
from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:  # pragma: no cover - simple representation
        return self.name


class Location(models.Model):
    organization = models.ForeignKey(
        Organization, related_name="locations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)

    def __str__(self) -> str:  # pragma: no cover - simple representation
        return f"{self.name} - {self.organization.name}"


class User(AbstractUser):
    class Roles(models.TextChoices):
        SUPER_ADMIN = "super_admin", "Super Admin"
        ORG_OWNER = "org_owner", "Organization Owner"
        ORG_ADMIN = "org_admin", "Organization Admin"
        LOCATION_ADMIN = "location_admin", "Location Admin"
        MEMBER = "member", "Member"

    role = models.CharField(
        max_length=32, choices=Roles.choices, default=Roles.MEMBER
    )
    organization = models.ForeignKey(
        Organization, related_name="users", on_delete=models.SET_NULL, null=True, blank=True
    )
    location = models.ForeignKey(
        Location, related_name="users", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self) -> str:  # pragma: no cover - simple representation
        return self.username
