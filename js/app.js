// CODE EXPLAINED channel
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById('list')
const input = document.getElementById('item')

let LIST
let id
//classes names to be added
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

let data = localStorage.getItem("TODO")
if (data) {
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
} else {
    LIST = []
    id = 0
}

function loadList(LIST) {
    LIST.forEach(item => {
        addTodo(item.name, item.id, item.done, item.trash)
    });
}
//show today's date and time
const options = { weekday: 'long', month: 'short', day: 'numeric' }
const today = new Date()
dateElement.innerHTML = today.toLocaleTimeString('en-US', options)

function addTodo(todo, id, done, trash) {
    if (trash) { return }

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ""

    const item = `<li class="item">
        <i class="fa ${DONE} co" job="complete" aria-hidden="true" id=${id}></i>
        <p class="text ${LINE}">${todo}</p>
        <i class="fa fa-trash-o de" job="delete" aria-hidden="true" id=${id}></i>
        </li>`

    const position = "beforeend"
    list.insertAdjacentHTML(position, item)
}

document.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        const todo = input.value
        if (todo) {
            addTodo(todo, id, false, false)
            LIST.push({
                todo,
                id,
                done: false,
                trash: false
            })
            localStorage.setItem("TODO", JSON.stringify(LIST))
            id++
        }
        input.value = ""
    }
})

//to check if the todo is completed
function completeTodo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}

//to remove todoList that has been completed and not wanted again
function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
}

list.addEventListener('click', function (event) {
    const element = event.target
    const elementJob = element.attributes.job.value
    if (elementJob === "complete") {
        completeTodo(element)
    } else if (elementJob === "delete") {
        removeTodo(element)
    }
    localStorage.setItem("TODO", JSON.stringify(LIST))
})

clear.addEventListener("click", function () {
    localStorage.clear()
    location.reload()
})