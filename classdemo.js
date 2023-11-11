const app = {
    data: {
        url: "http://localhost:3000/notes",
        notes: [],
        form: /*with variable so it will work for create and edit form */
    },

    /* methods */
    getNotes: function() {
        fetch(this.data.url, {
           method: 'GET' ,
           headers: {"Content-Type": "application/json"}
        }).then(r => r.json())
            .then(response => {
             for (let note of response) {
                this.data.notes.push(note)
             };
             this.generateNotesHTML()
            }
             )
            },

            createNote: function() {
                /* POST request to save note */
            }.

            displayCreateForm: function() {
                /* displays form */
            },

            deleteNote: function(noteORnoteId) {
                /* call confirmDelete(), delete request on submit OR let confirmDelete call deleteNote */

            },

            confirmDelete: function() {
                /* display confirmation popup, call deleteNote(noteId) */
            },

            editNote: function(id) {
                /* call displayEditForm(), saves/overwrites note (request) */
            },

            displayEditForm: function(note) { 
                let form = document.getElementById('editForm');
                form.classList.remove('hidden')
            /*displays edit form with note's existing title and body prepopulated */
            },


            generateNotesHTML: function() {
                const container = document.getElementById('container');
                for (let note of this.data.notes) {
                container.innerHTML += `
                    <div data-id=${note.id}>
                        <div>${note.title}</div>
                        <div>${note.body}</div>
                        /* button for edit and button for delete */
                        <button data-id=${note.id}>EDIT</button>
                    </div>
                `}
            },

            main: function() {
                /*call getNotes() (a fetch request), set up event listerners (will contain if statements, or other code to call when a user clicks edit, delete, or create) for edit and delete buttons */
            /* if event.target.data-id = something, then call on something, use event.preventDefault() as the first line */
            /* EVENT LISTENER:
            editNote(event.target.data-id)
            console.log(event.target)
            console.log(event.target.data-id)
            EVENT LISTENER that calls for displayEditForm which remvoes hiden adn displays the form */
            }
}

app.main()