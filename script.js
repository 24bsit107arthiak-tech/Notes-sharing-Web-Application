let notes = JSON.parse(localStorage.getItem("notes")) || [];

function addNote() {
    let title = document.getElementById("title").value;
    let link = document.getElementById("link").value;

    if (!link.startsWith("http")) {
        link = "https://" + link;
    }

    if (title === "" || link === "") {
        alert("Please fill all fields");
        return;
    }

    notes.push({ title, link });
    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();

    // Clear inputs
    document.getElementById("title").value = "";
    document.getElementById("link").value = "";
}

function displayNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    if (notes.length === 0) {
        list.innerHTML = "<p>No notes added yet</p>";
        return;
    }

    notes.forEach((note, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <b>${note.title}</b><br>
            <a href="${note.link}" target="_blank">Open Link</a><br>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function editNote(index) {
    let newTitle = prompt("Edit title:", notes[index].title);
    let newLink = prompt("Edit link:", notes[index].link);

    if (newTitle && newLink) {
        notes[index] = { title: newTitle, link: newLink };
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}

function searchNotes() {
    let search = document.getElementById("search").value.toLowerCase();
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    let filtered = notes.filter(note =>
        note.title.toLowerCase().includes(search)
    );

    filtered.forEach((note, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <b>${note.title}</b><br>
            <a href="${note.link}" target="_blank">Open Link</a>
        `;

        list.appendChild(li);
    });
}

function clearAll() {
    if (confirm("Are you sure you want to delete all notes?")) {
        notes = [];
        localStorage.removeItem("notes");
        displayNotes();
    }
}

// Load notes on start
displayNotes();
