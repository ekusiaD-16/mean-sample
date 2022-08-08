import requests
import time

# 5秒に1回POSTリクエストを送信する
url = 'http://fluentd:9999/sample.data'
i = 0
while True:
    payload = {"id":i}
    requests.post(url, json=payload)
    print('id:', i)
    i += 1
    time.sleep(1)