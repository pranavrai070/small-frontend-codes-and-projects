const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/53591f183a";

    const options = {
        method: "POST",
        auth: "pranav:32a2b0f1fa49c1a10f203082ce6c2b49-us5"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();


});



app.post("/success", function (req, res) {
    res.redirect("/");
})

app.post("/failure", function (req, res) {
    res.redirect("/")
})



app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server is running brilliantly on port 3000");
});

// api key
// 32a2b0f1fa49c1a10f203082ce6c2b49-us5
//list id
// 53591f183a