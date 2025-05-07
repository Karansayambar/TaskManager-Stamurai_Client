export const selectTodayTasksCount = (state) => {
  const today = new Date();
  return state.task.filteredTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  }).length;
};

export const selectOverdueTasksCount = (state) => {
  const today = new Date();
  return state.task.filteredTasks.filter(
    (task) => new Date(task.dueDate) < today
  ).length;
};

export const selectImportantTasksCount = (state) => {
  return state.task.filteredTasks.filter((task) => task.isImportant).length;
};

export const selectCompletedTasksCount = (state) => {
  return state.task.filteredTasks.filter((task) => task.isCompleted).length;
};
