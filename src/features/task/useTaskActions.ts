import { useTaskStore } from "./useTaskStore";
import { ITask } from "../../entities/task";

export function useTaskActions() {
  const { tasks, addTask, removeTask, editTask, toggleTaskCompletion } = useTaskStore();

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
    handleAddTask,
    handleRemoveTask,
    handleEditTask,
    handleToggleTaskCompletion
  };
}
