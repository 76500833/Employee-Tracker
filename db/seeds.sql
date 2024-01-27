-- Insert seeds into the `department` table
INSERT INTO department (name)
VALUES ('Sales'), ('Marketing'), ('Finance');

-- Insert seeds into the `role` table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 50000, 1), ('Marketing Coordinator', 40000, 2), ('Accountant', 45000, 3);

-- Insert seeds into the `employees` table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Mike', 'Johnson', 3, 1);

-- John is the manager of mike and jane