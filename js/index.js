const calendar = Array(...document.querySelectorAll('.day'))
const addButtons = Array(...document.querySelectorAll('button.add'))
const taskList = localStorage.getItem('myTasks') ? [...JSON.parse(localStorage.getItem('myTasks'))] : [];

class Task{
    constructor(name, day, id){
        this._name = name;
        this.day = day;
        this.id = id;
    }
    static counter = 0;
    get name(){
        return this._name;
    }
    set name(newName){
        if(newName.length === 0){
            alert('Write at least one character in task')
            return false
        }
        this._name = newName;
    }
}
// let task = new Task('Test', 4)

taskList.forEach(taskRaw => {
    const task = new Task(taskRaw._name, taskRaw.day,taskRaw.id)
    addTask(task)
})

addButtons.forEach(button => {
    button.addEventListener('click', function(){
        const name = prompt('Task?', 'Chill');
        const task = new Task(name, addButtons.indexOf(button), Math.floor(Math.random() * 1000000))
        taskList.push(task)
        addTask(task) 
        localStorage.setItem('myTasks', JSON.stringify([...taskList]))
    })
})
function addTask(task){
    const html = `<div id="${task.id}">
        <h3>${task.name}</h3>
        <button onClick="deleteTask(this)">Delete Task</button>
    </div>`
    calendar[task.day].innerHTML += html;
}
function deleteTask(button){
    const parent = button.parentNode;
    taskList.forEach((task, index) =>{
        if(task.id === +parent.getAttribute('id')){
            taskList.splice(index, 1)
        }
    })
    parent.remove();
    localStorage.setItem('myTasks', JSON.stringify([...taskList]));
}