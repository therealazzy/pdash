import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const notesFilePath = path.join(__dirname, '../data/notes.json');

const readNotes = () => {
    if(!fs.existsSync(notesFilePath)){
        return [];
    }
    const data = fs.readFileSync(notesFilePath, 'utf8');
    return JSON.parse(data);
}

const writeNotes = (notes) => {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

export const getNotes = (req, res) => {
    const notes = readNotes();
    res.json(notes);
}

export const createNote = (req, res) => {
    const { title, content } = req.body;

    if(!title || !content){
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const notes = readNotes();
    const newNote = { id: Date.now(), title, content, createdAt: new Date().toISOString() };
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json(newNote);
}

export const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const notes = readNotes();
    const noteIndex = notes.findIndex(note => note.id === id);

    if(noteIndex === -1){
        return res.status(404).json({ error: 'Note not found' });
    }

    notes[noteIndex] = { ...notes[noteIndex], title, content };
    writeNotes(notes);
    res.json(notes[noteIndex]);
}

export const deleteNote = (req, res) => {
    const { id } = req.params;
    const notes = readNotes();
    const noteId = parseInt(id, 10);
    
    if (isNaN(noteId)) {
        return res.status(400).json({ error: 'Invalid note ID' });
    }

    const filteredNotes = notes.filter(note => note.id !== noteId);

    if(filteredNotes.length === notes.length){
        return res.status(404).json({ error: 'Note not found' });
    }

    writeNotes(filteredNotes);
    res.json({ message: 'Note deleted successfully' });
}