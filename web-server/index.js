const express = require('express');
const app = express();
const server = require('./app/server');

app.use('/', function (req, res, next) {
    let data = {
        base: '',
        title : 'Test Task',
        meta: '',
        link:'',
        script:'',
        app: 'TEST',
        data:'{token: "tokenhk8jlfnvklfjio"}',
        version: '0.0.1'
    };
    let output = server.template(data);
    return res.status(200).send(output);
    next();
});

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// const httpServer = require('http').createServer(app);
// httpServer.listen(port, function() {
//     console.log('web-server running on port ' + port + '.');
// });
