let allLists = [];

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
            "taskList" : {},
        })
        console.log(allLists)
    }
    localStorageSave();
    render();
}

function render() {
    let listHTML = "";
    allLists.forEach(list => {
        listHTML += `
            <div class="eachList">
                <div class="listName">${list.listName}</div>
            </div>
        `
    });
    document.getElementById("listOfLists").innerHTML = listHTML;
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