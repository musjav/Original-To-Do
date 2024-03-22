// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { ref, set, getDatabase, push, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALYh8oETFHfTVpPuz15-R4ZsTECnd4bqE",
    authDomain: "neww-171f7.firebaseapp.com",
    databaseURL: "https://neww-171f7-default-rtdb.firebaseio.com",
    projectId: "neww-171f7",
    storageBucket: "neww-171f7.appspot.com",
    messagingSenderId: "798500223842",
    appId: "1:798500223842:web:5b402335d1e6c4010b4a3b",
    measurementId: "G-PJX7MQMJJY"
};

// Initialize Firebase
// // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase();

window.add = function (e) {
    var inp = document.getElementById('inp');
    var showList = document.getElementById('showList');
    var showdatabase = document.getElementById('showdatabase');
    if (inp.value !== '') {
        let listItem = document.createElement('li');
        listItem.textContent = inp.value;
        var editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            editTodo(this);
        };
        listItem.appendChild(editButton); // Append the edit button to the list item
        showList.appendChild(listItem); // Append the new task with the edit button to the list
        // 
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "delete";
        deleteButton.onclick = function () {

            // deleteTodo(this);
            listItem.remove();
        };
        listItem.appendChild(deleteButton); // Append the edit button to the list item
        showList.appendChild(listItem); // Append the new task with the edit button to the list
        // 
        var deletefromfirebaseButton = document.createElement('button');
        deletefromfirebaseButton.textContent = "Delete From EveryWhere";
        deletefromfirebaseButton.onclick = function () {
            listItem.remove();
            showdatabase.innerHTML = '';
            const reference = ref(database, `Tasks/${obj.id}`);
            set(reference, null)
                .then(() => {
                    alert("Data removed successfully from the Database And Webpage.");
                })
                .catch((error) => {
                    alert("Error removing data:", error);
                });
            // deleteTodo(this);
            // listItem.remove();
        };
        listItem.appendChild(deletefromfirebaseButton); // Append the edit button to the list item
        // showList.appendChild(listItem); // Append the new task with the edit button to the list
        // 
        var obj = { Originalvalue: inp.value };
        obj.id = push(ref(database, "Tasks/")).key;
        var reference = ref(database, `Tasks/${obj.id}`);
        set(reference, obj);
        inp.value = ''; // Clear input after adding task
        showdatabase.innerHTML = '';
    } else {
        alert("Enter some task");
    }
}
function editTodo(button) {
    var listItem = button.parentNode;
    var newValue = prompt("Enter the new value:");
    if (newValue !== null && newValue.trim() !== '') {
        listItem.firstChild.nodeValue = newValue; // Update the task value
        // Update the value in the database if needed
    }
    var edited = { EditedlValue: newValue };

    edited.id = push(ref(database, "Edited/")).key;
    var reference = ref(database, `Edited/${edited.id}`);
    set(reference, edited);

}
window.deleteAll = function () {
    var showList = document.getElementById('showList');
    showList.innerHTML = ''; // Clear the list in the UI
    var showdatabase = document.getElementById('showdatabase');
    showdatabase.innerHTML = "";

    // Remove all data from the 'Tasks' node in the Firebase database
    const tasksRef = ref(database, 'Tasks');
    set(tasksRef, null, function (error) {
        if (error) {
            console.error('Error deleting data:', error);
        } else {
            console.log('Data deleted successfully from "Tasks" node.');
        }
    });

    // You can also remove data from other nodes if needed
    // For example, if you want to remove data from the 'Edited' node:
    // const editedRef = ref(database, 'Edited');
    // set(editedRef, null, function(error) {
    //     if (error) {
    //         console.error('Error deleting data:', error);
    //     } else {
    //         console.log('Data deleted successfully from "Edited" node.');
    //     }
    // });
}
window.deleteTod = function o() {
    const listItem = document.querySelector('li');
    listItem.textContent = Originalvalue;
    listItem.remove();
}
// Function to fetch and display data from Firebase
window.displayData = function () {
    const showdatabase = document.getElementById('showdatabase');
    showdatabase.innerHTML = ''; // Clear previous data

    const tasksRef = ref(database, 'Tasks');
    onValue(tasksRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const listFirebaseItem = document.createElement('li');
            listFirebaseItem.textContent = data.Originalvalue;

            // Append list item to the UI
            showdatabase.appendChild(listFirebaseItem);
        });
    });
    // const tasksRef = ref(database, 'Tasks');
    // onValue(tasksRef, (snapshot) => {
    //     // showList.innerHTML = ''; // Clear previous data
    //     snapshot.forEach((childSnapshot) => {
    //         const data = childSnapshot.val();
    //         const listFirebaseItem = document.createElement('li');
    //         listFirebaseItem.textContent = data.Originalvalue;

    // Edit button
    // const editButton = document.createElement('button');
    // editButton.textContent = "Edit";
    // editButton.onclick = function () {
    // editTodo(childSnapshot.key, data.Originalvalue);
    // };
    // listItem.appendChild(editButton);

    // Delete button
    // const deleteButton = document.createElement('button');
    // deleteButton.textContent = "Delete";
    // deleteButton.onclick = function () {
    // deleteTodo();
    // };
    // listItem.appendChild(deleteButton);
    // var showdatabase=document.getElementById('showdatabase');
    //             showdatabase.appendChild(listFirebaseItem); // Append list item to the UI
    // });
    // });
}

// Call displayData function when the page loads
// displayData();