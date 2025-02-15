
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, title, content }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
