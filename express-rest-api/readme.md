# Ensemble Coding Test

This project was bootstrapped with [Express API Scaffolding](https://www.npmjs.com/package/express-draft).
The project uses Prisma for simple DB service [Prisma](https://www.prisma.io/)

## My Setup

Windows 10 Node JS v16.14.2 
Project should also work on Mac, but I do not have any Macs to test on

## Setup process

npm uninstall -g express-draft

npm install -g express-draft

---

npm i

npx prisma push db

npm run dev

## Prisma Studio

To see all the database entries (the table), run this command to open Prisma GUI

---

npx prisma studio


## Important notes

Server starts by default on port 5000. I left out .env file from git ignore in order to have simpler setup for reviewrs

To change listening port - change line `./app.js:29` with another port number.

## Important notes pt2

React project and Express projects are not connected to each other. I wished I had more time to play around with it and build full on full stack web app.
