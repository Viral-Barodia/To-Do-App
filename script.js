const newTodo = document.querySelector('.add-todo');
const todos = document.querySelector('.todo-list');
const itemInput = document.getElementById('create-todo');
const optionsBar = document.querySelector('.options');
const allbtn = document.querySelector('.allbtn');
const activebtn = document.querySelector('.activebtn');
const completed = document.querySelector('.completedbtn');
const clearcomplete = document.querySelector('.clearbtn');

function showTodos(){

    const todos = getItemsFromStorage();

    todos.forEach(todo => addTodoDOM(todo))
}

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

function createIcon(classes)
{
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

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
        optionsBar.style.display='flex';
    }
}

newTodo.addEventListener('keypress', addTodoStorage);
document.addEventListener('DOMContentLoaded', showTodos);


checkUI();