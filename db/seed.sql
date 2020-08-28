use emptracker;

insert into departments (name)
values ("Underwriting"), ("Claims"), ("Customer Service");

insert into roles (title, salary, department_id)
values ("Underwriter", 60000, 1), ("Claims Handler", 55000, 2), ("CSR", 30000, 3);

insert into employees (first_name, last_name, role_id, manager_id)
values  ("John", "Smith", 1, 2), ("Jane", "Moore", 1, 2),
        ("Greg", "Lawson", 2, 4), ("Krista", "Diamond", 2, 4),
        ("Thomas", "Brown", 3, 6), ("Jenna", "Johnson", 3, 6);
