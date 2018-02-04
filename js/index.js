'use strict';

(function() {
    function Storage() {
        this.saveNotes = function(data) {
            localStorage.setItem('data', data);
        }.bind(this);
    }

    function Note(text, id) {
        this.text = text;
        this.id = id;
        this.list = document.getElementById('list');

        this.createNote = function() {
            var new_note = document.createElement('li');
            var button_del = document.createElement('button');

            button_del.innerText = 'del';
            button_del.setAttribute('class', 'del');

            new_note.innerText = this.text + ' ';
            new_note.appendChild(button_del);
            new_note.setAttribute('data-id', this.id);

            this.list.appendChild(new_note);
        };

        this.deleteNote = function() {
            document.onclick = function(event) {
                var target = event.target;

                if (target.className === 'del') {
                    this.list.removeChild(target.parentNode);
                }
            }.bind(this);
        }.bind(this);

        this.createNote();
        this.deleteNote();
    }

    function App() {
        this.button = document.getElementById('button');
        this.input = document.getElementById('input');
        this.countar = 0;
        this.notes = [];
        this.storage = new Storage();

        this.saveNote = function() {
            this.button.onclick = function() {
                if (this.input.value !== '') {
                    var note = new Note(this.input.value, this.notes);
                    this.input.value = '';
                    this.countar++;
                    this.notes.push(note);
                    this.storage.saveNotes(this.notes);
                }
            }.bind(this);
        }.bind(this);

        this.saveNote();
    }

    var app = new App();
}());
