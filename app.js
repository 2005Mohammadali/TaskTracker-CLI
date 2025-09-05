const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "tasks.json");

function fileExist() {
    try {
        if (!fs.existsSync(filepath)) {   
            fs.writeFileSync(filepath, '[]', "utf-8", ()=>{
                console.log("File created: tasks.json");
            })
        }
    } catch (err) {
        console.err("Error while creating a file");
    }
}

function fetchTask() {
    fileExist();
    try {
        const tasks = fs.readFileSync(filepath, "utf-8");
        return JSON.parse(tasks);
    } catch (error) {
        console.error("Error parsing tasks.json file:", error);
        return [];
    }
}

function addTask(description) {
    if (!description) {
        console.log("Please provide a task description.");
        return;
    }
    const tasks = fetchTask();
    const id = tasks.length > 0 ? Math.max(...tasks.map(e => e.id)) + 1 : 1;
    let date = new Date();
    const newTask = {
        id: id, 
        description: description, 
        state: "pending", 
        dateCreated: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        dateUpdated: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    tasks.push(newTask);
    try {
        fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2), "utf-8");
        console.log(`"${newTask.description}" task added`);
        
    } catch (error) {
        console.error("Error while writing task !", error);
    }
    
}

function listAllTasks() {
    
    console.log("---------Your To-do List---------");
    fetchTask().filter(element => {
        console.log(`${element.id}.  ${element.description}  ${element.state}`)
    });
    console.log("---------------------------------");
}

function listDone() {
    
    console.log("---------Your To-do List---------");
    fetchTask().filter(element => {
        if (element.state == "done") {
            console.log(`${element.id}. ${element.description}`);
        }
    });
    console.log("---------------------------------");
}

function listInProgress() {
    
    console.log("---------Your To-do List---------");
    fetchTask().filter(element => {
        if (element.state == "in-progress") {
            console.log(`${element.id}. ${element.description}`);
        }
    });
    console.log("---------------------------------");
}

function listPending() {
    
    console.log("---------Your To-do List---------");
    fetchTask().filter(element => {
        if (element.state == "pending") {
            console.log(`${element.id}. ${element.description}`);
        }
    });
    console.log("---------------------------------");
}

function updateTask(id, newState) {
    const tasks = fetchTask();
    let date = new Date();
    const taskToUpdate = tasks.find(task => task.id === id);
    
    if(!taskToUpdate){
        console.log(`Task with ${id} not found ...`);
    }
    
    taskToUpdate.state = newState;
    taskToUpdate.dateUpdated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
    try {
        fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2), "utf-8");
        console.log(`Task "${taskToUpdate.description}" has marked as ${taskToUpdate.state}.`);
    } catch (error) {
        console.log("Error while updating task !!");
    }
}

function deleteTask(id) {
    const updatedTasks = fetchTask().filter(task => task.id !== id);
    for (let i = 0; i < updatedTasks.length; i++) {
        updatedTasks[i].id = i+1;
    }
    try {
        fs.writeFileSync(filepath, JSON.stringify(updatedTasks, null, 2), "utf-8");
        console.log(`Task with id ${id} deleted succesfully.`);
    } catch (error) {
        console.log("Error occured while deleting task");
    }
}

function main() {
    //[node, app.js, <command>, args]
    const args = process.argv.slice(2); //[<command>, args]
    const command = args[0];
    switch (command) {
        case "add":
            const task = args.slice(1).join(' ');
            addTask(task);
            break;
        
        case "list":
            if (args[1] === "done") {
                listDone();
            } else if (args[1] === "in-progress") {
                listInProgress();
            } else if (args[1] === "pending") {
                listPending();
            } else {
                listAllTasks();
            }
            break;
        
        case "update":
            const changeStatus = parseInt(args[1], 10);
            if (args[2] === "done") {
                updateTask(changeStatus, "done");
            } else if (args[2] === "pending") {
                updateTask(changeStatus, "pending");
            } else if(args[2] === "in-progress"){
                updateTask(changeStatus, "in-progress");          
            }
            break;
        
        case "delete":
            deleteTask(parseInt(args[1], 10));
            break;

        default:
            console.log("Unknown command entered !");
            console.log("Usage: node todo.js <command> [arguments]");
            console.log("Commands:");
            console.log("  add <description>      - Add a new task.");
            console.log("  list <options>         - List done|in-progress|pending|all tasks.");
            console.log("  update <id> <status>   - Mark a task as done|pending|in-progress.");
            console.log("  delete <id>            - Delete a task.");
            break;
    }
}

main();