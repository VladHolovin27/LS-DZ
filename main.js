document.addEventListener('DOMContentLoaded', loadTasks);
        function addTask() {
            const newTaskInput = document.getElementById('newTask');
            const taskText = newTaskInput.value;

            if (taskText !== '') {
                const taskList = document.getElementById('taskList');
                const taskItem = document.createElement('li');
                taskItem.innerHTML = `<input type="checkbox" onchange="toggleTask(this)"> ${taskText}`;
                taskList.appendChild(taskItem);

                saveTasks();
                newTaskInput.value = '';
            }
        }

        const tasks = [];

        const taskItems = document.getElementById('taskList').children;
        
        taskItems.forEach(taskItem => {
            const task = {
                text: taskItem.innerText,
                completed: taskItem.classList.contains('completed')
            };
        
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        


        function loadTasks() {
            const taskList = document.getElementById('taskList');
            const storedTasks = localStorage.getItem('tasks');

            if (storedTasks) {
                const tasks = JSON.parse(storedTasks);

                tasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.innerHTML = `<input type="checkbox" onchange="toggleTask(this)"> ${task.text}`;
                    if (task.completed) {
                        taskItem.classList.add('completed');
                    }
                    taskList.appendChild(taskItem);
                });
            }
        }

// 2

// const emailInp = document.querySelector(".email");
// const passwordInp = document.querySelector(".password");
// const btn = document.querySelector(".btn");
// const div = document.querySelector(".box")

// function getItemToLS() {
//     const setEmailInp = emailInp.value;
//     localStorage.setItem(`infoEmail`, setEmailInp);

//     const setPasswordInp = passwordInp.value;
//     localStorage.setItem(`infoPassword`, setPasswordInp);
// }

// btn.addEventListener("click", getItemToLS);


// document.addEventListener("DOMContentLoaded", () => {
//     div.innerHTML = '';
//     const getEmailInp = localStorage.getItem('infoEmail');
//     const getPasswordInp = localStorage.getItem('infoPassword');
//     div.insertAdjacentHTML("afterend", getEmailInp);
//     div.insertAdjacentHTML("afterend", getPasswordInp);
// });

// 3
// const formBtn = document.querySelector('.btnForm');

// document.addEventListener("DOMContentLoaded", () => {
//     const savedLogin = localStorage.getItem('login');
//     const savePassword = localStorage.getItem('password');

//     if (savedLogin && savePassword) {
//         document.getElementById('login').value = savedLogin;
//         document.getElementById('password').value = savedPassword;
//     }
// });

// function load() {
//     const loginInput = document.getElementById('login');
//     const passwordInput = document.getElementById('password');

//     const login = loginInput.value;
//     const password = passwordInput.value;

//     const savedLogin = localStorage.getItem('login');
//     const savedPassword = localStorage.getItem('password')

//     if(passwordInput === savedLogin && password === savedPassword) {
//         alert('Login SUCCESFUL!');
//     } else {
//         alert('Login is invalid!');

//         localStorage.setItem('login', login);
//         localStorage.setItem('password', password);
//     }
// };

// formBtn.addEventListener('click', load);

//4
const addBtn = document.querySelector('.add');
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        function renderBookmarks() {
            const bookmarksList = document.getElementById('bookmarks');
            bookmarksList.innerHTML = '';

            bookmarks.forEach((bookmark, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    ${bookmark}
                    <button onclick="editBookmark(${index})">Редагувати</button>
                    <button onclick="deleteBookmark(${index})">Видалити</button>
                `;
                bookmarksList.appendChild(listItem);
            });
        }

        addBtn.addEventListener('click', () => {
            const input = document.getElementById('bookmarkInput');
            const newBookmark = input.value.trim();

            if (newBookmark !== '') {
                bookmarks.push(newBookmark);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                input.value = '';
                renderBookmarks();
            }
        }) 
        

        function editBookmark(index) {
            const updatedBookmark = prompt('Введіть нове значення:', bookmarks[index]);

            if (updatedBookmark !== null) {
                bookmarks[index] = updatedBookmark.trim();
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                renderBookmarks();
            }
        }

        function deleteBookmark(index) {
            const confirmDelete = confirm(`Ви впевнені, що хочете видалити "${bookmarks[index]}"?`);

            if (confirmDelete) {
                bookmarks.splice(index, 1);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                renderBookmarks();
            }
        }

        renderBookmarks();

        // 5
        const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const numberInput = document.getElementById('number');
const contactInput = document.getElementById('contact');
const saveButton = document.querySelector('.btnForm');
const divS = document.getElementById('box');

saveButton.addEventListener('click', saveContact);
document.addEventListener('DOMContentLoaded', displayContacts);

function saveContact() {
    const newContact = {
        email: emailInput.value,
        password: passwordInput.value,
        number: numberInput.value,
        contact: contactInput.value
    };

    let contacts = getContacts();
    const existingContact = contacts.find(c => c.email === newContact.email);

    if (existingContact) {
        existingContact.password = newContact.password;
        existingContact.number = newContact.number;
        existingContact.contact = newContact.contact;
    } else {
        contacts.push(newContact);
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));

    clearInputs();

    displayContacts();
}

function getContacts() {
    return JSON.parse(localStorage.getItem('contacts')) || [];
}

function displayContacts() {
    const contacts = getContacts();
    divS.innerHTML = '';

    contacts.forEach(c => {
        divS.insertAdjacentHTML('beforeend', `
            <div>
                Email: ${c.email}, Password: ${c.password}, Number: ${c.number}, Contact: ${c.contact}
                <button onclick="editContact('${c.email}')">Edit</button>
                <button onclick="deleteContact('${c.email}')">Delete</button>
            </div>
        `);
    });
}

function editContact(email) {
    const contacts = getContacts();
    const editedContact = contacts.find(c => c.email === email);

    if (editedContact) {
        emailInput.value = editedContact.email;
        passwordInput.value = editedContact.password;
        numberInput.value = editedContact.number;
        contactInput.value = editedContact.contact;
    }
}

function deleteContact(email) {
    let contacts = getContacts();
    contacts = contacts.filter(c => c.email !== email);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}

function clearInputs() {
    emailInput.value = '';
    passwordInput.value = '';
    numberInput.value = '';
    contactInput.value = '';
}