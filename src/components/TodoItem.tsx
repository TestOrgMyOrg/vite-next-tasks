import { motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import type { Todo } from "./TodoApp";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm group"
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          todo.completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/40 hover:border-primary"
        }`}
      >
        {todo.completed && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check size={14} className="text-primary-foreground" />
          </motion.div>
        )}
      </button>

      <span
        className={`flex-1 text-foreground transition-all ${
          todo.completed ? "line-through opacity-50" : ""
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}
