
import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Plus, Trash, Check, Square, CheckSquare, ListTodo } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showNewTaskInput, setShowNewTaskInput] = useState(false);
  const { toast } = useToast();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    addTask(newTaskTitle.trim());
    setNewTaskTitle('');
    setShowNewTaskInput(false);
    
    toast({
      title: "Tarefa criada",
      description: "Nova tarefa adicionada com sucesso.",
    });
  };

  const handleToggleTask = (id: string) => {
    toggleTask(id);
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Tarefa desmarcada" : "Tarefa concluída",
        description: task.completed ? "A tarefa foi desmarcada." : "A tarefa foi marcada como concluída.",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    
    toast({
      title: "Tarefa removida",
      description: "A tarefa foi removida com sucesso.",
    });
  };

  return (
    <div className="glass-panel p-4 rounded-lg animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-light">Tarefas</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNewTaskInput(true)}
          className="p-1 h-auto"
          title="Adicionar nova tarefa"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {showNewTaskInput && (
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-1 bg-transparent border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30"
            autoFocus
          />
          <Button type="submit" size="sm" disabled={!newTaskTitle.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setShowNewTaskInput(false);
              setNewTaskTitle('');
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </form>
      )}
      
      {tasks.length === 0 ? (
        <p className="text-note-muted text-sm text-center py-4">
          Nenhuma tarefa criada. Adicione sua primeira tarefa!
        </p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li 
              key={task.id}
              className="flex items-center justify-between group p-2 rounded-md hover:bg-white/5 transition-colors"
            >
              <div 
                className="flex items-center gap-2 flex-1 cursor-pointer"
                onClick={() => handleToggleTask(task.id)}
              >
                {task.completed ? (
                  <CheckSquare className="w-5 h-5 text-green-500" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
                <span className={`${task.completed ? 'line-through text-note-muted' : ''}`}>
                  {task.title}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
