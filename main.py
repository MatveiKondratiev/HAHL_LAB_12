from fastapi import FastAPI
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response
import time

app = FastAPI(title="HAHL Lab 12 Service")

# Метрики, объявление после app
REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP requests",
    ["endpoint"]
)

REQUEST_LATENCY = Histogram(
    "http_request_latency_seconds",
    "HTTP request latency",
    ["endpoint"]
)


@app.get("/health")
def health_check():
    start_time = time.time()
    endpoint = "/health"

    REQUEST_COUNT.labels(endpoint=endpoint).inc()

    response = {"status": "ok"}

    REQUEST_LATENCY.labels(endpoint=endpoint).observe(
        time.time() - start_time
    )

    return response

# endpoints

@app.get("/metrics")
def metrics():
    return Response(
        generate_latest(),
        media_type=CONTENT_TYPE_LATEST
    )

