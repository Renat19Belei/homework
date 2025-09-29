const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const HOST = "127.0.0.1";
const PORT = 8000;
const postsFilePath = path.join(__dirname, 'posts.json');
const usersFilePath = path.join(__dirname, 'users.json');

let posts = [];
let users = [];

function loadDataFromFile(filePath, entityName) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
       // Перевірка на порожній файл.
    if (fileContent.trim().length === 0) {
      console.log(`[СЕРВЕР] Файл ${path.basename(filePath)} порожній. Завантажено 0 ${entityName}.`);
      return [];
    }
    
    let rawData = JSON.parse(fileContent);

    return rawData.map(item => ({
      ...item,
      id: String(item.id)
    }));
  } catch (readError) {
    return [];
  }
}

posts = loadDataFromFile(postsFilePath, 'постів');
users = loadDataFromFile(usersFilePath, 'користувачів');
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Ласкаво просимо до тестового API!",
    endpoints: {
      posts: "/posts?skip={}&take={}",
      postById: "/posts/{id}",
      users: "/users",
      userById: "/users/{id}?fields=name,email"
    }
  });
});

app.get('/posts', (req, res) => {
  const skipCount = Number(req.query.skip) || 0;
  const takeCount = Number(req.query.take) || posts.length; 
  // Перевірка на від'ємні значення 'skip' або 'take'.
  if (skipCount < 0 || takeCount < 0) {
    return res.status(400).send("Параметри skip та take повинні бути невід'ємними числами.");
  }

  const subsetPosts = posts.slice(skipCount, skipCount + takeCount);
  res.setHeader('X-Total-Count', posts.length);
  res.status(200).json(subsetPosts);
});

app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  // Якщо пост знайдено.
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).send('Пост не знайдено');
  }
});
app.get('/users', (req, res) => {
  const publicUsers = users.map(user => {
    const { password, ...publicUser } = user;
    return publicUser;
  });
  res.status(200).json(publicUsers);
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const fieldsParam = req.query.fields;
  const user = users.find(u => u.id === userId);
// Якщо користувача не знайдено, повертаємо 404.
  if (!user) {
    return res.status(404).send('Користувача не знайдено');
  }

  const { password, ...safeUser } = user;
  // Перевіряємо, чи був переданий параметр 'fields' для фільтрації.
  if (fieldsParam) {
    const selectedFields = fieldsParam.split(',').map(f => f.trim());
    const result = {};

    selectedFields.forEach(field => {
      // Перевіряємо, чи існує запрошене поле в об'єкті користувача.
      if (safeUser.hasOwnProperty(field)) {
        result[field] = safeUser[field];
      }
    });
  // Перевіряємо, чи знайшли ми хоча б одне поле.
    if (Object.keys(result).length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(400).send('Жодне із полів не знайдено.');
    }
  }

  res.status(200).json(safeUser);
});

app.listen(PORT, HOST, () => {
  console.log("Сервер запущено!");
});
