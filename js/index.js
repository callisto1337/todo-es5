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

            return new_item;
        };

        this.deleteNote = function() {
            document.onclick = function(event) {
                var target = event.target;

                if (target.className === 'del') {
                    this.list.removeChild(target.parentNode);
                }
            }.bind(this);
        };

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
                    this.renderNotes(this.storage.returnNotes());
                }
            }.bind(this);
        };

        this.renderNotes = function(data) {
            var list = document.getElementById('list');

            list.clear = '';
            for (var i in data) {
                var item_list = new Note(data[i]['text'], i);
                list.appendChild(item_list.createNote());
            }
        };

        this.renderNotes(this.storage.returnNotes());
        this.clickButton();
    }

    var app = new App();
}());