import inquirer from 'inquirer';
import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    port: 5432
});

// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);

const connectToDB = async () => {
    try {
        await pool.connect();
        console.log('Connected');
    } catch (err) {
        console.error('Error connecting', err);
        process.exitCode = 1;
    }
};

await connectToDB();

function mainMenu() {


    interface Answers {
        initialMenu: string;
        departmentName: string;
        firstName: string;
        lastName: string;
        roleName: string;
        managerName: string;
        title: string;
        salary: number;
        employeeName: string;
    }

    inquirer
        .prompt<Answers>([
            {
                type: 'list',
                name: 'initialMenu',
                message: 'What would you like to do?',
                choices: ['View Department', 'Add department', 'View employees', 'Add employee', 'View roles', 'Add role', 'Update employee role', 'exit']

            }
        ])
        .then((response) => {
            if (response.initialMenu === 'View Department') {
                fetchDepartment();
            } else if (response.initialMenu === 'Add department') {
                inquirer
                    .prompt<Answers>([
                        {
                            type: 'input',
                            name: 'departmentName',
                            message: 'What is the departments name?'

                        }
                    ])
                    .then((response) => {
                        addDepartment(response.departmentName);
                    });
            } else if (response.initialMenu === 'View employees') {
                fetchEmployees();
            } else if (response.initialMenu === 'Add employee') {
                inquirer
                    .prompt<Answers>([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the employees first name?',
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the employees last name?',
                        },
                        {
                            type: 'input',
                            name: 'roleName',
                            message: 'What is the employees role?',
                        },
                        {
                            type: 'input',
                            name: 'managerName',
                            message: 'Who is the employees manager?',
                        }


                    ])
                    .then((response) => { 
                        addEmployee(response.firstName, response.lastName, response.roleName, response.managerName);
                    });
            } else if (response.initialMenu === 'View roles') {
                fetchRoles();
            } else if (response.initialMenu === 'Add role') {
                inquirer
                    .prompt<Answers>([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'What is roles title?',
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary?',
                        },
                        {
                            type: 'input',
                            name: 'departmentName',
                            message: 'What is the department?',
                        },
                    ])
                    .then((response) => { 
                        addRole(response.title, response.salary, response.departmentName);

                    });
            } else if (response.initialMenu === 'Update employee role') {
                inquirer
                .prompt<Answers>([
                    {
                        type: 'input',
                        name: 'employeeName',
                        message: 'What is the employees name?',
                    },
                    {
                        type: 'input',
                        name: 'roleName',
                        message: 'What is the employees new role?',
                    },
                    
                ])
                .then((response) => { 
                    changeRole(response.employeeName, response.roleName);

                });
            } else {
                console.log('goodbye');
                pool.end();
                process.exit(0);
            }
        });
}




const fetchDepartment = async () => {
    const department = await pool.query('SELECT * FROM department');
    console.table(department.rows);


    mainMenu();

}
const fetchEmployees = async () => {
    const employee = await pool.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id');
    console.table(employee.rows);

    mainMenu();

}
const fetchRoles = async () => {
    const roles = await pool.query('SELECT * FROM role');
    console.table(roles.rows);

    mainMenu();

}

const addDepartment = async (departmentToAdd: string) => {
    
    pool.query('INSERT INTO department(name) VALUES ($1)', [departmentToAdd])
    .then(res => console.log('\n', res.rowCount, `row(s) added, added ${departmentToAdd} to database`))
    .catch(err => console.error(err));

    mainMenu();
}

const addEmployee = async (firstName: string, lastName: string, roleName:string, managerName:string) => {
    const managerFL = managerName.split(' ');
    const managerFirstName = managerFL[0];
    const managerLastName = managerFL[1];
    
    const roleIDObject = pool.query('SELECT id FROM role WHERE title = ($1)', [roleName]);
    const roleID = (await roleIDObject).rows[0].id;
    const managerIDObject = pool.query('SELECT id FROM employee WHERE first_name = $1 AND last_name = $2', [managerFirstName, managerLastName]);
    const managerID = (await managerIDObject).rows[0].id;
    pool.query('INSERT INTO employee (first_name,last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleID, managerID])
    .then(res => console.log('\n', res.rowCount, `row(s) added, added ${firstName} ${lastName} to database`))
    .catch(err => console.error(err));

    mainMenu();
}

const addRole = async (title:string, salary:number, department:string) =>{
    const departmentIDObject = pool.query('SELECT id FROM department WHERE name = ($1)', [department]);
    const departmentID = (await departmentIDObject).rows[0].id;
    pool.query('INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)', [title, salary, departmentID])
    .then(res => console.log('\n', res.rowCount, `row(s) added, added ${title} to database`))
    .catch(err => console.error(err));

    mainMenu();
}

const changeRole = async (employeeName:string, roleName: string) =>{
    const employeeFL = employeeName.split(' ');
    const employeeFirstName = employeeFL[0];
    const employeeLastName = employeeFL[1];

    const roleIDObject = pool.query('SELECT id FROM role WHERE title = ($1)', [roleName]);
    const roleID = (await roleIDObject).rows[0].id;
    pool.query('UPDATE employee SET role_id=$1 WHERE first_name=$2 AND last_name=$3', [roleID, employeeFirstName, employeeLastName])
    .then(res => console.log('\n', res.rowCount, `row(s) updated, updated ${employeeName}'s role to ${roleName}`))
    .catch(err => console.error(err));

    mainMenu();

}


mainMenu();