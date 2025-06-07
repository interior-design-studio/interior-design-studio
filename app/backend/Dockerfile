FROM python:3.11.6-alpine3.18
LABEL maintainer="danilsivkovic@gmail.com"

ENV PYTHONUNBUFFERED 1

WORKDIR /app/backend/

COPY /app/backend/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY /app/backend/ .

RUN mkdir -p /app/backend/staticfiles
RUN mkdir -p /app/backend/media

RUN adduser \
    --disabled-password \
    --no-create-home \
    my_user

RUN chown -R my_user /app/backend/staticfiles
RUN chown -R my_user /app/backend/media

RUN chmod -R 755 /app/backend/staticfiles
RUN chmod -R 755 /app/backend/media

USER my_user

CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8000"]
