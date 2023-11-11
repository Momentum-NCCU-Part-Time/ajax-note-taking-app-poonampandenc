const app = {
    data: {
        url: "http://localhost:3000/notes/",
        notes: [],
        
        },

    /* methods */
    getNotes: function() {
        fetch(this.data.url, {
           method: 'GET',
           headers: {"Content-Type": "application/json"}
        })
        .then(r => r.json())
            .then(response => {
             for (let note of response) {
                this.data.notes.push(note)
             };
             console.log(this.data.notes)
             this.generateNotesHTML()
            }
             )
            },

            generateNotesHTML: function() {
                const container = document.getElementById('container');
                container.innerHTML = [];
                for (let note of this.data.notes) {
                container.innerHTML += `
                    <div class="noteCard">
                        <div>${note.title}</div>
                        <div>${note.body}</div>
                        <button class="deleteButton" data-id=${note.id}>DELETE</button>
                        <button class="editButton" data-id=${note.id}>EDIT</button>
                    </div>
                `}
                this.addEventListeners();
            },
             

            createNote: function() {
                let newTitle = document.getElementsById("newTitle").value;
                let newBody = document.getElementById("newBody").value;
                let newNote = {
                    title: newTitle,
                    body: newBody
                }
                
                fetch(this.data.url, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newNote),
                })
        .then(r => r.json())
            .then(response => {
                this.data.notes = [];
             this.getNotes();
             })
                },
               
            displayNewNote: function() {
                /* displays form */
                let form = document.getElementById('newNote');
                form.classList.remove('hidden')
            },
                        
            deleteNote: function(noteId) {
                fetch(this.data.url + noteId, {
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json"}
                 })
                 .then(r => r.json())
                 .then(response => {
                    this.data.notes = [];
                    /* delete object from this.data.notes using noteId if data matches noteId then delete that noteId*/
                this.getNotes();
                 })
            },

            confirmDelete: function() {
                /* display confirmation popup, call deleteNote(noteId) */
            },

            editNote: function(noteId) {
                let editedTitle = document.getElementById("editTitle").value;
                let editedBody = document.getElementById("editBody").value;
                let editedNote = {
                    title: editedTitle,
                    body: editedBody,
                }
                /* call displayEditForm(), saves/overwrites note (request) */
                fetch(this.data.url + noteId, {
                    method: 'PATCH',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(editedNote),
                 })
                 .then(r => r.json())
                 .then(response => {
                    this.data.notes = []
                    this.getNotes()
                 })
            },

            displayEditForm: function(noteId) { 
                let note = this.data.notes.find(note => note.id==noteId);
                if (!note) {
                    console.error("Note not found");
                    return
                }
                document.getElementById("editTitle").value = note.title;
                document.getElementById("editBody").value = note.body;
                let editedNote = document.getElementById("editedNote");
                editedNote.dataset.id=noteId
                            
                let form = document.getElementById('editForm');
                form.classList.remove('hidden')
            /*displays edit form with note's existing title and body prepopulated */
            },
          
             
            addEventListeners: function() {
                let newButtons = document.querySelectorAll(".newButton");
                for (let button of newButtons) {
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        this.newNote(button.dataset.id);
                    })
                }

                let deleteButtons = document.querySelectorAll(".deleteButton");
                for (let button of deleteButtons) {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.deleteNote(button.dataset.id);
                });
            }
            let saveButton = document.querySelectorAll(".saveNote");
            for (let button of saveButton) {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                this.createNote(button.dataset.id);
            });
        }   
        let editButtons = document.querySelectorAll(".editButton");
                for (let button of editButtons) {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.displayEditForm(button.dataset.id);
                });
            }   
            
                let editNote = document.getElementById('editedNote');
                editNote.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.editNote(editNote.dataset.id);
                });
        },

            /*call getNotes() (a fetch request), set up event listerners (will contain if statements, or other code to call when a user clicks edit, delete, or create) for edit and delete buttons */
            /* if event.target.data-id = something, then call on something, use event.preventDefault() as the first line */
            /* EVENT LISTENER:
            editNote(event.target.data-id)
            console.log(event.target)
            console.log(event.target.data-id)
            EVENT LISTENER that calls for displayEditForm which remvoes hiden adn displays the form */
     
    main: function() {
        this.getNotes();
        
        }
}

app.main()