// npm requires mysql package;
var mysql = require('mysql');
// npm requires inquirer for user interactivity 
var inquirer = require('inquirer'); 

//This connect info for  database 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'

})

//This is the action for conection
connection.connect(function(err){
    // if connection unseccessfull it will show the error
    if(err) throw err; 
    // if successfull it will this print
    console.log("Connection successfull!");
    //Then it will run this function.
    createTable();
})

// This is the function for connection that will create table. 
var createTable = function () {
    connection.query("select * from products", function(err,res) {
        for (var i=0; i<res.length; i++) {
            console.log(res[i].item_id + " | | " + res[i].product_name + " | | " + res[i].department_name+ " | |" + res[i].price + " | | " + res[i].stock_quantity + "\n" ); 
        }

        promptBuyer(res);
    })
}

// This function will print the questions  and  hold the input...
var promptBuyer = function(res) {
    inquirer.prompt([{
        type : 'input',
        name : 'choice',
        message : 'What would you like to buy today?'
    }]).then (function(answer){
        var correct = false;
        for(var i=0; i<res.length; i++) {
            if(res[i].product_name == answer.choice){
            correct = true; 
            var product = answer.choice;    
            var id= i;
            inquirer.prompt({
                type: 'input',
                name: 'quant',
                message: "How many would you like today?",
                validate : function(value){
                    if(isNaN(value)==false){
                        return true;
                    }
                    else { 
                        return false;
                    }
                }     
            }).then(function(answer){
                if((res[id].stock_quantity-answer.quant)>0){
                    connection.query("UPDATE products SET stock_quantity='" + (res[id].stock_quantity- answer.quant)+ "' WHERE product_name='"+product+"'" , function(err,res2){
                        console.log("You order has been placed! It will be shipped soon!");
                        createTable();

                    })
                } else {
                    console.log("Insufficient Quantity!!");
                    promptBuyer(res); 
                }
            })
        }
    }
})
}
      
