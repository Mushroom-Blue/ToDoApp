let allLists = [];
let selectedList;

function randomID() {
    return (Math.random() + Math.random()) * 1000;
}

function createList() {
    let id = randomID();
    let listName = document.getElementById("listCreation").value;
    if (listName == '') {
        return;
    } else {
        allLists.push({
            "listID" : id,
            "listName" : listName,
            "taskList" : [],
        })
        console.log(allLists)
    }
    document.getElementById("listCreation").value = "";
    localStorageSave();
    render();
}

function createTask() {
    let id = randomID();
    let taskName = document.getElementById("taskCreation").value;
    if (taskName == '') {
        return;
    } else if (selectedList == null) {
        return
    } else {
        allLists.forEach(list => {
            if (list.listID == selectedList.id) {
                list.taskList.push({
                    "taskID" : id,
                    "taskName" : taskName,
                    "isComplete" : false,
                })
                taskRender(list.listID);
            }
        })
    }
    localStorageSave();
    document.getElementById("taskCreation").value = "";
}

function render() {
    let listHTML = "";
    allLists.forEach(list => {
        listHTML += `
            <div id="${list.listID}" class="eachList" onclick="selectList(${list.listID})">
                <div class="listName">${list.listName}</div>
            </div>
        `
    });
    document.getElementById("listOfLists").innerHTML = listHTML;
}

function taskRender(id) {
    let taskHTML = "";
    allLists.forEach(list => {
        if (list.listID == id) {
            list.taskList.forEach(task => {
                if (task.isComplete == true) {
                    taskHTML += `
                        <div id="${task.taskID}" class="eachList completeTask">
                            <div class="completeCircleFilled" onclick="toggleComplete(event)"></div>
                            <div class="listName">${task.taskName}</div>
                        </div>
                    `
                } else {
                    taskHTML += `
                        <div id="${task.taskID}" class="eachList">
                            <div class="completeCircle" onclick="toggleComplete(event)"></div>
                            <div class="listName">${task.taskName}</div>
                        </div>
                    `
                }
            })
        }
    });
    document.getElementById("listOfTasks").innerHTML = taskHTML;
}

function toggleComplete(event) {
    let node = event.target;
    let taskNode = node.parentNode;
    allLists.forEach(list => {
        list.taskList.forEach(task => {
            if (task.taskID == taskNode.id){
                task.isComplete = !task.isComplete;
            }
        })
        taskRender(list.listID)
    })
}

function selectList(id) {
    allLists.forEach(list => {
        if (list.listID === id) {
            selectedList = document.getElementById(id);
            [...document.getElementsByClassName("activeList")].forEach(element => {
                element.classList.remove("activeList");
            })
            selectedList.classList.add("activeList");
        }
    })
    taskRender(id)
}

function localStorageSave() {
    localStorage.setItem("listsArray", JSON.stringify(allLists));
}

function localStorageBringBack() {
    let todoData = JSON.parse(localStorage.getItem("listsArray"));
    if (todoData !== null) {
        allLists = todoData;
    }
    render();
}

localStorageBringBack();