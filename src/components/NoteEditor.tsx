
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import { ArrowLeft, Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';

export default function NoteEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getWordCount = () => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
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
            <Button 
              onClick={copyToClipboard}
              variant="ghost"
              className="text-note-muted hover:text-note-text note-transition"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button onClick={handleSave} className="bg-black text-white hover:bg-black/80 note-transition">
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
          <div className="flex justify-end text-note-muted text-sm">
            {getWordCount()} words
          </div>
        </div>
      </div>
    </div>
  );
}
