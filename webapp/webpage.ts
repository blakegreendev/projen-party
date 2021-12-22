import * as express from 'express';

const app = express();

app.get("/", (req, res) => {
     res.sendFile(__dirname + "/index.html");
});

app.listen(80, function () {
     console.log("server started on port 80");
});