from kafka import KafkaConsumer
consumer = KafkaConsumer('connect-test', bootstrap_servers='kafka:9092')
for msg in consumer:
  print(msg)