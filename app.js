const express = require('express');
const app = express();
const port = 3000;

app.use('static', express.static(__dirname + 'public'))

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.post('/', (req, res) => {
//     res.send('Got a POST request');
// });

// app.put('/user', (req, res) => {
//     res.send('Got a PUT request at user');
// });

// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at user');
// });

// app.all('/secret', (req, res, next) => {
//     console.log('All path /secret');
//     next();
// }, (req, res, next) => {
//     console.log('Next handler');
//     // res.send('Secret PATH');
//     next();
// });

// app.get("/", (req, res) => {
//     res.send("root");
// });

// app.get("/about", (req, res) => {
//     res.send("about");
// });

// app.get("/random-text.txt", (req, res) => {
//     res.send("random-text.txt");
// });

// app.get("/ab?cd", (req, res) => {
//     res.send("ab?cd");
// });

// app.get("/ab+cd", (req, res) => {
//     res.send("ab+cd");
// });

// app.get("/ab*cd", (req, res) => {
//     res.send("ab*cd");
// });

// app.get("/ab(cd)?e", (req, res) => {
//     res.send("ab(cd)?e");
// });

app.get(/a/, (req, res) => {
    res.send("/a/");
});

app.get(/.*fly$/, (req, res) => {
    res.send("/.*fly$/");
});

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
});