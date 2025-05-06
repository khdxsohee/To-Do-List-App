document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('li');
        taskItems.forEach(item => {
            const taskText = item.querySelector('span').textContent;
            const completed = item.classList.contains('completed');
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a task element
    function createTaskElement(taskText, completed = false) {
        const li = document.createElement('li');
        if (completed) {
            li.classList.add('completed');
        }

        // Create task text element
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete');
        li.appendChild(deleteButton);

        // Add event listener for task completion
        taskSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks(); // Save tasks after marking as completed
        });

        // Add event listener for delete button
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks(); // Save tasks after deleting
        });

        // Append the new task to the list
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement(taskText);
            saveTasks(); // Save tasks after adding
            taskInput.value = ''; // Clear input field
        }
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', addTask);

    // Allow adding task with "Enter" key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from localStorage when the page loads
    loadTasks();
});
