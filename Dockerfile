FROM python:3.10

COPY . /code

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000
RUN chmod +x run.sh

# auto migrations
CMD ["sh", "run.sh"]
