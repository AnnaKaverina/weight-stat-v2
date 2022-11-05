const express = require('express');
const userData = require('./userData.json');
const app = express();
const port = 3001;

app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/stat', (req, res) => {
	res.send(userData);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
