
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  folderId: string | null;
}

interface Folder {
  id: string;
  name: string;
  createdAt: number;
}

interface NotesContextType {
  notes: Note[];
  folders: Folder[];
  addNote: (title: string, content: string, folderId?: string | null) => void;
  updateNote: (id: string, title: string, content: string, folderId?: string | null) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
  addFolder: (name: string) => void;
  updateFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedFolders = localStorage.getItem('folders');
    
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  const addNote = (title: string, content: string, folderId: string | null = null) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: Date.now(),
      folderId,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, title: string, content: string, folderId?: string | null) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { 
              ...note, 
              title, 
              content,
              ...(folderId !== undefined ? { folderId } : {})
            }
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

  const addFolder = (name: string) => {
    const newFolder = {
      id: Date.now().toString(),
      name,
      createdAt: Date.now(),
    };
    setFolders((prev) => [...prev, newFolder]);
    return newFolder.id;
  };

  const updateFolder = (id: string, name: string) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name } : folder
      )
    );
  };

  const deleteFolder = (id: string) => {
    // Move notes in this folder to no folder
    setNotes((prev) =>
      prev.map((note) =>
        note.folderId === id ? { ...note, folderId: null } : note
      )
    );
    
    // Delete the folder
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        folders, 
        addNote, 
        updateNote, 
        deleteNote, 
        getNote,
        addFolder,
        updateFolder,
        deleteFolder
      }}
    >
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
