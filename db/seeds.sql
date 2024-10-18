 INSERT INTO department (name) 
 VALUES ('HR'),
        ('Accounting'),
        ('Logistics');

INSERT INTO role (title, salary, department)
VALUES ('Recruiter I', 50000.00, 1),
        ('Accountant I', 80000.00, 2),
        ('Coordinator I', 75000.00,3);

INSERT INTO employee(first_name,last_name, role_id)
VALUES ('Sallie', 'Smith', 1),
        ('Lily', 'May', 2),
        ('Mark', 'Peters', 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


