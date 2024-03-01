const newTodo = document.querySelector('.add-todo');
const todoList = document.querySelector('.todo-boxes');
const itemInput = document.getElementById('create-todo');
const optionsBar = document.querySelector('.options');
const allbtn = document.querySelector('.allbtn');
const activebtn = document.querySelector('.activebtn');
const completedbtn = document.querySelector('.completedbtn');
const clearcomplete = document.querySelector('.clearbtn');
const numItems = document.querySelector('.numItems');

// Function to show all Todos onload
function showTodos(){

    const todos = getItemsFromStorage();

    todos.forEach(todo => addTodoDOM(todo));
    checkUI();
}

// Function to add Todo to DOM
function addTodoDOM(item){

    const newLi = document.createElement('li');
    newLi.classList.add('todo');
    newLi.classList.add('active');
    const text = document.createTextNode(item);
    const circle = document.createElement('div');
    circle.classList.add('check-circle');
    const icon = createIcon("fa-solid fa-x");

    newLi.appendChild(circle);
    newLi.appendChild(text);
    newLi.appendChild(icon);
    document.querySelector('.todo-boxes').appendChild(newLi);

    itemInput.value='';
}

// Function to create icon
function createIcon(classes)
{
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Function to get todos from storage
function getItemsFromStorage(){
    
    let itemsFromStorage;

    if(localStorage.getItem('todos') === null){
        itemsFromStorage = [];
    }
    else{
        itemsFromStorage=JSON.parse(localStorage.getItem('todos'));
    }

    return itemsFromStorage;
}

// Function to add todos to storage
function addTodoStorage(e){

    if(e.keyCode == 13){
        
        let itemsFromStorage = getItemsFromStorage();
        
        item = itemInput.value;
        if(item.trim()=='')
        {
            alert("Please enter a Todo");
            return;
        }

        itemsFromStorage.push(item);
        
        localStorage.setItem('todos', JSON.stringify(itemsFromStorage));
        addTodoDOM(item);
        checkUI();
    }
}

function checkUI(e){

    const todos = getItemsFromStorage();
    if(todos.length === 0){
        optionsBar.style.display='none';
    }
    else{
        let text;
        if(todos.length > 1)
            text = document.createTextNode(`${todos.length} items left`);
        else if(todos.length === 1)
            text = document.createTextNode(`${todos.length} item left`);

        if(numItems.hasChildNodes())
            numItems.removeChild(numItems.firstChild);

        numItems.appendChild(text);

        optionsBar.style.display='flex';
    }

    // To change the color of the buttons
    // if(e.target.classList.contains("all")){
        
    //     const btn=e.target;
    //     if(btn.style.color === 'white')
    //         btn.style.color='hsl(235, 67%, 50%)';
    //     else
    //         btn.style.color='white';
    // }
}

// Function to edit on click
function onClickTodo(e){

    console.log(e.target);
    if(e.target.parentElement.classList.contains('todo-boxes')){
        e.target.classList.toggle('completed');
        e.target.classList.toggle('active');
    }
}

// Function to show the completed todos
function showCompletedTodos(){

    checkUI();

    // From each todo, display only the ones that have the word
    // completed in their classname
    const todos = document.querySelectorAll('li');

    todos.forEach(todo => {
        if(todo.classList.contains('completed')){
            todo.classList.toggle('active');
            todo.classList.toggle('displayCompleted');
            todo.style.display='flex';
        }
        else
            todo.style.display='none';
    });
}

// Function to show the active todos
function showActiveTodos(){

    const todos = document.querySelectorAll('li');

    todos.forEach(todo => {
        if(todo.classList.contains("active")){
            // todo.classList.toggle('completed');
            todo.style.display='flex';
        }
        else{
            todo.style.display='none';
        }
    })
}

function init(){
    newTodo.addEventListener('keypress', addTodoStorage);
    document.addEventListener('DOMContentLoaded', showTodos);
    completedbtn.addEventListener('click', showCompletedTodos);
    allbtn.addEventListener('click', showTodos);
    activebtn.addEventListener('click', showActiveTodos);
    todoList.addEventListener('click', onClickTodo);
    
    checkUI();
}

init();