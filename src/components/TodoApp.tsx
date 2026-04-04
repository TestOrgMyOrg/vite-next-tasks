import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Done", value: "completed" },
];

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = (text: string) => {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, completed: false },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-16 pb-20 sm:pt-24">
      <div className="w-full max-w-lg">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl sm:text-6xl text-foreground text-center mb-10 tracking-tight"
        >
          Today
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TodoInput onAdd={addTodo} />
        </motion.div>

        {/* Filters */}
        <div className="flex gap-1 mt-6 mb-4 bg-secondary rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-all ${
                filter === f.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground text-sm mt-6"
          >
            {activeCount === 0
              ? "All done! 🎉"
              : `${activeCount} task${activeCount !== 1 ? "s" : ""} remaining`}
          </motion.p>
        )}

        {todos.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground text-sm mt-12"
          >
            No tasks yet. Add one above to get started.
          </motion.p>
        )}
      </div>
    </div>
  );
}
