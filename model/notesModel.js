const db = require('../util/database');

module.exports = class Note {
	constructor(id, title, text) {
		this.id = id;
		this.title = title;
		this.text = text;
		this.date = Date(Date.now()).toString();
	}

	save() {
		//nový note - vola se postNotes ctrl

		return db.execute('INSERT INTO notes (title, date, text) VALUES (?, ?, ?)', [
			this.title,
			this.date,
			this.text
		]);
	}

	/* 	static update(id) {
		if(this.id)
			return db.execute('UPDATE notes SET title = ?, text = ? WHERE notes.id = ?', [ this.title, this.text, id ]);
	} */

	static delete(id) {
		return db.execute('DELETE FROM notes WHERE notes.id = ?', [ id ]);
		/* getDataFromFile((notes) => {
			const updatedNotes = notes.filter((n) => n.id !== id);
			fs.writeFile(p, JSON.stringify(updatedNotes), (err) => console.log(err));
		}); */
	}

	static fetch() {
		return db.execute('SELECT DISTINCT * FROM notes');
	}

	static findById(id) {
		//KDYŽ UDĚLAM EDIT - VYTVOŘÍ SE NOVÝ ZAZNAM ŠPATNĚ
		//CHCI ZMĚNIT STÁVAJÍCÍ ZÁZNAM
		return db.execute('SELECT * FROM notes WHERE notes.id = ?', [ id ]);
	}
};
