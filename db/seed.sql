use emptracker_db;

insert into department (name)
values ("Underwriting"), ("Claims"), ("Customer Service");

insert into roles (title, salary, department_id)
values ("Underwriter", 60000, 1), ("Claims Handler", 55000, 2), ("Customer Service Agent", 30000, 3)

insert into employee (first_name, last_name, role_id, manager_id)
values  ("John", "Smith", 1, 1), ("Jane", "Moore", 1, 1),
        ("Greg", "Lawson", 2, 2), ("Krista", "Diamond", 2, 2),
        ("Thomas", "Brown", 3, 3), ("Jenna", "Johnson", 3, 3);