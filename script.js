const addBox = document.querySelector('.add-box');
const popUpBox = document.querySelector('.pop-up-container');
const cancel = document.querySelector('.cancel');
const wrapper = document.querySelector('.wrapper');
const addNoteBtn = document.querySelector('.btn button');
const heading = document.querySelector('.heading');
const inputTag = document.querySelector('.input-box input');
const textareaTag = document.querySelector('.textarea-box textarea');
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let notes = JSON.parse(localStorage.getItem('notes') || "[]");
let isUpdate = false, updateId;


// deleting selected note
const deleteNote= (notIid) => {
    notes.splice(notIid,1);
    localStorage.setItem('notes', JSON.stringify(notes));
    getAllNotes();
}


// updating selected note
const updateNote= (noteId, title, description) => {
    addBox.click();
    isUpdate = true;
    updateId = noteId;
    addNoteBtn.textContent = 'Update Note';
    heading.textContent = 'Update a Note';
    inputTag.value = title;
    textareaTag.value = description;
}


// getting all notes
const getAllNotes = () => {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note,index) => {
        let liTag = `
        <li class="note">
        <div>
        <p>${note.title}</p>
        <span>${note.description}</span>
        </div>
        <div class="bottom-content">
        <span>${note.date}</span>
        <div class="settings">
        <span onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen-to-square"></i></span>
        <span onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i></span>
        </div>
        </div>
        </li>
        `;
        addBox.insertAdjacentHTML('afterend', liTag);
    });

}
getAllNotes();


addBox.addEventListener('click', () => {
    inputTag.focus();
    addNoteBtn.textContent = 'Add Note';
    heading.textContent = 'Add a New Note';
    popUpBox.classList.add('show');
})

cancel.addEventListener('click', () => {
    popUpBox.classList.remove('show');
    inputTag.value = '';
    textareaTag.value = '';
})


addNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const noteTitle = inputTag.value;
    const noteDescription = textareaTag.value;

    if (noteTitle || noteDescription) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let note = {
            title: noteTitle,
            description: noteDescription,
            date: `${monthArr[month]} ${day}, ${year}`
        }
        if (!isUpdate) {
            notes.push(note);
        }
        else{
            notes[updateId] = note;
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        cancel.click();
        getAllNotes();
    }

})