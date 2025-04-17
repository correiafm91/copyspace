
import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Plus, Trash, Check, Square, CheckSquare, ListTodo, X } from 'lucide-react';
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
        <div className="flex items-center gap-2">
          <ListTodo className="w-4 h-4 text-white/70" />
          <h2 className="text-lg font-light text-gradient">Tarefas</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNewTaskInput(true)}
          className="p-1.5 h-auto hover:bg-white/10"
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
            className="flex-1 px-3 py-1.5 text-sm focus:outline-none"
            autoFocus
          />
          <Button type="submit" size="sm" variant="ghost" className="p-1.5 h-auto hover:bg-white/10" disabled={!newTaskTitle.trim()}>
            <Check className="w-4 h-4" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            className="p-1.5 h-auto hover:bg-white/10"
            onClick={() => {
              setShowNewTaskInput(false);
              setNewTaskTitle('');
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </form>
      )}
      
      {tasks.length === 0 ? (
        <p className="text-white/40 text-sm text-center py-4">
          Nenhuma tarefa criada
        </p>
      ) : (
        <ul className="space-y-1">
          {tasks.map((task) => (
            <li 
              key={task.id}
              className="flex items-center justify-between group p-2 rounded-md card-hover"
            >
              <div 
                className="flex items-center gap-2 flex-1 cursor-pointer"
                onClick={() => handleToggleTask(task.id)}
              >
                {task.completed ? (
                  <CheckSquare className="w-4 h-4 text-green-500" />
                ) : (
                  <Square className="w-4 h-4 text-white/70" />
                )}
                <span className={`text-sm ${task.completed ? 'line-through text-white/40' : 'text-white/90'}`}>
                  {task.title}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto hover:bg-white/10"
              >
                <Trash className="w-3 h-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
