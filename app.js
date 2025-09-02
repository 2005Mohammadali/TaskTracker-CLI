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

function showTask() {
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
    const tasks = showTask();
    const id = tasks.length > 0 ? Math.max(...tasks.map(e => e.id)) + 1 : 1;
    let date = new Date();
    const newTask = {
        id: id, 
        description: description, 
        state: "pending", 
        dateCreated: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    }
    tasks.push(newTask);
    try {
        fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2), "utf-8");
        console.log(`"${newTask.description}" task added`);
        
    } catch (error) {
        console.error("Error while writing task !", error);
    }
    
}


function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "add":
            const task = args.slice(1).join(' ');
            addTask(task);
            break;
        
        case "list":
            console.log("---------Your To-do List---------");
            showTask().forEach(element => {
                console.log(`${element.id}.  ${element.description}  ${element.state}`)
            });
            console.log("---------------------------------");
            break;
        default:
            console.log("Unknown command entered !");
            console.log("Usage: node todo.js <command> [arguments]");
            console.log("Commands:");
            console.log("  add <description>  - Add a new task.");
            console.log("  list               - List all tasks.");
            break;
    }
}

main();