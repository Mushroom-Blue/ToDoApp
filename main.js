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
    } else if (selectedList == undefined) {
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
            <div id="${list.listID}" class="eachList" style="display:flex">
                <div class="listNameDiv" onclick="selectList(${list.listID})">
                    <div class="listName">${list.listName}</div>
                </div>
                <div class="trashCanList" onclick="deleteList(event)">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        `
    });
    document.getElementById("listOfLists").innerHTML = listHTML;
}

function deleteList(event) {
    event.preventDefault();
    let node = event.target;
    let listNode = node.parentNode.parentNode;
    allLists.forEach(list => {
        if (listNode.id == list.listID){
            let listIndex = allLists.indexOf(list);
            allLists.splice(listIndex, 1)
        }
    })
    selectedList = undefined;
    localStorageSave();
    render();
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
                            <div class="trashCan" onclick="deleteTask(event)">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    `
                } else {
                    taskHTML += `
                        <div id="${task.taskID}" class="eachList">
                            <div class="completeCircle" onclick="toggleComplete(event)"></div>
                            <div class="listName">${task.taskName}</div>
                            <div class="trashCan" onclick="deleteTask(event)">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    `
                }
            })
        }
    });
    document.getElementById("listOfTasks").innerHTML = taskHTML;
}

function deleteTask(event) {
    let node = event.target;
    let taskNode = node.parentNode.parentNode;
    allLists.forEach(list => {
        if(selectedList.id == list.listID){
            list.taskList.forEach(task => {
                if (task.taskID == taskNode.id) {
                    let taskIndex = list.taskList.indexOf(task);
                    list.taskList.splice(taskIndex, 1);
                }
            })
            localStorageSave();
            taskRender(list.listID);
        }
    })
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