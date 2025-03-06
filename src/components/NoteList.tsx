
import React, { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { Plus, Trash, Target, FolderPlus, Folder, ArrowDown, ArrowUp, MoreVertical, Edit, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { useToast } from '../hooks/use-toast';
import TaskList from './TaskList';

export default function NoteList() {
  const { notes, folders, deleteNote, addFolder, updateFolder, deleteFolder } = useNotes();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sortDirection, setSortDirection] = useState<'newest' | 'oldest'>('newest');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    
    addFolder(newFolderName);
    setNewFolderName('');
    setShowNewFolderInput(false);
    
    toast({
      title: "Pasta criada",
      description: `A pasta "${newFolderName}" foi criada com sucesso.`,
    });
  };

  const handleUpdateFolder = (id: string) => {
    if (!editingFolderName.trim()) return;
    
    updateFolder(id, editingFolderName);
    setEditingFolderId(null);
    setEditingFolderName('');
    
    toast({
      title: "Pasta atualizada",
      description: "Nome da pasta atualizado com sucesso.",
    });
  };

  const handleDeleteFolder = (id: string, name: string) => {
    deleteFolder(id);
    if (selectedFolderId === id) {
      setSelectedFolderId(null);
    }
    
    toast({
      title: "Pasta removida",
      description: `A pasta "${name}" foi removida.`,
    });
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  const getFilteredNotes = () => {
    let filteredNotes = selectedFolderId 
      ? notes.filter(note => note.folderId === selectedFolderId)
      : notes;
    
    return [...filteredNotes].sort((a, b) => {
      if (sortDirection === 'newest') {
        return b.createdAt - a.createdAt;
      } else {
        return a.createdAt - b.createdAt;
      }
    });
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3 animate-fade-in">
          <Target className="w-6 h-6" />
          <h1 className="text-3xl font-light tracking-tight">
            Gustavo Correia Copywriter
          </h1>
          <div className="flex gap-2 items-center ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSortDirection}
              className="p-1 h-auto flex items-center gap-1 text-xs"
              title={sortDirection === 'newest' ? 'Ordenar por mais antigas' : 'Ordenar por mais recentes'}
            >
              {sortDirection === 'newest' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNewFolderInput(true)}
              className="p-1 h-auto"
              title="Criar nova pasta"
            >
              <FolderPlus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button
          onClick={() => navigate('/new')}
          className="bg-black text-white hover:bg-black/80 note-transition active:scale-95"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <div className="glass-panel p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Pastas</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNewFolderInput(true)}
                className="p-1 h-auto"
              >
                <FolderPlus className="w-4 h-4" />
              </Button>
            </div>
            
            {showNewFolderInput && (
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Nome da pasta..."
                  className="flex-1 bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:outline-none"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCreateFolder}
                  className="p-1 h-auto"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setShowNewFolderInput(false);
                    setNewFolderName('');
                  }}
                  className="p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setSelectedFolderId(null)}
                  className={`w-full text-left px-2 py-1 rounded-md text-sm flex items-center gap-2 hover:bg-white/5 
                    ${selectedFolderId === null ? 'bg-white/10' : ''}`}
                >
                  <Folder className="w-4 h-4" />
                  Todas as notas
                </button>
              </li>
              {folders.map(folder => (
                <li key={folder.id}>
                  {editingFolderId === folder.id ? (
                    <div className="flex items-center gap-1">
                      <input 
                        type="text" 
                        value={editingFolderName}
                        onChange={(e) => setEditingFolderName(e.target.value)}
                        className="flex-1 bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:outline-none"
                        autoFocus
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleUpdateFolder(folder.id)}
                        className="p-1 h-auto"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setEditingFolderId(null);
                          setEditingFolderName('');
                        }}
                        className="p-1 h-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <button
                        onClick={() => setSelectedFolderId(folder.id)}
                        className={`flex-1 text-left px-2 py-1 rounded-md text-sm flex items-center gap-2 hover:bg-white/5 
                          ${selectedFolderId === folder.id ? 'bg-white/10' : ''}`}
                      >
                        <Folder className="w-4 h-4" />
                        {folder.name}
                      </button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => {
                            setEditingFolderId(folder.id);
                            setEditingFolderName(folder.name);
                          }}>
                            <Edit className="w-4 h-4 mr-2" />
                            Renomear
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteFolder(folder.id, folder.name)}
                            className="text-red-500 focus:text-red-500"
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <TaskList />
        </div>
        
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-light">
              {selectedFolderId 
                ? `Notas em: ${folders.find(f => f.id === selectedFolderId)?.name}`
                : 'Todas as notas'
              }
            </h2>
            <Button 
              variant="ghost" 
              onClick={toggleSortDirection}
              className="flex items-center gap-2 text-sm"
            >
              {sortDirection === 'newest' ? (
                <>Mais recentes <ArrowDown className="w-4 h-4" /></>
              ) : (
                <>Mais antigas <ArrowUp className="w-4 h-4" /></>
              )}
            </Button>
          </div>
          
          {filteredNotes.length === 0 ? (
            <div className="glass-panel p-8 rounded-lg text-center">
              <p className="text-note-muted">Nenhuma nota encontrada.</p>
              <Button
                onClick={() => navigate('/new')}
                className="mt-4 bg-black text-white hover:bg-black/80 note-transition active:scale-95"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar nova nota
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="glass-panel p-4 rounded-lg hover-scale group cursor-pointer active:scale-95 note-transition"
                  onClick={() => navigate(`/edit/${note.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium truncate flex-1">{note.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                        toast({
                          title: "Nota removida",
                          description: "A nota foi removida com sucesso.",
                        });
                      }}
                      className="opacity-0 group-hover:opacity-100 note-transition text-note-muted hover:text-note-text active:scale-90"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-note-muted text-sm line-clamp-3">{stripHtmlTags(note.content)}</p>
                  <div className="mt-2 text-xs text-note-muted flex justify-between items-center">
                    <span>
                      {new Date(note.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                      })}
                    </span>
                    {note.folderId && (
                      <span className="flex items-center">
                        <Folder className="w-3 h-3 mr-1" />
                        {folders.find(f => f.id === note.folderId)?.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
