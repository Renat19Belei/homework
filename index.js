const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

const postsFilePath = path.join(__dirname, 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));

app.get('/posts', (req, res) => {
    const skip = Number(req.query.skip) || 0;
  const take = Number(req.query.take) || posts.length;

    if (isNaN(skip) || isNaN(take)) {
        return res.status(400).send("Параметри skip та take повинні бути числами");
    }
    const result = posts.slice(skip, skip + take);
    res.send(result);
});
app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send("Пост не знайдено");
    }

    res.send(post);
});

app.listen(PORT,HOST, () => {
    console.log(`http://127.0.0.1:${HOST}:${PORT}`);
});
