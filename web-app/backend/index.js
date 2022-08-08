const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')  // indexは省略可
const productRoutes = require('./routes/products')
const path = require('path')

// fuluentdへの通信
console.log('POST to fluentd')
var request = require('request');
var options = {
  uri: "http://fluentd:9999/sample.data",
  headers: {
    "Content-type": "application/json",
  },
  json: {
    "key1": "param1",
    "key2": "param2"
  }
};
request.post(options, function(error, response, body){
  console.log(`POST response:${response.statusCode}`);
});

console.log(config.DB_URI)
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(
  () => {
   if (process.env.NODE_ENV !== 'production') {
      // 開発環境
      console.log('NODE_ENV: development')
    } else {
      // 本番環境
      console.log('NODE_ENV: production')
    }
    console.log('connected to mongo!!')
  }
)

const app = express()
// エンドポイント
app.use('/api/v1/products', productRoutes)


// if (process.env.NODE_ENV === 'production') {
//   const appPath = path.join(__dirname, '..', 'frontend', 'dist', 'reservation-app')
//   app.use(express.static(appPath))
//   app.get("*", function(req, res) {
//     res.sendFile(path.resolve(appPath, 'index.html'))
//   })
// }

// 環境が変わった場合への対応
const PORT = process.env.PORT || '3001'

app.listen(PORT, function() {
  console.log('I am running!')
})
