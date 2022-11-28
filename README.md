# Vend-O-Matic

## Description
A vending machine that takes in quarters and dispenses a drink of choice. 

## Must-Haves
- Can only accept quarters
- Price of each drink is two quarters
- Three drinks with a stock of five each
- Vending machine will accept more quarters than the price of a drink
- Can only dispense one drink at a time
- Unused quarters must be returned

## Installation
Using the Node.js package manager:
Install the required packages 
npm install
- MySql 
- Express
- Express handlebars
- Sequelize
- download and create a .env file
(make sure you add to .gitignore)
After installation is complete:
- update .env file to include your username and password to connect to database

DB_NAME = 'vending_machine_db'
DB_USER= ''
DB_PASSWORD= ''

- Lastly, at the root of the project run: npm start

## MVC
Model:
models folder:
inventory.js - Sequelize drink inventory table

View:
views folder:
handlebars templates and layouts

Controller:
controllers folder:
home-routes.js
api folder:
inventory-routes.js
index.js

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

## Technologies
- Node.js
- Express.js
- MySql
- Sequelize
- Handlebars.js
 
## Usage
![Alt text](/public/images/vending-machine-screen.jpg?raw=true "vending machine screen")
