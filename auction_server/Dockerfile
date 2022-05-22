FROM python:3.8.10

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN ls
RUN pip3 install -r requirements.txt

EXPOSE 8000
CMD python3 manage.py runserver 0.0.0.0:8000
