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
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: "task-1", text: "Task 1", description: "task 1", column: "todo" },
    {
      id: "task-2",
      text: "Task 2",
      description: "nothing",
      column: "in-progress",
    },
    {
      id: "task-3",
      text: "Task 3",
      description: "nothing",
      column: "peer-Review",
    },
    { id: "task-4", text: "Task 4", description: "nothing", column: "done" },
  ],
  setTasks: (tasks) => set({ tasks }),
}));
