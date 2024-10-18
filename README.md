
# Employee CMS

This command-line application allows users to manage a company's employee database, including departments, roles, and employees using a PostgreSQL database. It provides options to view and update company information interactively.

## Features

The application supports the following operations:

1. **View All Departments**  
   Displays a formatted table showing the department names and department IDs.

2. **View All Roles**  
   Shows a table with the job title, role ID, department, and salary for each role.

3. **View All Employees**  
   Presents a table with details of all employees, including their employee IDs, first names, last names, job titles, departments, salaries, and the managers they report to.

4. **Add a Department**  
   Prompts the user to enter a new department name and adds it to the database.

5. **Add a Role**  
   Prompts the user to input the name, salary, and department for a new role, which is then added to the database.

6. **Add an Employee**  
   Prompts the user for the employee's first name, last name, role, and manager, then adds the new employee to the database.

7. **Update an Employee Role**  
   Allows the user to select an existing employee and update their role in the database.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd employee-management-system
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

1. Once you have created the database and .env file, start the application:
   ```bash
   npm start
   ```
2. Follow the prompts to perform actions such as viewing departments, roles, and employees, or adding and updating records.

## Requirements

- Node.js
- PostgreSQL

## License

MIT License

Copyright (c) 2024 Kristin Denny

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

