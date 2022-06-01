USE employee_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Development'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, departments_id)
VALUES ('Salesperson', 80000, 1), ('Sales Team Mgr', 100000, 1), ('Senior Engineer', 150000, 2), ('Junior Engineer', 110000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Joe', 'Pugmire', 1), ('Junghoon', 'Yoon', 2), ('Arnold', 'Schwarznegger', 3);

UPDATE employee SET manager_id = 1 WHERE id = 2;