const express = require('express');
const axios = require('axios');
const qs = require('querystring');

const app = express();
const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';
const LINE_NOTIFY_TOKEN   = '#########################################'; // LINEトークン

// 表情をキーにスタンプ情報を保持している
const expressionObj = {
  happy: {
    stickerId: "1988",
    stickerPackageId: "446",
    message: '元気だよー',
  },
  // 他の表情を有効すする場合には以下コメントを有効化する
  // sad: {
  //   stickerId: "2008",
  //   stickerPackageId: "446",
  //   message: '悲しいー',
  // },
  // angry: {
  //   stickerId: "2019",
  //   stickerPackageId: "446",
  //   message: '怒ーーー',
  // },
  // suprised: {
  //   stickerId: "2011",
  //   stickerPackageId: "446",
  //   message: '！！！',
  // }
}

 /**
  * LINE通知用リクエスト内容を作成する
  * 
  * 
  * @param {String} expression 感情を表す文字列 
  * @returns 
  */
function configExpression(expression) {

  return config = {
    url: LINE_NOTIFY_API_URL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
    },
    data: qs.stringify(expressionObj[expression])
  }
}

/**
 * LINEへリクエストする
 * 
 * @param {String} expression 感情を表す文字列
 */
async function sendRequest(expression) {
  try {
      const responseLINENotify = await axios.request(configExpression(expression));
      console.log(responseLINENotify.data);
  } catch (error) {
      console.error(error);
  }
}

app.use(express.static('web'));

app.get('/sendLine/:expression', (req, res) =>{
  sendRequest(req.params.expression);
  res.json(req.params.expression);
});

app.listen(3000, ()=> console.log('Listening on port 3000'));