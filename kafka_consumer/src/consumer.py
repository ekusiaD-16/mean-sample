from kafka import KafkaConsumer
consumer = KafkaConsumer('topic-sample', bootstrap_servers='kafka:9092')
for msg in consumer:
  print(msg)