const API_BASE = "http://127.0.0.1:5000";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchNotes();
});

async function fetchNotes() {
    const search = document.getElementById("search").value;
    const res = await fetch(`${API_BASE}/notes?search=${search}`);
    const notes = await res.json();

    const notesList = document.getElementById("notes");
    notesList.innerHTML = "";
    notes.forEach(note => {
        const li = document.createElement("li");
        li.innerHTML = `<b>${note.title}</b> (${note.subject}) - Downloads: ${note.downloads} - Upvotes: ${note.upvotes}
                        <button onclick="downloadNote(${note.id})">Download</button>
                        <button onclick="upvoteNote(${note.id})">Upvote</button>`;
        notesList.appendChild(li);
    });
}

async function downloadNote(id) {
    window.location.href = `${API_BASE}/download/${id}`;
}

async function upvoteNote(id) {
    const res = await fetch(`${API_BASE}/upvote/${id}`, {
        method: "POST"
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchNotes();
}

fetchNotes();
