# TaskTracker-CLI
A simple command-line interface (CLI) application for managing your to-do list. Built with Node.js, this app allows you to add and view tasks directly from your terminal.
## Features
- **Add Task**: Users can create a new task and add it to the tracker.

- **Update Task Status**: Users can modify the status of a task (e.g., 'pending', 'in-progress', 'done') by providing its unique ID.

- **List Tasks**: The app can display tasks based on their status, including:
    + All Tasks
    + Done Tasks
    + In-Progress Tasks
    + Pending Tasks

- **Delete Task**: Users can permanently remove a task from the list by specifying its unique ID.

## Prerequisites
- Node.js (LTS version recommended) installed on your machine.

## Getting Started
1. Clone the repository:
   ```Bash
   git clone https://github.com/2005Mohammadali/TaskTracker-CLI
   cd TaskTracker-CLI
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
   Use the list command to display list of all tasks.
   ```Bash
   node app.js list
3. List *done* tasks:
   Use the list done command to display list of *done* tasks.
   ```Bash
   node app.js list done
4. List *in-progress* tasks:
   Use the list in-progress command to display list of *in-progress* tasks.
   ```Bash
   node app.js list in-progress
5. List *pending* tasks:
   Use the list pending command to display list of *pending* tasks.
   ```Bash
   node app.js list pending
6. Update status of task using *id*:
   Use the update command to mark a task as done|pending|in-progress.
   ```Bash
   node app.js update <id> <status>
7. Delete task with *id*: 
   Use the delete command to delete a task using *id*.
   ```Bash
   node app.js delete <id>
   
## Output:
```
---------Your To-do List---------
1.  Your Task1
2.  Your Task2
3.  Your Task3
---------------------------------
