//require the mysql package
const mysql = require('mysql')
const chalk = require('chalk')

//initialize the connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'fauxmazonDB'
})
// == CREATE ==================================================================
// const createProduct = () => {
// 
// }
// == READ ====================================================================
const readDB = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products', (error, response) => {
      resolve(response)
    })
  })
}
// == UPDATE ==================================================================
const updateDB = (amount, id) => {
  connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {stock_quantity: amount},
      {item_id: id}
    ],
    (error, response) => {
      console.log(chalk.gray('Updated stock'))
    }
  )
}

module.exports = {
  readDB: readDB,
  updateDB: updateDB
}