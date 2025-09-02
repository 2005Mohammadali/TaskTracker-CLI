# TaskTracker-CLI
A simple command-line interface (CLI) application for managing your to-do list. Built with Node.js, this app allows you to add and view tasks directly from your terminal.
## Features
- **Add tasks:** Quickly add new tasks with a description.
- **List tasks:** View all your tasks with their unique ID, description, and status.
- **Data Persistence:** Your tasks are saved to a tasks.json file, so they remain even after you close the application.

## Prerequisites
- Node.js (LTS version recommended) installed on your machine.

## Getting Started
1. Clone the repository:
   ```Bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. Run the application:
  ```Bash
   node app.js
   ```
## Usage
1. Add a new task:
   Use the add command followed by the task description. If the tasks.json file doesn't exist, it will be created automatically.
   ```Bash
   node app.js add "Your Task"
2. List all tasks:
   Use the list command to display your current to-do list.
   ```Bash
   node app.js list

## Output:
```
---------Your To-do List---------
1.  Your Task
---------------------------------
