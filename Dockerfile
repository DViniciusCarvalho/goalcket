FROM python:3.10.11

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 27017
 
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "3001"]