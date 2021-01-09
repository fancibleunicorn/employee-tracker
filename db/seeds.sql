-- Departments Seeds
INSERT INTO departments (department)
    VALUES
        ('HR'),
        ('Accounting'),
        ('Management'),
        ('IT'),
        ('Marketing');

-- Roles Seeds
INSERT INTO roles (title, salary, department_id)
    VALUES
        ('General Manager', 100000, 3),
        ('Assistant Manager', 80000, 3),
        ('HR Agent', 50000, 1),
        ('Accountant', 60000, 2),
        ('IT Agent', 70000, 4),
        ('Web Developer', 60000, 4),
        ('Sales Agent', 40000, 5),
        ('Advertizing Agent', 40000, 5);

-- Employees Seeds
INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ('James', 'Dean', 1, NULL),
        ('Elizabeth', 'Moss', 2, 1),
        ('Margaret', 'Merryweather', 2, 1),
        ('Hariet', 'Spywell', 3, NULL),
        ('James', 'Potter', 3, 4),
        ('Lily', 'Tomlin', 4, NULL),
        ('Douglas', 'Jones', 4, 6),
        ('Roberta', 'Tart', 5, NULL),
        ('Diego', 'Montoya', 6, NULL),
        ('John', 'Good', 7, 2),
        ('Trudy', 'White', 7, 3),
        ('Keri', 'Bradshaw', 8, 1);