import os
import time

from kafka import KafkaConsumer

BOOTSTRAP = os.getenv("KAFKA_BOOTSTRAP", "kafka:9092")
TOPIC = os.getenv("KAFKA_TOPIC", "lab910")
GROUP_ID = os.getenv("KAFKA_GROUP_ID", "lab910-group")

consumer = KafkaConsumer(
    TOPIC,
    bootstrap_servers=BOOTSTRAP,
    group_id=GROUP_ID,
    auto_offset_reset="earliest",
    value_deserializer=lambda v: v.decode("utf-8"),
)

print("Consumer started")
for message in consumer:
    # Простая обработка сообщения
    _ = message.value
    time.sleep(0.01)
