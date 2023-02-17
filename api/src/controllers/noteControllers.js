const { models } = require("../services/db");

const getUserData = async (email) => {
    const user = await models.user.findOne({ where: { name: email } });

    return user.dataValues;
};

const getNoteData = async (id) => {
    const note = await models.note.findOne({ where: { id } });

    return note;
};

const addNote = async (req, res) => {
    const { name } = req.user;
    const isContent = !!req.body?.content;

    if (!isContent) {
        res.status(500).send({ message: "Note content is missing" });
        return;
    }

    const userData = await getUserData(name);

    if (!userData.id) {
        res.status(500).send({ message: "User not found" });
        return;
    }

    models.note
        .create({ content: req.body.content, author: userData.id })
        .then((result) => {
            res.status(200).send({ message: "Note added" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err.message });
            return;
        });
};

const editNote = async (req, res) => {
    const isNoteId = !!req.body?.id;
    const isNoteContent = !!req.body?.content;

    if (!isNoteId || !isNoteContent) {
        res.status(500).send({
            message: "Missing required data to update note.",
        });
        return;
    }

    const noteData = await getNoteData(req.body.id);

    if (!noteData) {
        res.status(500).send({ message: "Note not found." });
        return;
    }

    models.note
        .update({ content: req.body.content }, { where: { id: noteData.id } })
        .then((result) => {
            res.status(200).send({ message: "Note updated successfully" });
            return;
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

const getAllNotes = async (req, res) => {
    const { name } = req.user;

    const userData = await getUserData(name);

    const data = await models.note.findAll({ where: { author: userData.id }});

    res.status(200).send(data);
};

module.exports = {
    addNote,
    editNote,
    getAllNotes,
};
