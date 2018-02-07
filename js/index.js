'use strict';

(function() {
    function Storage() {
        this.saveNotes = function(data) {
            try {
                localStorage.setItem('data', JSON.stringify(data));
            }
            catch (err) {
                document.write('An error has occurred. Please try again later.');
            }
        };

        this.returnNotes = function() {
            try {
                if (JSON.parse(localStorage.getItem('data'))) {
                    return JSON.parse(localStorage.getItem('data'));
                }
                return [];
            }
            catch (err) {
                document.write('An error has occurred. Please try again later.');
            }
        };
    }

    function Note(text, id) {
        this.text = text;
        this.id = id;

        this.createNote = function() {
            var new_item = document.createElement('li');
            var button_del = document.createElement('button');

            button_del.innerText = '×';
            button_del.setAttribute('class', 'del');

            new_item.innerHTML = '<span class="text">' + this.text + '</span> ';
            new_item.appendChild(button_del);
            new_item.setAttribute('data-id', this.id);

            return new_item;
        };
    }

    function App() {
        this.button = document.getElementById('button');
        this.input = document.getElementById('input');
        this.list = document.getElementById('list');
        this.storage = new Storage();
        this.counter = Object.keys(this.storage.returnNotes()).length || 0;

        this.saveButton = function() {
            this.button.onclick = function() {
                if (this.input.value !== '') {
                    var new_storage = this.storage.returnNotes();

                    new_storage[this.counter] = {text: this.input.value};
                    new Note(this.input.value, this.counter);
                    this.input.value = '';
                    this.storage.saveNotes(new_storage);
                    this.counter++;
                    this.renderNotes(this.storage.returnNotes());
                }
            }.bind(this);
        };

        this.deleteButton = function() {
            document.onclick = function(event) {
                var target = event.target;

                if (target.className === 'del' && confirm('Do you want to remove the note?')) {
                    var notes = this.storage.returnNotes();

                    this.list.removeChild(target.parentNode);
                    notes.splice(target.parentNode.getAttribute('data-id'), 1);
                    this.storage.saveNotes(notes);
                    this.renderNotes(notes);
                }
            }.bind(this);
        };

        this.renderNotes = function(data) {
            var list = document.getElementById('list');

            list.innerText = '';
            for (var i in data) {
                var item_list = new Note(data[i]['text'], i);
                list.appendChild(item_list.createNote());
            }
        };

        this.renderNotes(this.storage.returnNotes());
        this.saveButton();
        this.deleteButton();
    }

    var app = new App();
}());