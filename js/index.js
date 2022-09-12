const calendar = Array(...document.querySelectorAll('.day'))
const addButtons = Array(...document.querySelectorAll('button.add'))
const taskList = localStorage.getItem('myTasks') ? [...JSON.parse(localStorage.getItem('myTasks'))] : [];

class Task{
    constructor(name, day){
        this._name = name;
        this.day = day;
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
    const task = new Task(taskRaw._name, taskRaw.day)
    updateDisplay(task)
})

addButtons.forEach(button => {
    button.addEventListener('click', function(){
        const name = prompt('Task?', 'Chill');
        const task = new Task(name, addButtons.indexOf(button))
        taskList.push(task)
        updateDisplay(task)
        localStorage.setItem('myTasks', JSON.stringify([...taskList]))
    })
})
function updateDisplay(task){
    console.log(task.name)
    const html = `<div>
        <h3>${task.name}</h3>
    </div>`
    calendar[task.day].innerHTML += html;
}