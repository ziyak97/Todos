// I made seperate functions for adding and filtering to the todo list. 
// I could have just put the code in the addEventListener but seperating it makes it more reusable.

const addTodo = document.querySelector('.add'); // The add form
const todos = document.querySelector('.todos'); // The ul
const search = document.querySelector('.search input'); // The innput in the search form

// Used to make a new list and add custom text to it using template literals.
// I add the list inside the ul using the innerHTML property 
const template = todo => {
    todos.innerHTML += `
    <li class="list-group-item">
    <span>${todo}</span>
    <i class="delete fas fa-trash"></i>
    </li>
    `
};

// Function for local storage
const localTodos = localTodos => {
    todos.innerHTML = localTodos;
};

// executes if local storage is present (string is a truthy value so if there is a string it executes)
if (localStorage.length) {
    localTodos(localStorage.getItem('todos')); // get local storage on page reload
}

// Used to add todos when I press Enter(could also just make a button but no button looks neater)
addTodo.addEventListener('submit', e => {
    e.preventDefault(); // prevent reloading of page when i submit form
    const todo = addTodo.add.value.trim(); // value inside the input of the form. trim() removes accidental white spaces
    if (!todo.length) return; // prevents addition of blank todos
    template(todo); // just calling the above function to add todos
    addTodo.reset(); // reset the form to remove text in input after adding todo
    localStorage.setItem('todos', todos.innerHTML); // set local storage when form is submited
});

// Delete todo
// I gave the trash icon a class of delete
// I check if you click on the trah icon by using classList & contains
// Todos is the ul. It checks for class in the ul
todos.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove(); // Remove the list which is the parent element of the icon
        localStorage.setItem('todos', todos.innerHTML); // set local storage on deletion of item
    }
});

// Used to remove items that are not a search match
const filtered = (term) => {
    const todoItems = Array.from(todos.children); // I wanna use array methods but it's an htmlList so I covert it
    todoItems
        .filter(todoItem => !todoItem.textContent.toLocaleLowerCase().includes(term)) // If the text in the list does not
        .forEach(todoItem => {                                                        // match with what is put in the 
            todoItem.classList.add('remove');                                         // search input I give it a remove
        });                                                                           // class.
    todoItems
        .filter(todoItem => todoItem.textContent.includes(term))                      // When I backspace I make the list
        .forEach(todoItem => {                                                        // re-appear if it has matching 
            todoItem.classList.remove('remove');                                      // text by removing remove class.
        });
};

// Take the value in the search input and filter it
search.addEventListener('keyup', () => {
    const term = search.value.toLocaleLowerCase();
    filtered(term);
});
