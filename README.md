# Vend-O-Matic

## Description
A vending machine that takes in quarters and dispenses a drink of choice.

## Table of Contents
- [Description](#description)  
- [Must-Haves](#must-haves) 
- [Technologies](#technologies)  
- [Installation](#installation) 
- [MVC](#mvc)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage) 
- [Deployment](#deployment)

## Must-Haves
- Can only accept quarters
- Price of each drink is two quarters
- Three drinks with a stock of five each
- Vending machine will accept more quarters than the price of a drink
- Can only dispense one drink at a time
- Unused quarters must be returned

## Technologies
![Alt text](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "")
![Alt text](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E "")
![Alt text](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white "")
![Alt text](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white "")
![Alt text](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white "")
![Alt text](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black "")
![Alt text](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white "")
![Alt text](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white "")

## Installation
1. Install the required packages 
    * Using the Node.js package manager:

                npm install

        - Express
        - Express handlebars
        - MySql 
        - Sequelize

2. Download and create a .env file:
    (make sure you add to .gitignore)

                npm install dotenv --save

    * Update .env file to include your username and password to connect to database:

                DB_NAME = 'vending_machine_db'
                DB_USER= ''
                DB_PASSWORD= ''

    * Source schema:

                mysql -root -p

        * Enter password at prompt

        * In MySQL database:

                source db/schema.sql

3. Lastly, at the root of the project run: 
                
                npm start

## MVC
```
📦vending-machine
 📦config
 ┗ 📜connection.js
 📦controllers
 ┣ 📂api
 ┃ ┣ 📜index.js
 ┃ ┗ 📜inventory-routes.js
 ┣ 📜home-routes.js
 ┗ 📜index.js
 📦db
 ┗ 📜schema.sql
 📦models
 ┗ 📜Inventory.js
 📦public
 ┣ 📂images
 ┣ 📂javascript
 ┃ ┗ 📜index.js
 ┗ 📂stylesheets
 ┃ ┗ 📜style.css
 📦views
 ┣ 📂layouts
 ┃ ┗ 📜main.handlebars
 ┗ 📜homepage.handlebars
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
 ```

## API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| PUT | / | To accept quarters |
| DELETE | / | To return unused quarters |
| GET | /api/inventory | To retrieve current stock quantities |
| GET | /api/inventory/:id | To retrieve a single drink's remaining inventory |
| PUT | /api/inventory/:id | To make a purchase, return unused coins, and update inventory  |
| PUT | /api/inventory/:id | Response Code 404: if drink is out of stock |
| PUT | /api/inventory/:id | Response Code 403: if an attempt to purchase made but not enough quarters entered |

![Alt text](/public/images/put-adding-coins.jpg?raw=true "GET inventory route")
![Alt text](/public/images/delete-route.jpg?raw=true "GET inventory route")
![Alt text](/public/images/get-inventory.jpg?raw=true "GET inventory route")
![Alt text](/public/images/get-1-inventory.jpg?raw=true "GET inventory route")
![Alt text](/public/images/put-buy.jpg?raw=true "GET inventory route")
![Alt text](/public/images/put-oos.jpg?raw=true "GET inventory route")
![Alt text](/public/images/put-insufficient-coins.jpg?raw=true "GET inventory route")

## Usage
- Add Quarters
- Select a drink
- Submit Order
- Total amount and Return Amount will display

![Alt text](/public/images/vending-machine-screen.jpg?raw=true "vending machine screen")
![Alt text](/public/images/inventory.jpg?raw=true "vending machine screen")

## Deployment
https://fathomless-garden-17006.herokuapp.com/