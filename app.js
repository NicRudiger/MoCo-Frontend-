const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send("Welcome to setting up Node.js project tutorial!'))

app.listen(port, () => console.log(`Application listening on port ${port}!`))