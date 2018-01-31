//imports
const mysql = require('mysql') //mysql package
const inquirer = require('inquirer') //inquirer package
const Table = require('cli-table') //cli-table package
const chalk = require('chalk') //chalk package
const CRUD = require('./databaseCRUD.js') //CRUD functions

//initialize the connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'fauxmazonDB'
})

//function that totals up the customer's request
const totalCheckout = (amount, id, data) => {
  let price = data[id-1].price
  let total = price * amount
  console.log(chalk.green(`Your total comes out to: $${total}`))
  console.log(chalk.gray('Thank you for shopping at FAUXMAZON!'))
}

//function that checks the inventory against a customer's request
const inventoryCheck = (amount, id, data) => {
  if(amount <= data[id-1].stock_quantity){
    console.log(chalk.green('Added to Cart!\n'))
    //updates the database according to the order amount
    CRUD.updateDB(data[id-1].stock_quantity - amount, id)
    totalCheckout(amount, id, data)
  } else {
    console.log(chalk.red('Insufficient quantity!'))
    setTimeout(() =>{
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H')
      console.log(chalk.gray('Returning to the store'))
    }, 1000)
  }
  
  initializeApplication()
}

//function that runs on the start of the application
const initializeApplication = () => {
  const table = new Table({
    head: ['ID', 'Product Name', 'Department', 'Price', 'Stock'], 
    colWidths: [6, 40, 20, 12, 8]
  })
  CRUD.readDB().then((data) => {
    console.log(chalk.gray('\n================================== WELCOME TO FAUXMAZON ================================== \n'))
    data.forEach((item) => {
      table.push([
        item.item_id,
        item.product_name,
        item.department_name,
        item.price,
        item.stock_quantity
      ])
    })
    console.log(table.toString())
    //run an inquirer prompt to gather user input
    inquirer.prompt([
      {
        type: 'input',
        message: 'Please enter the id of the item you would like to purchase',
        name: 'productID'
      },
      {
        type: 'input',
        message: 'How many would you like?',
        name: 'quantity'
      }
    ]).then((answers) => {
      let id = answers.productID
      let quantity = answers.quantity
      console.log(`You requested: ${id}`)
      console.log(`With a quantity of: ${quantity}`)
      inquirer.prompt({
        type: 'confirm',
        message: 'Is this correct?',
        name: 'confirm',
        default: true
      }).then(() =>{
        inventoryCheck(quantity, id, data)
      }) 
    })
  })
}

//run the readDB() function so that the customer can see what is for sale
initializeApplication()
