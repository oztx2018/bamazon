create database bamazon_db; 
use bamazon_db;

create table products (
    
    item_id integer auto_increment not null,
    product_name varchar(45) not null,
    department_name varchar(45) not null,
    price decimal (10,4) not null,
    stock_quantity integer (10) not null,
    primary key (item_id)
    
)
