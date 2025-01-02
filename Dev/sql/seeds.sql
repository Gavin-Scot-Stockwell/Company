-- Seeding data for department table
INSERT INTO department (name) VALUES 
('Engineering'),
('Sales'),
('Marketing');

-- Seeding data for role table
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('Sales Manager', 90000, 2),
('Marketing Specialist', 70000, 3); 

-- Seeding data for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, 1),
('Jane', 'Smith', 2, 1),
('Emily', 'Jones', 3, 1);