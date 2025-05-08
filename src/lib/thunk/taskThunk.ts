import { createAsyncThunk } from "@reduxjs/toolkit";

interface ChangeImportancePayload {
  todoId: string;
  status: boolean;
}

// Define a type for the todo data (payload)
interface TodoData {
  taskTitle: string;
  taskDesc: string;
  isImportant: boolean;
  dueDate: Date | null;
  priority: string;
  assignedTo: string;
}

// const url = "https://taskmanager-stamurai-server-1.onrender.com";
// const url = "http://localhost:8000";
const url = "https://task-manager-stamurai-server.vercel.app";

// export const getMyTasks = createAsyncThunk(
//   "todo/getMyTasks",
//   async (_N_E_STYLE_LOAD, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("tm-token");
//       const response = await fetch("http://localhost:8000/todo/getMyTasks", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       console.log("tasks", data);
//       if (response.ok) {
//         return data.data;
//       } else {
//         return rejectWithValue(data.message || "Failed to fetch tasks");
//       }
//     } catch (error) {}
//   }
// );
// Fetch All Tasks
export const fetchAllTasks = createAsyncThunk(
  "todo/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("tm-token");

      const response = await fetch(`${url}/todo/read-todo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("tasks", data);

      if (response.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Failed to fetch tasks");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Todo
export const createTodo = createAsyncThunk(
  "todo/create",
  async (todoData: TodoData, { rejectWithValue }) => {
    try {
      console.log("step 1");
      const token = localStorage.getItem("tm-token");

      const response = await fetch(`${url}/todo/create-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
      });

      const data = await response.json();

      if (response.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Failed to create todo");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeIsImportant = createAsyncThunk<
  { todoId: string; status: boolean },
  ChangeImportancePayload,
  { rejectValue: string }
>("todo/changeImportant", async ({ todoId, status }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("tm-token");
    await fetch(`${url}/todo/changeImportanceStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ todoId, status: !status }),
    });

    return { todoId, status: !status };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Change Completed Status
export const changeIsCompleted = createAsyncThunk(
  "todo/changeCompleted",
  async (todoId: string, { rejectWithValue }) => {
    try {
      console.log("from change", todoId);
      const token = localStorage.getItem("tm-token");

      await fetch(`${url}/todo/changeCompletedStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ todoId }),
      });

      return todoId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update",
  async (
    {
      todoId,
      taskTitle,
      taskDesc,
      dueDate,
    }: {
      todoId: string;
      taskTitle: string;
      taskDesc: string;
      dueDate: Date | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("tm-token");
      console.log(
        "todo details from updateTodo",
        todoId,
        taskTitle,
        taskDesc,
        dueDate
      );

      const response = await fetch(`${url}/todo/edit-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          todoId,
          taskTitle,
          taskDesc,
          dueDate: dueDate ? dueDate.toISOString() : null, // Convert Date to string
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          todoId,
          taskTitle,
          taskDesc,
          dueDate: dueDate?.toISOString() || null,
        }; // Convert Date to string
      } else {
        return rejectWithValue(data.message || "Failed to update todo");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Todo
export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (todoId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("tm-token");
      console.log("todoId", todoId);

      await fetch(`${url}/todo/delete-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ todoId }),
      });

      return todoId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const readRegisterUsers = createAsyncThunk(
  "todo/readAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${url}/todo/readAllusers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server sends an error status
        return rejectWithValue(data.message);
      }

      return data; // assuming it sends { message, data }
    } catch (error: any) {
      // if the request itself fails (like network error)
      return rejectWithValue(error.message);
    }
  }
);

export const readAssignTasks = createAsyncThunk(
  "todo/readAssignTask",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("tm-token");
      console.log("hello you callll me");
      const response = await fetch(`${url}/todo/readAssignTask`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <--- fixed here
        },
      });

      const data = await response.json();
      console.log("tasks data from readAsignTasks", data);

      if (response.ok) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Failed to fetch tasks");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
