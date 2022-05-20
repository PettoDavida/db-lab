# Anonymous blog 

## About

Anonymous blog is a small lab where we created a backend with REST-api and a frontend to present and access the api. It's a place where you can post whatever you want without anyone being able to know who posted it. Anyone can read posts on the site but you need an account to be able to post posts. Only the user that created the posts can edit or delete them and if they choose to delete their account the posts will follow them into the grave.

## Build Project

open terminal inside the project root folder and run

```

cd backend
npm i

echo "MONGO_URI=mongodb://127.0.0.1:27017/mydb

ACCESS_TOKEN_SECRET= Own Secret" > .env

cd ..

cd frontend
npm i
```

Own Secret in ACCESS_TOKEN_SECRET can be anything you'd like

## Start project

In visual studio code hold 'ctrl + shift + B' to start backend and frontend

If you arent using VS code u need to open the terminal inside the backend/frontend folders respectively and run

```
npm run dev
```
inside backend folder and run

```
npm run serve
```
inside frontend folder
