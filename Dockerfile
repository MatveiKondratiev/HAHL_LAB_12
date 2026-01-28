FROM python:3.11-slim

# раб дир внутри контейнера
WORKDIR /app

# Копирование requirements.txt
COPY requirements.txt .

# Установка зависимостей
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Открываем порт
EXPOSE 8000

# Запуск FastApi сервиса
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

