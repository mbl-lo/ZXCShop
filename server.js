const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Настройка подключения к базе данных
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '408',
    port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '')));

// Обработка GET-запроса для получения студентов
app.get('/students', (req, res) => {
    pool.query('SELECT * FROM students', (error, results) => {
        if (error) {
            return res.status(500).send('Ошибка при получении данных');
        }
        res.json(results.rows);
    });
});

// Обработка POST-запроса для добавления студента
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    pool.query('INSERT INTO students (name, email) VALUES ($1, $2)', [name, email], (error) => {
        if (error) {
            return res.status(500).send('Ошибка при добавлении данных');
        }
        res.redirect('/');
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});