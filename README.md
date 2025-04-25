# my-vue3-app

## Цель

Создать небольшое SPA-приложение на Vue, которое:

* Загружает список задач из JSON-файла
* Позволяет отмечать задачи как выполненные (чекбоксы)

## Требования

* При первом запуске данные подгружаются из файла tasks.json
* При перезагрузке страницы состояние списка задач сохраняется
* Завернуть полученное приложение в Docker

## Как развернуть приложение

```sh
docker pull ana2323y/vue-app
# скачать образ
```

```sh
docker run -d -p 8080:80 --name vue-app ana2323y/vue-app
# запустить образ в контейнере
```

👉 Приложение будет доступно:
http://localhost:8080

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
