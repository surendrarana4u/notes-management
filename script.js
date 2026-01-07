let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = -1;

const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const message = document.getElementById("message");

function renderNotes() {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <p class="note-text">${note}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editNote(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;

    notesContainer.appendChild(card);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

addBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();

  if (!text) return showMessage("⚠️ Note cannot be empty", true);

  if (editIndex === -1) {
    notes.push(text);
    showMessage("✔ Note added");
  } else {
    notes[editIndex] = text;
    editIndex = -1;
    addBtn.textContent = "Add Note";
    showMessage("✏️ Note updated");
  }

  noteInput.value = "";
  renderNotes();
});

function editNote(index) {
  noteInput.value = notes[index];
  addBtn.textContent = "Update Note";
  editIndex = index;
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
  showMessage("🗑 Note deleted");
}

function showMessage(text, error = false) {
  message.textContent = text;
  message.style.color = error ? "#dc2626" : "#16a34a";
  setTimeout(() => (message.textContent = ""), 1500);
}

renderNotes();