const taskinput = document.querySelector("#task_input")
const addbtn = document.querySelector("#add_btn")
const allbtn = document.getElementById("all_btn")
const activebtn = document.getElementById("active_btn")
const completedbtn = document.getElementById("completed_btn")
const tasklist = document.querySelector("ul")
let arrayoftasks = []


document.addEventListener("DOMContentLoaded", loadtasks)

// Function to load tasks from local storage
function loadtasks(){

    tasklist.innerHTML = ""

    const storedtasks = localStorage.getItem("tasks")
    const savedtasks = JSON.parse(storedtasks)

    if(!savedtasks){
        return
    }

    savedtasks.forEach(task => {

        const newtask = document.createElement("li")
        const checkbox = document.createElement("input")
        const taskname = document.createElement("p")
        const tasktime = document.createElement("span")
        const deletebtn = document.createElement("button")

        checkbox.className = "checkbox"
        checkbox.type = "checkbox"
        checkbox.checked = task.completed
        
        taskname.className = "task_name"
        taskname.textContent = task.name

        tasktime.className = "task_time"
        tasktime.textContent = task.time
        
        deletebtn.className = "delete_btn"
        deletebtn.textContent = "-"
        
        newtask.append(checkbox)
        newtask.append(taskname)
        newtask.append(tasktime)
        newtask.append(deletebtn)
        
        tasklist.append(newtask)

    })
}

// Function to update the task list in local storage
function updatetasklist(){
    
    arrayoftasks = []

    Array.from(tasklist.children).forEach(task => {

        const taskname = task.querySelector(".task_name").textContent
        const iscompleted = task.querySelector(".checkbox").checked
        const tasktime = task.querySelector(".task_time").textContent

        arrayoftasks.push({name: taskname, completed: iscompleted, time: tasktime})

    })
        localStorage.clear()
        localStorage.setItem("tasks", JSON.stringify(arrayoftasks))
}

// Function to add a new task
function addtask(){
    
    if(!taskinput.value.trim()){
        return
        
    }
    
    const newdate = new Date()
    const time =    newdate.getHours().toString().padStart(2, '0') + ":" + newdate.getMinutes().toString().padStart(2, '0') + ":" + newdate.getSeconds().toString().padStart(2, '0') + " " + newdate.getDate() + "/" + (newdate.getMonth() + 1) + "/" + newdate.getFullYear()

    const newtask = document.createElement("li")
    const checkbox = document.createElement("input")
    const taskname = document.createElement("p")
    const tasktime = document.createElement("span")
    const deletebtn = document.createElement("button")
    
    checkbox.className = "checkbox"
    checkbox.type = "checkbox"
    
    taskname.className = "task_name"
    taskname.textContent = taskinput.value
    
    tasktime.className = "task_time"
    tasktime.textContent = time

    deletebtn.className = "delete_btn"
    deletebtn.textContent = "-"
    
    newtask.append(checkbox)
    newtask.append(taskname)
    newtask.append(tasktime)
    newtask.append(deletebtn)
    
    tasklist.append(newtask)
    
    
    taskinput.value = ""

    updatetasklist()
}

// Filter tasks based on filter type
function filtertasks(filtertype){

    if (tasklist.children.length === 0){
        return
    };

    if(filtertype === "all"){
        Array.from(tasklist.children).forEach(task =>{
            task.style.display = "flex"
        })
    } 
    
    else if (filtertype === "active"){
        Array.from(tasklist.children).forEach(task =>{
            if(task.querySelector(".checkbox").checked){
                task.style.display = "none"
            }
            else{
                task.style.display = "flex"
            }
        })  
    }

    else if (filtertype === "completed"){
        Array.from(tasklist.children).forEach(task =>{
            if(task.querySelector(".checkbox").checked){
                task.style.display = "flex"
            }
            else{
                task.style.display = "none"
            }
        })
    }
}

// Event listener for add button
addbtn.addEventListener("click", addtask)

// Allow adding task with Enter key
taskinput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){
        addtask()
    }
})

// Event delegation for delete buttons
tasklist.addEventListener("click", (e) => {

    if(e.target.matches("button")){
        e.target.parentElement.remove()
        updatetasklist()
    }
})

// Event listeners for filter buttons
document.querySelectorAll(".filter_btn").forEach(btn => {
    
    btn.addEventListener("click", () => {
        
        if(btn.id === "all_btn"){
            
            filtertasks("all")
            
            allbtn.style.color = "blueviolet"
            allbtn.style.borderBottom = "2px solid blueviolet"

            activebtn.style.color = "black"
            activebtn.style.borderBottom = "2px none blueviolet"

            completedbtn.style.color = "black"
            completedbtn.style.borderBottom = "2px none blueviolet"

        }

        else if(btn.id === "active_btn"){

            filtertasks("active")

            activebtn.style.color = "blueviolet"
            activebtn.style.borderBottom = "2px solid blueviolet"

            allbtn.style.color = "black"
            allbtn.style.borderBottom = "2px none blueviolet"

            completedbtn.style.color = "black"
            completedbtn.style.borderBottom = "2px none blueviolet"

        }

        else if(btn.id === "completed_btn"){
            filtertasks("completed")

            completedbtn.style.color = "blueviolet"
            completedbtn.style.borderBottom = "2px solid blueviolet"

            allbtn.style.color = "black"
            allbtn.style.borderBottom = "2px none blueviolet"

            activebtn.style.color = "black"
            activebtn.style.borderBottom = "2px none blueviolet"
        }
    })
})

// Event delegation for checkbox changes
tasklist.addEventListener("change", (e) => {
    if(e.target.matches(".checkbox")){
        updatetasklist()
    }
})

// Event listener for clear completed button
document.getElementById("clear_btn").addEventListener("click", () => {
    Array.from(tasklist.children).forEach(task => {
        if(task.querySelector(".checkbox").checked){
            task.remove()
        }
    })
    updatetasklist()
})