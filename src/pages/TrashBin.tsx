
import React from 'react';
import { useNotes } from '../contexts/NotesContext';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, RotateCcw } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export default function TrashBin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Note: We'll need to implement these in NotesContext
  const { deletedNotes = [], restoreNote, permanentlyDeleteNote } = useNotes();

  const handleRestore = (id: string) => {
    restoreNote(id);
    toast({
      title: "Nota restaurada",
      description: "A nota foi restaurada com sucesso.",
    });
  };

  const handlePermanentDelete = (id: string) => {
    permanentlyDeleteNote(id);
    toast({
      title: "Nota excluída",
      description: "A nota foi excluída permanentemente.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/notes')}
          className="text-muted-foreground hover:text-foreground note-transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="glass-panel p-6 rounded-lg">
        <h2 className="text-xl font-light mb-6">Lixeira</h2>
        
        {deletedNotes.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma nota na lixeira
          </p>
        ) : (
          <div className="space-y-4">
            {deletedNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 group"
              >
                <span className="text-sm text-muted-foreground">{note.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(note.id)}
                    className="p-2 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePermanentDelete(note.id)}
                    className="p-2 h-auto text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
