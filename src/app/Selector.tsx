export const selectTodayTasksCount = (state: any) => {
  const today = new Date();
  return state.task.filteredTasks?.filter((task: any) => {
    const dueDate = new Date(task.dueDate);
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  }).length;
};

export const selectOverdueTasksCount = (state: any) => {
  const today = new Date();
  return state.task.filteredTasks?.filter(
    (task: any) => new Date(task.dueDate) < today
  ).length;
};

export const selectImportantTasksCount = (state: any) => {
  return state.task.filteredTasks?.filter((task: any) => task.isImportant)
    .length;
};

export const selectCompletedTasksCount = (state: any) => {
  return state.task.filteredTasks?.filter((task: any) => task.isCompleted)
    .length;
};
