const express = require('express');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const app = express();
const HOST = '127.0.0.1';
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
app.post('/posts', async (req, res) => {
  try {
    const { назва, опис, картинка, title, description, image } = req.body;
    const name = назва || title;
    const desc = опис || description;
    const img = картинка || image;

    // Перевірка валідації якщо якесь поле відсутнє то 422 помилка
    if (!name || !desc || !img) {
      return res.status(422).json({
        error: "Помилка валідації",
        message: "Потрібні поля: 'назва', 'опис', 'картинка' або 'title', 'description', 'image'"
      });
    }

    let currentPosts = [];
    try {
      const data = await fsPromises.readFile(postsFilePath, 'utf-8');
      currentPosts = JSON.parse(data);
    } catch (err) {
      // Якщо файл ще не існує то починаємо з порожнього масиву
      if (err.code === 'ENOENT') currentPosts = [];
      else throw err;
    }

    const newPost = {
      id: String(currentPosts.length + 1),
      назва: name,
      опис: desc,
      картинка: img,
      createdAt: new Date().toISOString()
    };

    currentPosts.push(newPost);
    posts = currentPosts;
    await fsPromises.writeFile(postsFilePath, JSON.stringify(currentPosts, null, 2), 'utf8');

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Помилка при POST /posts:", error);
    return res.status(500).json({
      error: "Помилка сервера",
      message: "Не вдалося обробити запит."
    });
  }
});

app.get('/users', (req, res) => {
  const publicUsers = users.map(user => {
    const { password, ...pub } = user;
    return pub;
  });

  return res.status(200).json(publicUsers);
});
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const fieldsParam = req.query.fields;
  const user = users.find(u => u.id === userId);

  // Якщо не знайдено 404
  if (!user) return res.status(404).send('Користувача не знайдено');

  const { password, ...safeUser } = user;

  // Якщо передано параметр fieldsнаприклад ?fields=nameemail
  if (fieldsParam) {
    const selectedFields = fieldsParam.split(',').map(f => f.trim());
    const result = {};

    // Збираємо тільки ті поля які реально існують
    selectedFields.forEach(f => {
      if (safeUser.hasOwnProperty(f)) result[f] = safeUser[f];
    });

    // кщо знайшли хоча б одне поле  то повертаємо його
    if (Object.keys(result).length > 0) return res.status(200).json(result);
    return res.status(400).send('Жодне із полів не знайдено.');
  }
  return res.status(200).json(safeUser);
});

app.listen(PORT, HOST, () => {
  console.log(`Сервер запущено http://${HOST}:${PORT}`);
});
