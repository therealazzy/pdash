import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

export const noteRouter = express.Router();

noteRouter.get('/', getNotes);
noteRouter.post('/', createNote);
noteRouter.put('/:id', updateNote);
noteRouter.delete('/:id', deleteNote);




