const newTodo = document.querySelector('.add-todo');
const todos = document.querySelector('.todo-list');
const itemInput = document.getElementById('create-todo');
const todoList = document.querySelector('.todo-list');

function addTodoDOM(e){
    if(e.keyCode == 13){

        addTodoStorage(itemInput.value);

        const newLi = document.createElement('li');
        newLi.classList.add('todo');
        const text = document.createTextNode(itemInput.value);
        // todos.style.backgroundColor='red';
        const circle = document.createElement('div');
        circle.classList.add('check-circle');

        newLi.appendChild(circle);
        newLi.appendChild(text);
        todos.appendChild(newLi);

        itemInput.value='';
    }
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

function addTodoStorage(item){

    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    localStorage.setItem('todos', JSON.stringify(itemsFromStorage));
}


newTodo.addEventListener('keypress', addTodoDOM);