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
import { logoutUser } from "../thunk/authThunk";

//  Task Type
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

//  State Type
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

//  Initial State
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

//  Slice
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Filter tasks by today's due date
    filterTodayData: (state) => {
      state.filteredTasks = [];
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

    // Filter tasks by today's due date
    filterTodayDataUser: (state) => {
      state.filteredTasks = [];
      const today = new Date();
      state.filteredTasks = state.assignedTasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        );
      });
    },

    filterDueDateData: (state) => {
      state.filteredTasks = [];
      const today = new Date();
      state.filteredTasks = state.tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate < today;
      });
    },
    filterDueDateDataUser: (state) => {
      state.filteredTasks = [];
      const today = new Date();
      state.filteredTasks = state.assignedTasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate < today;
      });
    },

    // Filter tasks by importance for the logged-in user
    filterImportantData: (state) => {
      state.filteredTasks = [];
      state.filteredTasks = state.tasks.filter((task) => task.isImportant);
    },
    // Filter tasks by importance for the logged-in user
    filterImportantDataUser: (state) => {
      state.filteredTasks = [];
      state.filteredTasks = state.assignedTasks.filter(
        (task) => task.isImportant
      );
    },

    filterCompletedData: (state) => {
      state.filteredTasks = [];
      state.filteredTasks = state.tasks.filter((task) => task.isCompleted);
    },
    filterCompletedDataUser: (state) => {
      state.filteredTasks = [];
      state.filteredTasks = state.assignedTasks.filter(
        (task) => task.isCompleted
      );
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

    filterSearchUser: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query === "") {
        state.filteredTasks = state.assignedTasks;
      } else {
        state.filteredTasks = state.filteredTasks = state.assignedTasks.filter(
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
          state.filteredTasks = [];
          state.loading = false;
          state.tasks = action.payload;
          state.filteredTasks = action.payload;
        }
      )
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.filteredTasks = [];
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
        state.assignedTasks = state.assignedTasks.filter(
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
        state.assignedTasks = action.payload;
        state.filteredTasks = action.payload;
      })
      .addCase(readAssignTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // reset everything to initial state
        state.loading = false;
        state.error = null;
        state.activeFilter = "ALL";
        state.tasks = [];
        state.filteredTasks = [];
        state.assignedTasks = [];
        state.users = [];
        state.currentUserId = null;
      });
  },
});

//  Exports
export const {
  filterTodayData,
  filterImportantData,
  filterCompletedData,
  filterDueDateData,
  filterSearch,
  filterTodayDataUser,
  filterImportantDataUser,
  filterCompletedDataUser,
  filterDueDateDataUser,
  filterSearchUser,
} = taskSlice.actions;

export default taskSlice.reducer;
