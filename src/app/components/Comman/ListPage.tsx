import React, { useEffect, useState, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiBell, BiRepeat } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsImportant,
  createTodo,
  fetchAllTasks,
  readRegisterUsers,
} from "@/lib/thunk/taskThunk";
import { AppDispatch, RootState } from "@/lib/store";
import TodoCard from "./TodoCard";
import { toast } from "react-toastify";
import { Todo } from "@/lib/types";
import { getSocket, initializeSocket, socketEmit } from "@/app/Socket";

// Interfaces for Todo and User
interface TodoFormData {
  taskTitle: string;
  taskDesc: string;
  isImportant: boolean;
  dueDate: Date | null;
  priority: string;
  assignedTo: string;
}
interface User {
  _id: string;
  email: string;
}

interface ListPageProps {
  setCurrentSelected: (todo: Todo) => void;
  setViewTask: (val: boolean) => void;
  viewTask: boolean;
  view: string;
  sidebar: boolean;
}

const ListPage: React.FC<ListPageProps> = ({
  setCurrentSelected,
  setViewTask,
  viewTask,
  view,
  sidebar,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDesc, setTaskDesc] = useState<string>("");
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isPriority, setIsPriority] = useState<boolean>(false);
  const [checkedTaskId, setCheckedTaskId] = useState<string | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>("Medium");
  const [assignedTo, setAssignedTo] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, filteredTasks, activeFilter, users, error } = useSelector(
    (state: RootState) => state.task
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const changeImportanceStatus = async (todoId: string, status: boolean) => {
    try {
      const data = await dispatch(
        changeIsImportant({ todoId, status })
      ).unwrap();
      toast.success(
        !status
          ? "Task marked as important!"
          : "Task removed from important list!"
      );
    } catch (error) {
      toast.error("Failed to update task importance!");
    }
  };

  useEffect(() => {
    dispatch(readRegisterUsers());
  }, [dispatch]);

  const toggleCalender = () => {
    setIsModal(!isModal);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validate required fields
    if (!assignedTo) {
      toast.error("Please select an assignee");
      return;
    }

    if (!taskTitle.trim()) {
      toast.error("Task title is required");
      return;
    }

    const todoData: TodoFormData = {
      taskTitle: taskTitle.trim(),
      taskDesc: taskDesc.trim(),
      isImportant,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
      assignedTo,
    };

    try {
      const data = await dispatch(createTodo(todoData)).unwrap();

      if (data) {
        toast.success("Task created successfully! 🎉");
        resetForm();
      }
    } catch (error: unknown) {
      handleSubmissionError(error);
    }
  };

  // Helper functions
  const resetForm = () => {
    setTaskTitle("");
    setTaskDesc("");
    setIsImportant(false);
    setPriority("Medium");
    setAssignedTo("");
    setDueDate(null);
    setIsPriority(false);
  };

  const handleSubmissionError = (error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create task";

    toast.error(errorMessage);
    console.error("Task creation error:", error);

    // Optional: Log to error tracking service
    // logErrorToService(error);
  };

  // Helper to get assignee name (mock implementation)
  const getAssigneeName = (userId: string) => {
    // You would typically get this from your users state
    const assignee = users.find((user) => user._id === userId);
    return assignee?.username || "a team member";
  };
  const handleCheckboxChange = (id: string, todo: Todo) => {
    if (id === checkedTaskId) {
      setCheckedTaskId(null);
      setViewTask(false);
    } else {
      setCheckedTaskId(id);
      setCurrentSelected(todo);
      setViewTask(true);
    }
  };

  return (
    <div className="my-2">
      <div className="flex flex-col">
        <div className="flex justify-start text-sm border-b-2">
          <span>To Do</span>
        </div>

        <div className="py-2">
          <form
            className="flex flex-col justify-between h-[230px] bg-[#F0F8F2]"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between flex-col gap-2 font-semibold text-black/80 px-10 py-4">
              <input
                placeholder="Enter Task Title Here"
                className="w-full p-3 bg-transparent rounded-md"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Enter Task Description Here"
                className="w-full p-3 bg-transparent rounded-md"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                required
              />
            </div>

            {isPriority && (
              <div className="flex justify-start space-x-8 px-10">
                {["High", "Medium", "Low"].map((level) => (
                  <div key={level} className="flex space-x-2">
                    <input
                      type="radio"
                      value={level}
                      name="priority"
                      onChange={() => setPriority(level)}
                      className="w-5 h-5"
                    />
                    <span className="text-[15px] font-semibold text-primary/90">
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isModal && (
              <div className="modal absolute top-30 left-40">
                <div className="modal-content">
                  <DatePicker
                    selected={dueDate}
                    onChange={(date: Date | null) => {
                      setDueDate(date);
                      setIsModal(false);
                    }}
                    inline
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between px-10 py-0">
              <div className="flex space-x-6 p-2">
                <BiBell size={28} onClick={() => setIsPriority(!isPriority)} />
                <BiRepeat size={28} />
                <SlCalender onClick={toggleCalender} size={25} />
                <div className="flex flex-col gap-2">
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Assignee</option>
                    {users?.length > 0 ? (
                      users.map((user: User) => (
                        <option key={user._id} value={user._id}>
                          {user.email}
                        </option>
                      ))
                    ) : (
                      <option disabled>No users found</option>
                    )}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="font-semibold px-2.5 py-1.5 rounded-md text-primary/90 bg-[#46944929]"
              >
                ADD TASK
              </button>
            </div>
          </form>
        </div>

        <div className="p-8">
          {view === "List" ? (
            <div className="flex flex-col gap-6 overflow-y-scroll max-h-[500px]">
              {filteredTasks?.map((todo, index) => (
                <TodoCard
                  key={index}
                  todo={todo}
                  checkedTaskId={checkedTaskId}
                  handleCheckboxChange={handleCheckboxChange}
                  changeImportanceStatus={changeImportanceStatus}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-scroll max-h-[500px]">
              {filteredTasks?.map((todo, index) => (
                <TodoCard
                  key={index}
                  todo={todo}
                  checkedTaskId={checkedTaskId}
                  handleCheckboxChange={handleCheckboxChange}
                  changeImportanceStatus={changeImportanceStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
