{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        })
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            })
        })
    }

    const render = () => {
        let htmlString = ""
        for (const task of tasks) {
            htmlString += `
            <li class="task">
            <button class="task__button task__button--done js-done">
            ${task.done ? "✔" : ""}
            </button>
            <span class="list__item">
            ${task.content}
            </span>
            <button class="task__button task__button--remove js-remove">&#128465;</button> 
            </li>
            `
        }
        document.querySelector(".js-tasks").innerHTML = htmlString
        bindEvents();
    }

    const onForSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }
        newTaskElement.focus();
        newTaskElement.value = "";
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onForSubmit);
    };

    init();
}