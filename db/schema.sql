create database emptracker;
use emptracker;
create table department(
    id int auto_increment,
    name varchar(20),
    primary key (id)
);
create table roles(
    id int auto_increment,
    title varchar,
    salary int,
    department_id int,
    primary key (id)
);
create table employee(
    id int auto_increment,
    first_name varchar(20),
    last_name varchar(25),
    role_id int,
    manager_id int,
    primary key (id)
);