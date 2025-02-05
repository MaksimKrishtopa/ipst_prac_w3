import { useTaskStore } from "./useTaskStore";
import { ITask } from "../index";

export function useTaskActions() {
  const { tasks, selectedDate, setDate, addTask, removeTask, editTask, toggleTaskCompletion } = useTaskStore();

  const handleAddTask = (task: ITask) => {
    addTask(task);
  };

  const handleRemoveTask = (id: string) => {
    removeTask(id);
  };

  const handleEditTask = (id: string, text: string) => {
    editTask(id, text);
  };

  const handleToggleTaskCompletion = (id: string) => {
    toggleTaskCompletion(id);
  };

  return {
    tasks,
    selectedDate,
    setSelectedDate: setDate,
    handleAddTask,
    handleRemoveTask,
    handleEditTask,
    handleToggleTaskCompletion,
  };
}
