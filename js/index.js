const calendar = Array(...document.querySelectorAll('.day'))
const addButtons = Array(...document.querySelectorAll('button.add'))
const closeButton = document.querySelector('button.close')
const modalWindow = document.querySelector('#modalWindow')
const taskList = localStorage.getItem('myTasks') ? [...JSON.parse(localStorage.getItem('myTasks'))] : [];
const submitButton = document.querySelector('button[type="submit"')
const inputValue = document.querySelector('input')

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
        modalWindow.style.display = "flex";
        submitButton.setAttribute('class', `${addButtons.indexOf(button)}`)
    })
})
submitButton.addEventListener('click', e =>{
    e.stopPropagation();
    e.preventDefault();
    const name = inputValue.value;
    console.log
        if(name != null && name){
            const task = new Task(name, +submitButton.getAttribute('class'), Math.floor(Math.random() * 1000000))
            taskList.push(task)
            addTask(task) 
            localStorage.setItem('myTasks', JSON.stringify([...taskList]))
            modalWindow.style.display = "none";
            inputValue.value = ""
        }
        else{
            alert('Write at least 1 character in "Your task" field')
        }

})
modalWindow.addEventListener('click',e=>{
    e.preventDefault();
    if(e.target == modalWindow){
        modalWindow.style.display = "none";
    }
})

closeButton.addEventListener('click',e =>{
    e.preventDefault();
    e.stopPropagation()
    modalWindow.style.display = "none";
})
// First step - create modal window: complete;
// Second step - implement open/closing logic: 
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