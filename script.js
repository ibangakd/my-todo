//store todo items
//function to create new todo items and render on the page
let todoItems = [];
function renderTodo(todo) {
    // store todo items into browser storage
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    //get reference of required element
    const list = document.querySelector(".js-todo-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);
    // runs a checked for deleted items and update the DOM
    if (todo.delete) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = "";
        return;
    }
    // evaluate a DOM state of todo entry 
    const ischecked = todo.checked ? "done" : "";
    // create a list item that hold todo entry
    const listItemElement = document.createElement("li");
    // set class and data key attribute to the todo entry
    listItemElement.setAttribute("class", `todo-item ${ischecked}`);
    listItemElement.setAttribute("data-key", todo.id);
    // populate todo entry with require values 
    listItemElement.innerHTML = `<input id="${todo.id}" type="checkbox"/>
        <label for ="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
        &times;
        </button>
    `;
    // run condition to append the created items to the page
    if (item) {
        list.replaceChild(listItemElement, item);
    } else {
        list.append(listItemElement);
    }

}
// define function to create a new todo entry
function addTodo(text) {
    // define todo entry object structure     
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    // add new todo entry to the array collection        
    todoItems.push(todo);
    // trigger page update by invoking the render todo function        
    renderTodo(todo);
}
// get reference of the todo entry form element    
const form = document.querySelector(".js-form");
// bind an eventlistener on form submission 
form.addEventListener("submit", (event) => {
    // prevent default behaviour of form submission     
    event.preventDefault();
    // get reference of the input element     
    const input = document.querySelector(".js-todo-input");
    // remove white-space on both end of a todo entry string      
    const text = input.value.trim();
    // check for empty value and create todo item    
    if (text !== "") {
        // invoke 'add todo' function to commit change         
        addTodo(text);
        // reset the value of the input element         
        input.value = "";
        // set focus to the input element         
        input.focus();
    }
});
// define function to toggerdone state to todo entry 
function toggleDone(key) {
    // restrive the index of the todo entry in the collection     
    const index = todoItems.findIndex((item) => item.id === Number(key));
    // togger the check attribute value of the todo entry     
    todoItems[index].checked = !todoItems[index].checked;
    // trigger page update by invoking the render todo function     
    renderTodo(todoItems[index]);
}
// define function to delete a todo entry 
function deleteTodo(key) {

    // retrive the index of todo entry in the collection         
    const index = todoItems.findIndex((item) => item.id === Number(key));
    // set delete attribute to true for  a todo entry         
    const todo = {
        delete: true,
        ...todoItems[index],
    };
    todoItems = todoItems.filter((item) => item.id !== Number(key));
    // trigger page update by invoking render function         
    renderTodo(todo);
}
// get reference to ul element
const list = document.querySelector(".js-todo-list");
// bind click event listener to ul element     
list.addEventListener("click", (event) => {
    // traverSE the DOM  TO CHECK FOR THE CLASS NAME "js-tick" and invoke the toggerdone function if check return true       
    if (event.target.classList.contains("js-tick")) {
        // retrive the data key attribute value             
        const itemkey = event.target.parentElement.dataset.key;
        // invoke toggerdone function to update todo entry state             
        toggleDone(itemkey);
    }
    // traverse the DOM to check for a class name js-delete-todo and invoke the delete function if check return true
    if (event.target.classList.contains("js-delete-todo")) {
        // retrive data              
        const itemkey = event.target.parentElement.dataset.key;
        // invoke delete todo function to delete  a todo entry          
        deleteTodo(itemkey);
    }

    if (event.target.classList.contains("js-delete-todo")) {
        const itemkey = event.target.parentElement.dataset.key;
        deleteTodo(itemkey);
    }
});
// bind eventlistener of DOMcontain loaded to document object
document.addEventListener("DOMContentLoaded", () => {
    // get stored todo entry from broswer local storage        
    const ref = localStorage.getItem("todoItems");
    // check that we have entry in the local storage        
    if (ref) {
        // convert todo entry to an array collection            
        todoItems = JSON.parse(ref);
        // iterate through the colection and update the web page            
        todoItems.forEach((t) => {
            renderTodo(t);
        });
    }
});




