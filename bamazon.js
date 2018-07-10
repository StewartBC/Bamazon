var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var connection = mysql.createConnection({
    host: "localhost",
    port: "/Applications/MAMP/tmp/mysql/mysql.sock",
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    setTimeout(function () {
        listItems();
    }, 1)
});

var listItems = function () {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            var table = new Table({
                head: ["Item ID", "Product Name", "Department", "Price", "Stock Quantity"]
            })
            res.forEach(function (product) {
                table.push([product.item_id, product.product_name, product.department_name, "$" + product.price, product.stock_quantity])
            });
            console.log(table.toString());
            inquire();
        });
}

var inquire = function () {
    inquirer.prompt([
        {
            message: "Enter the ID of the item you would like to purchase",
            name: "choice"
        },
        {
            message: "How many would you like to purchase?",
            name: "amount"
        }
    ]).then(function (answer) {
        checkStock(answer.choice, answer.amount);
    })
}

var checkStock = function (choice, amount) {
    connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: choice
        },
        function (err, res) {
            if (err) throw err;
            if (res[0].stock_quantity >= amount) {
                purchase(choice, res[0].stock_quantity - amount, amount * res[0].price);
            } else {
                console.log("There isn't enough stock! Please select again.");
                inquire();
            }
        }
    )
}

var purchase = function (choice, newStock, total) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStock
            },
            {
                item_id: choice
            }
        ],
        function (err, res) {
            if (err) throw err
            console.log("Your purchase was successful. Your total was $" + total + ".");
            askAnother();
        }
    )
}

var askAnother = function () {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to make another purchase?",
            name: "again"
        }
    ]).then(function (answer) {
        if (answer.again) {
            listItems();
        } else {
            console.log("Okay, I hope you enjoyed your experience at Bamazon! Have a great day!");
            connection.end();
        }
    })
}