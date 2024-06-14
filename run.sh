#!/bin/sh

python manage.py migrate
python manage.py makemigrations base
python manage.py migrate

# dev
python manage.py runserver 0.0.0.0:8000
# prod
exec "$@"