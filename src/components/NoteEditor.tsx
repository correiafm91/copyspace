
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
    const text = content.trim();
    if (!text) return 0;
    
    // Divide por espaços, tabulações e quebras de linha
    const words = text.split(/[\s\n\t]+/);
    // Filtra palavras vazias e retorna a contagem
    return words.filter(word => word.length > 0).length;
  };

  return (
    <div className={`min-h-screen ${isFullscreen ? 'bg-note-bg' : ''}`}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-note-muted hover:text-note-text note-transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-note-muted hover:text-note-text note-transition active:scale-95"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={copyToClipboard}
              variant="ghost"
              className="text-note-muted hover:text-note-text note-transition active:scale-95"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-black text-white hover:bg-black/80 note-transition active:scale-95"
            >
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
            className="w-full bg-transparent text-2xl font-light focus:outline-none transition-colors focus:bg-white/5 rounded px-2 py-1"
            autoFocus
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="w-full h-[60vh] bg-transparent focus:outline-none resize-none text-note-text/90 transition-colors focus:bg-white/5 rounded px-2 py-1"
          />
          <div className="flex justify-end text-note-muted text-sm animate-fade-in">
            {getWordCount()} words
          </div>
        </div>
      </div>
    </div>
  );
}
