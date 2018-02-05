'use strict';

(function() {
    function Storage() {
        this.saveNotes = function(data) {
            localStorage.setItem('data', JSON.stringify(data));
        }.bind(this);

        this.returnNotes = function() {
            return JSON.parse(localStorage.getItem('data'));
        };
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
        this.storage = new Storage();
        this.counter = Object.keys(this.storage.returnNotes()).length;

        this.clickButton = function() {
            this.button.onclick = function() {
                if (this.input.value !== '') {
                    new Note(this.input.value, this.counter);
                    var new_storage = this.storage.returnNotes();

                    new_storage[this.counter] = {text: this.input.value};
                    this.input.value = '';
                    this.storage.saveNotes(new_storage);
                    this.counter++;
                }
            }.bind(this);
        }.bind(this);

        this.renderNotes = function() {
            var saved_notes = this.storage.returnNotes();

            for (var i in saved_notes) {
                new Note(saved_notes[i]['text'], i);
            }
        }.bind(this);

        this.renderNotes();
        this.clickButton();
    }

    var app = new App();
}());