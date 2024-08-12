var express = require ('express'); 

const app = express();

app.get('/', function (req, res) {
    console.log('/');
    console.log('Hello World!');
    res.send('Hello World!');
});

app.get('/health', function (req, res) {
    console.log('/health');
    res.send('health: true');
});

app.get('/wait', function (req, res) {
    console.log('/wait');

    const timeout = 10;
    
    const delayedResponse = () => {
        msg = `Hello world in ${timeout} seconds`
        console.log(msg);
        res.send(msg);
    };

    setTimeout(delayedResponse, timeout * 1000);
});

const server = app.listen(3000, function() {
    console.log('Server listening on port 3000!');
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
      });
});
  
process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
      });
});