DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db;


DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;

-- Create Departments Table
CREATE TABLE departments (
    id INTEGER (11) AUTO_INCREMENT NOT NULL,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Create Roles Table
CREATE TABLE roles (
    id INTEGER (11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INTEGER (11) UNSIGNED,
    department_id INTEGER (11),
    PRIMARY KEY (id)
);

-- Create Employees Table
CREATE TABLE employees (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER (11),
    manager_id INTEGER (11),
    PRIMARY KEY (id)
);