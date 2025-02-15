
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';

export default function NoteEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNote, updateNote, getNote } = useNotes();

  useEffect(() => {
    if (id) {
      const note = getNote(id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [id, getNote]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (id) {
      updateNote(id, title, content);
    } else {
      addNote(title, content);
    }
    navigate('/');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen ${isFullscreen ? 'bg-note-bg' : ''}`}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-note-muted hover:text-note-text note-transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-note-muted hover:text-note-text note-transition"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button onClick={handleSave} className="glass-panel hover:bg-white/5 note-transition">
              Save
            </Button>
          </div>
        </div>

        <div className="glass-panel rounded-lg p-6 space-y-4 animate-fade-in">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full bg-transparent text-2xl font-light focus:outline-none"
            autoFocus
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="w-full h-[60vh] bg-transparent focus:outline-none resize-none text-note-text/90"
          />
        </div>
      </div>
    </div>
  );
}
