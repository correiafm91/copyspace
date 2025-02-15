
import React from 'react';
import { useNotes } from '../contexts/NotesContext';
import { Plus, Trash, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export default function NoteList() {
  const { notes, deleteNote } = useNotes();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light tracking-tight flex items-center gap-2">
          <Target className="w-6 h-6" />
          Million-Dollar Copywriter
        </h1>
        <Button
          onClick={() => navigate('/new')}
          className="bg-black text-white hover:bg-black/80 note-transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="glass-panel p-4 rounded-lg hover-scale group cursor-pointer"
            onClick={() => navigate(`/edit/${note.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium truncate flex-1">{note.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="opacity-0 group-hover:opacity-100 note-transition text-note-muted hover:text-note-text"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
            <p className="text-note-muted text-sm line-clamp-3">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
