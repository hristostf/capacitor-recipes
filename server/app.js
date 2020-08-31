const express = require('express');

const app = express();

app.get('/', (req, res) => {
	return res.status(200).send('test message');
});

app.listen(5000);
