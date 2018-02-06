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
                return JSON.parse(localStorage.getItem('data'));
            }
            catch (err) {
                document.write('An error has occurred. Please try again later.');
            }
        };
    }

    function Note(text, id) {
        this.text = text;
        this.id = id;
        this.list = document.getElementById('list');

        this.createNote = function() {
            var new_item = document.createElement('li');
            var button_del = document.createElement('button');

            button_del.innerText = '×';
            button_del.setAttribute('class', 'del');

            new_item.innerHTML = '<span class="text">' + this.text + '</span> ';
            new_item.appendChild(button_del);
            new_item.setAttribute('data-id', this.id);

            this.list.appendChild(new_item);
        };

        this.deleteNote = function() {
            document.onclick = function(event) {
                var target = event.target;

                if (target.className === 'del') {
                    this.list.removeChild(target.parentNode);
                }
            }.bind(this);
        };

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
        };

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