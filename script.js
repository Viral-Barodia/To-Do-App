const newTodo = document.querySelector('.add-todo');
const todos = document.querySelector('.todo-list');
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
    const text = document.createTextNode(item);
    const circle = document.createElement('div');
    circle.classList.add('check-circle');
    const icon = createIcon('fa-thin fa-circle-xmark');
    console.log(icon);

    newLi.appendChild(circle);
    newLi.appendChild(text);
    newLi.appendChild(icon);
    todos.appendChild(newLi);

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
        itemsFromStorage.push(item);
        
        localStorage.setItem('todos', JSON.stringify(itemsFromStorage));
        addTodoDOM(item);
        checkUI();
    }
}

function checkUI(){

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
}

function showCompleted(e){

    // console.log(e.target);  // class activebtn
    const btn=e.target;
    if(btn.style.color === 'white')
        btn.style.color='hsl(235, 67%, 50%)';
    else
        btn.style.color='white';

    showCompletedTodos();
}

function showCompletedTodos(){

    // From each todo, display only the ones that have the word
    // active in their classname
    const todos = querySelectorAll('li');

    todos.forEach(todo => {
        if(todo.classList.contains('completed'))
            todo.style.display='none';
        else
            todo.style.display='flex';
    });
}

function init(){
    newTodo.addEventListener('keypress', addTodoStorage);
    document.addEventListener('DOMContentLoaded', showTodos);
    completedbtn.addEventListener('click', showCompleted);
    
    checkUI();
}

init();