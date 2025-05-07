export type Todo = {
  _id: string;
  taskTitle: string;
  taskDesc: string;
  isCompleted: boolean;
  dueDate: Date | null;
};
