import { ITask } from "../../entities/task";
import { create } from "zustand";

interface TaskStore {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== id) })),
  editTask: (id, text) => set((state) => ({
    tasks: state.tasks.map(task => task.id === id ? { ...task, text } : task)
  })),
  toggleTaskCompletion: (id) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    )
  }))
}));
