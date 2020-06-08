const Note = require('../model/notesModel');
//const notes = [];

exports.getNotesPage = (req, res, next) => {
	res.render('editnote', {
		title: 'Create Notes',
		editing: false
	});
};

exports.postNotes = (req, res, next) => {
	const note = new Note(null, req.body.title, req.body.note); //vytvořím si objekt s mými daty, uložím do konstanty note
	note
		.save()
		.then(() => {
			res.redirect('/savednotes');
		})
		.catch((err) => {
			console.log(err);
		});
	console.log(note);
};

exports.postEditNote = (req, res, next) => {
	const ID = req.body.id;
	const title = req.body.title;
	const text = req.body.note;
	const note = new Note(ID, title, text);
	note
		.save()
		.then(() => {
			Note.delete(ID)
				.then(() => {
					res.redirect('/admin/editnotes');
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => console.log(err));

	//udělá se save ale pod novým ID. Ja reqestuju ID z neakt. poznamky a tu odstraním
	//PŘIDAT QUERY V PŘÍPADĚ ŽE SE PROVADI EDIT
	//nová funkce v classe, která uděla nejprve delete měnícího noteu a pak save nových dat
	//res.redirect('/savednotes');
};

exports.renderNotes = (req, res, next) => {
	Note.fetch()
		.then(([ rows, fieldData ]) => {
			//destructuring
			res.render('savednotes', {
				title: 'Saved Notes',
				note: rows
			});
		})
		.catch((err) => console.log(err));
};

exports.getNote = (req, res, next) => {
	const editNote = req.query.edit;
	const ID = req.params.noteId; //id z html
	Note.findById(ID)
		.then(([ note ]) => {
			console.log(note);
			res.render('show-detail', {
				title: note[0].title,
				editing: editNote,
				note: note[0] //data obsahuje první pole v poli
			});
		})
		.catch((err) => console.log(err));
};

exports.editNote = (req, res, next) => {
	const editMode = req.query.edit;
	const noteId = req.params.noteId;
	if (!editMode) {
		return res.redirect('/');
	}
	Note.findById(noteId)
		.then(([ note ]) => {
			res.render('editnote', {
				title: 'Edit',
				editing: editMode,
				note: note[0]
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteNote = (req, res, next) => {
	const ID = req.body.noteId;
	Note.delete(ID)
		.then(() => {
			res.redirect('/admin/editnotes');
		})
		.catch((err) => console.log(err));
};

exports.getAdminData = (req, res, next) => {
	Note.fetch()
		.then(([ rows, fieldData ]) => {
			res.render('adminedit', {
				title: 'Admin',
				note: rows
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getRedirect = (req, res, next) => {
	res.redirect('/admin/editnotes');
};
