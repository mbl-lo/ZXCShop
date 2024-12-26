<?php
$host = "localhost"; // Хост
$port = "5432"; // Порт
$dbname = "test"; // Имя базы данных
$user = "postgres"; // Имя пользователя
$password = "123"; // Пароль

// Подключение к базе данных
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Ошибка подключения к базе данных.");
}

// Получение данных из формы
$name = $_POST['name'];

// Вставка данных в таблицу
$query = "INSERT INTO ваша_таблица (имя) VALUES ('$name')";
$result = pg_query($conn, $query);

if ($result) {
    echo "Данные успешно добавлены!";
} else {
    echo "Ошибка при добавлении данных.";
}

// Закрытие соединения
pg_close($conn);
