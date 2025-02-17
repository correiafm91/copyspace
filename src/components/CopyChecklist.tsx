
import React from 'react';
import { Check, Square } from 'lucide-react';

interface Task {
  id: string;
  label: string;
  completed: boolean;
}

interface CopyChecklistProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export default function CopyChecklist({ tasks, onToggleTask }: CopyChecklistProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <button
          key={task.id}
          onClick={() => onToggleTask(task.id)}
          className={`flex items-center gap-2 w-full text-left p-2 rounded hover:bg-white/5 transition-colors ${
            task.completed ? 'text-note-muted line-through' : ''
          }`}
        >
          {task.completed ? (
            <Check className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
          {task.label}
        </button>
      ))}
    </div>
  );
}
