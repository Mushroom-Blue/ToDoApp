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
}