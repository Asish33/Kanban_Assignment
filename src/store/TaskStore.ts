import { create } from "zustand";

type Task = {
  id: string;
  text: string;
  description: string;
  column: string;
};

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  searchText: string;
  setSearchText: (searchInput: string) => void;
};

// Helper function to load tasks from localStorage or fallback to an empty array
const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks
    ? JSON.parse(storedTasks)
    : [{ id: "example", text: "Example Task", description: "Add tasks to use....", column: "todo" }];
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: loadTasks(), // Load tasks from localStorage initially
  setTasks: (tasks) => {
    set({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage whenever tasks are modified
  },
  searchText: "",
  setSearchText: (text) => set({ searchText: text.toLowerCase() }),
}));
