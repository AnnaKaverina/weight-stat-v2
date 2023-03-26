const express = require('express');
const userData = require('./example-stat-data.json');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const port = 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/stat', (req, res) => {
	res.send(userData);
});

app.post('/add-stat', (req, res) => {
	fs.readFile('stub/stat-data.json', 'utf8', (error, data) => {
		const oldData = data ? JSON.parse(data) : [];
		const newData = JSON.stringify([...oldData, req.body]);
		fs.writeFileSync('stub/stat-data.json', newData, (error) => {console.log('___', error)});
		res.send('Запись успешно завершена');
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
