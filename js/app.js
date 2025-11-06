const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Mostrar notas al cargar
window.onload = () => renderNotes();

// Agregar nota
addNoteBtn.addEventListener("click", () => {
  const text = noteText.value.trim();
  if (text === "") return alert("Escribe una nota antes de agregarla.");
  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  saveNotes();
  renderNotes();
  noteText.value = "";
});

// Guardar en localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Renderizar notas
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteContent = document.createElement("p");
    noteContent.textContent = note.text;
    noteDiv.appendChild(noteContent);

    // Botón Editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editNote(note.id);
    noteDiv.appendChild(editBtn);

    // Botón Eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.onclick = () => deleteNote(note.id);
    noteDiv.appendChild(deleteBtn);

    notesContainer.appendChild(noteDiv);
  });
}

// Editar nota
function editNote(id) {
  const note = notes.find(n => n.id === id);
  const newText = prompt("Edita tu nota:", note.text);
  if (newText !== null) {
    note.text = newText.trim();
    saveNotes();
    renderNotes();
  }
}

// Eliminar nota
function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  renderNotes();
}
