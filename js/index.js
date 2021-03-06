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
    }

    Note.prototype.createNote = function() {
        var new_item = document.createElement('li'),
            button_del = document.createElement('button'),
            button_edit = document.createElement('button');

        button_edit.innerText = '✎';
        button_edit.className = 'edit';

        button_del.innerText = '✖';
        button_del.className = 'del';

        new_item.innerHTML = '<span class="text">' + this.text + '</span>&nbsp;';
        new_item.className = 'item';
        new_item.appendChild(button_edit);
        new_item.appendChild(button_del);
        new_item.setAttribute('data-id', this.id);

        return new_item;
    };

    function App() {
        this.input = document.getElementById('input');
        this.list = document.getElementById('list');
        this.form = document.getElementById('form');
        this.storage = new Storage();
        this.counter = Object.keys(this.storage.returnNotes()).length || 0;

        this.saveNote = function() {
            this.form.onsubmit = function(e) {
                e.preventDefault();

                if (this.input.value) {
                    var new_storage = this.storage.returnNotes();

                    new_storage[this.counter] = {text: this.input.value};
                    new Note(this.input.value, this.counter);
                    this.input.value = '';
                    this.storage.saveNotes(new_storage);
                    this.counter++;
                    this.renderNotes(new_storage);
                }
            }.bind(this);
        };

        this.deleteButton = function() {
            document.addEventListener('click', function(event) {
                var target = event.target;

                if (target.className === 'del' && confirm('Do you want to remove the note?')) {
                    var notes = this.storage.returnNotes();

                    notes.splice(target.parentNode.getAttribute('data-id'), 1);
                    this.counter = notes.length;
                    this.list.removeChild(target.parentNode);
                    this.storage.saveNotes(notes);
                    this.renderNotes(notes);
                }
            }.bind(this));
        };

        this.editButton = function() {
            document.addEventListener('click', function(event) {
                var target = event.target;

                if (target.className === 'edit') {
                    var current_text = target.parentNode.childNodes[0].innerText,
                        new_text = prompt('Enter a new value:', current_text),
                        new_storage = this.storage.returnNotes();

                    if (!new_text) return false;

                    target.parentNode.childNodes[0].innerHTML = new_text;
                    new_storage[target.parentNode.getAttribute('data-id')] = {text: new_text};

                    this.storage.saveNotes(new_storage);
                    this.renderNotes(new_storage);
                }
            }.bind(this));
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
        this.saveNote();
        this.editButton();
        this.deleteButton();
    }

    var app = new App();
}());