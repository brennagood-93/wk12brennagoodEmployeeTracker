drop database if exists emptracker;
create database emptracker;
use emptracker;
create table departments(
    id int auto_increment,
    name varchar(20),
    primary key (id)
);
create table roles(
    id int auto_increment,
    title varchar(50),
    salary int,
    department_id int,
    primary key (id)
    
    
);
create table employees(
    id int auto_increment,
    first_name varchar(20),
    last_name varchar(25),
    role_id int,
    manager_id int,
    primary key (id)
  
);