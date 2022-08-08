# イメージビルド
docker-compose build

# コンテナ起動
docker-compose up -d

# fluentdの起動
docker exec -it fluentd_c bash

/etc/init.d/td-agent start

# kafkaの起動
docker exec -it kafka_c bash

# zookeeper起動
nohup /opt/kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.properties &
# kafka起動
nohup /opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties &
# トピック作成(コンテナ作成後一度きりでよい)
/opt/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic topic-sample

# kafka-consumer起動
docker exec -it kafka_consumer bash

python /python/src/consumer.py

# 別のターミナルにて、backend実行
docker exec -it web-app-be bash

npm run start-dev

# 結果
backendからjsonデータが出力される
それに連動して、リアルタイムに
consumer.pyのコンソールにConsumerRecordが出力される。