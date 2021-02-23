const express = require('express');
const app = express();
const port = 3000;

const myLogger = function (req, res, next) {
    if (!req.url.includes('favicon')) {
        console.log('LOGGED', req.url);
    }
    next();
};

const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

app.use(myLogger);
app.use(requestTime);

app.use(function (error, req, res, next) {
    console.error(error.stack);
    res.status(500).send('Something broke !');
});

// Application middleware =================================
app.use('/user/:id', function (req, res, next) {
    console.log('url', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('type', req.method);
    next();
});

app.get('/user/:id', function (req, res, next) {
    console.log('ID ', req.params.id);
    next(); // next middleware -> User info is :id
    // next('route'); // next route -> :id
}, function (req, res) {
    res.send(`User info is ${req.params.id}`);
});

app.get('/user/:id', function (req, res, next) {
    res.end(req.params.id);
});
// Application middleware =================================

// Router middleware =================================
// const router = express.Router();

// router.use(function (req, res, next) {
//     console.log('Time', Date.now());
//     next();
// });

// router.use('/user/:id', function (req, res, next) {
//     console.log('url', req.originalUrl);
//     next();
// }, function (req, res, next) {
//     console.log('type', req.method);
//     next();
// });

// router.get('/user/:id', function (req, res, next) {
//     console.log('ID ', req.params.id);
//     next(); // next middleware -> User info is :id
//     // next('route'); // next route -> :id
// }, function (req, res) {
//     res.send(`User info is ${req.params.id}`);
// });

// router.get('/user/:id', function (req, res, next) {
//     res.end(req.params.id);
// });

// app.use('/', router);
// Router middleware =================================

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

app.get("/", (req, res) => {
    let responseText = 'Hello world!';
    responseText += `Requested at: ${req.requestTime}`;
    res.send(responseText);
});

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

// app.get(/a/, (req, res) => {
//     res.send("/a/");
// });

// app.get(/.*fly$/, (req, res) => {
//     res.send("/.*fly$/");
// });

app.get('/handler/a', (req, res) => {
    res.send('Hello from A');
});

app.get('/handler/b', (req, res, next) => {
    console.log('Next function ');
    next();
}, (req, res) => {
    res.send('Hello from B');
});

const cb1 = (req, res, next) => {
    console.log('CB 1');
    next();
};

const cb2 = (req, res, next) => {
    console.log('CB 2');
    next();
};

const cb3 = (req, res, next) => {
    res.send('Hello from C');
};

app.get('/handler/c', [cb1, cb2, cb3]);

app.get('/handler/d', (req, res, next) => {
    if (req.query.pass) {
        next();
    } else {
        res.send('Not pass');
        // next('/handler/c');
        // next();
    }
}, (req, res) => {
    if (!req.query.pass) {
        console.log('Next not pass');
    }
    // res.send('Pass')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});