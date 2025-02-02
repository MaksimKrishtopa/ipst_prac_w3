import { ITask } from "../../entities/task";
import { create } from "zustand";

interface TaskStore {
  tasks: Record<string, ITask[]>;
  selectedDate: string;
  setDate: (date: string) => void;
  addTask: (task: ITask) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const getStoredTasks = (): Record<string, ITask[]> => {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : {};
};

const storeTasks = (tasks: Record<string, ITask[]>) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: getStoredTasks(),
  selectedDate: new Date().toISOString().split("T")[0], 
  setDate: (date) => set(() => ({ selectedDate: date })),
  addTask: (task) =>
    set((state) => {
      const updatedTasks = {
        ...state.tasks,
        [state.selectedDate]: [...(state.tasks[state.selectedDate] || []), task],
      };
      storeTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),
  removeTask: (id) =>
    set((state) => {
      const updatedTasks = {
        ...state.tasks,
        [state.selectedDate]: state.tasks[state.selectedDate]?.filter(
          (task) => task.id !== id
        ) || [],
      };
      storeTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),
  editTask: (id, text) =>
    set((state) => {
      const updatedTasks = {
        ...state.tasks,
        [state.selectedDate]: state.tasks[state.selectedDate]?.map((task) =>
          task.id === id ? { ...task, text } : task
        ) || [],
      };
      storeTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),
  toggleTaskCompletion: (id) =>
    set((state) => {
      const updatedTasks = {
        ...state.tasks,
        [state.selectedDate]: state.tasks[state.selectedDate]?.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ) || [],
      };
      storeTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),
}));
