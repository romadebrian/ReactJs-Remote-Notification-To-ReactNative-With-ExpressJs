var express = require("express");
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("./react-native-push-notifi-46135-firebase-adminsdk-2dquk-f462b67add.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.get("/", function (req, res, next) {
  res.send("API Kirim Notifikasi");
});

router.post("/", (req, res) => {
  // console.log("reqruitment: ", req);
  // console.log("result: ", res);

  console.log("reqruitment: ", req.body);
  console.log("reqruitment: ", req.body.Title);
  console.log("reqruitment: ", req.body.Body);
  console.log("reqruitment: ", req.body.Token);

  var registrationToken = req.body.Token;

  var payload = {
    notification: {
      title: req.body.Title,
      body: req.body.Body,
    },
    // data: {
    //   account: "Savings",
    //   balance: "$3020.25",
    // },
  };

  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function (response) {
      console.log("Successfully sent message:", response);
      // res.send(`Successfully sent message:${response}`);
      res.send(response);
      // res.status("Successfully sent message:").send(response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
      res.send("Error sending message:");
    });

  // res.send("Got a POST request");
});

// function handleSendNotification() {
//   var registrationToken =
//     "fFhiTijFQVmTYhC-ewj8gK:APA91bHhEnUAIop7fIuj5Kh1NG1yY0Hz9hYWBBTfwjLUvkQTaH2LdQ3RZzomaWwo7yj47TCGxXo6pLmBcyT1sHIXHLVWZ1FZ0_rjWLD0BwgFFXN7_4nOHSt1KHRSAOWmnVGVL6OGJLG8";

//   var payload = {
//     notification: {
//       title: "Account Deposit",
//       body: "A deposit to your savings account has just cleared.",
//     },
//     data: {
//       account: "Savings",
//       balance: "$3020.25",
//     },
//   };

//   var options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24,
//   };

//   admin
//     .messaging()
//     .sendToDevice(registrationToken, payload, options)
//     .then(function (response) {
//       console.log("Successfully sent message:", response);
//     })
//     .catch(function (error) {
//       console.log("Error sending message:", error);
//     });
// }

module.exports = router;
