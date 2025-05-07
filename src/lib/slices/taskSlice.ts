import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllTasks,
  createTodo,
  deleteTodo,
  changeIsImportant,
  changeIsCompleted,
  updateTodo,
  readRegisterUsers,
  readAssignTasks,
} from "../thunk/taskThunk";

// ✅ Task Type
interface Task {
  _id: string;
  taskTitle: string;
  taskDesc: string;
  dueDate: string;
  isCompleted: boolean;
  isImportant: boolean;
  priority: string;
  assignedTo: string; // This is the user ID assigned to the task
}

// ✅ State Type
interface TaskState {
  loading: boolean;
  error: string | null;
  activeFilter: string | null;
  tasks: Task[];
  globalTasks: Task[];
  filteredTasks: Task[];
  assignedTasks: Task[];
  users: any[];
  currentUserId: string | null; // User ID of the currently logged-in user
}

// ✅ Initial State
const initialState: TaskState = {
  loading: false,
  error: null,
  activeFilter: "ALL",
  tasks: [],
  globalTasks: [],
  filteredTasks: [],
  assignedTasks: [],
  users: [],
  currentUserId: null, // Set this to the logged-in user's ID
};

// ✅ Slice
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Filter tasks by today's due date
    filterTodayData: (state) => {
      state.filteredTasks = []; // clear it first
      const today = new Date();
      state.filteredTasks = state.tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        );
      });
    },

    filterDueDateData: (state) => {
      state.filteredTasks = []; // clear it first
      const today = new Date();
      state.filteredTasks = state.tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate < today;
      });
    },

    // Filter tasks by importance for the logged-in user
    filterImportantData: (state) => {
      state.filteredTasks = []; // clear it first
      state.filteredTasks = state.tasks.filter((task) => task.isImportant);
    },

    filterCompletedData: (state) => {
      state.filteredTasks = []; // clear it first
      state.filteredTasks = state.tasks.filter((task) => task.isCompleted);
    },
    filterSearch: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query === "") {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.filteredTasks = state.tasks.filter(
          (st) =>
            st.taskTitle.toLowerCase().includes(query) ||
            st.taskDesc.toLowerCase().includes(query)
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch All Tasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllTasks.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.filteredTasks = []; // clear it first
          state.loading = false;
          state.tasks = action.payload;
          state.filteredTasks = action.payload;
        }
      )
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.filteredTasks = []; // clear it first
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Change Importance
      .addCase(changeIsImportant.fulfilled, (state, action) => {
        const { todoId, status } = action.payload;

        const task = state.tasks.find((t) => t._id === todoId);
        if (task) {
          task.isImportant = status;
        }
      })

      // Change Completed
      .addCase(changeIsCompleted.fulfilled, (state, action) => {
        const updatedTodo: any = action.payload;
        console.log("updatedTodo", updatedTodo);

        const task = state.tasks.find((t) => t._id === updatedTodo._id);
        if (task) {
          task.isCompleted = updatedTodo.isCompleted;
        }
      })

      .addCase(
        updateTodo.fulfilled,
        (
          state,
          action: PayloadAction<{
            todoId: string;
            taskTitle: string;
            taskDesc: string;
            dueDate: string | null; // Ensure it's a string or null
          }>
        ) => {
          const { todoId, taskTitle, taskDesc, dueDate } = action.payload;
          const item: any = state.tasks.find((t) => t._id === todoId);
          if (item) {
            item.taskTitle = taskTitle;
            item.taskDesc = taskDesc;
            item.dueDate = dueDate; // `dueDate` is now a string or null
          }
        }
      )

      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        state.filteredTasks = state.filteredTasks.filter(
          (t) => t._id !== action.payload
        );
      })

      // Fetch Registered Users
      .addCase(readRegisterUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(readRegisterUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.allUsersData;
      })
      .addCase(readRegisterUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Assigned Tasks
      .addCase(readAssignTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readAssignTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredTasks = action.payload;
      })
      .addCase(readAssignTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ✅ Exports
export const {
  filterTodayData,
  filterImportantData,
  filterCompletedData,
  filterDueDateData,
  filterSearch,
} = taskSlice.actions;

export default taskSlice.reducer;
