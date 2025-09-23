const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const HOST = "127.0.0.1"
const PORT = 8000

const postsFilePath = path.join(__dirname, 'posts.json')
const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'))

app.get('/posts', (req, res) => {
  res.status(200).json(posts)
});

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}/`);
});