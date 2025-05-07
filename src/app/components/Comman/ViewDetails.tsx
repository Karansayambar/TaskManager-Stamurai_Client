import {
  changeIsCompleted,
  deleteTodo,
  updateTodo,
} from "@/lib/thunk/taskThunk";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgClose, CgAddR } from "react-icons/cg";
import { IoIosCloudDone } from "react-icons/io";
import { AiOutlineCalendar, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/lib/store";
import { Todo } from "@/lib/types";

// In ViewDetails.tsx
type ViewDetailsProps = {
  currentSelected: Todo | null;
  setCurrentSelected: (task: Todo | null) => void;
  setViewTask: (view: boolean) => void;
};

const ViewDetails: React.FC<ViewDetailsProps> = ({
  currentSelected,
  setCurrentSelected,
  setViewTask,
}) => {
  const [editedTitle, setEditedTitle] = useState<string>(
    currentSelected?.taskTitle || ""
  );
  const [editedDesc, setEditedDesc] = useState<string>(
    currentSelected?.taskDesc || ""
  );
  const [isModal, setIsModal] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.task
  );

  const dispatch = useDispatch<AppDispatch>();

  const toggleCalender = () => {
    setIsModal(!isModal);
  };

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("button click in update todo");

    dispatch(
      updateTodo({
        todoId: currentSelected!._id, // Assert that currentSelected is not null
        taskTitle: editedTitle,
        taskDesc: editedDesc,
        dueDate: dueDate || null,
      })
    );
    setViewTask(false);
  };

  const handleDeleteTodo = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(deleteTodo(currentSelected!._id))
      .unwrap()
      .then(() => {
        toast.success("Task deleted successfully");
        setViewTask(false);
      })
      .catch(() => {
        toast.error("Failed to delete task ❌");
      });
  };

  const handleOnCompleted = () => {
    dispatch(changeIsCompleted(currentSelected!._id))
      .unwrap()
      .then(() => {
        toast.success("Task marked as completed ✅");
      })
      .catch(() => {
        toast.error("Failed to update task status.");
      });
  };

  return (
    <div className="container relative flex flex-col justify-between w-full h-[895px] rounded-sm bg-[#EEF6EF]">
      <div className="flex justify-end p-4">
        <CgClose
          onClick={() => setViewTask(false)}
          className="text-2xl cursor-pointer"
        />
      </div>

      <div className="flex flex-col h-full w-full items-start justify-between pl-14 pt-14">
        {/* Title Edit */}
        <div className="w-full">
          <div className="flex w-full items-center justify-between p-8 border-t-2 border-[#D9E5DA]">
            <div className="flex flex-col gap-4 w-full p-4">
              <input
                className="w-full text-md font-semibold py-2 px-3 text-black/80 border border-gray-300 rounded"
                placeholder="Enter Task Title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />

              <textarea
                className="w-full text-md font-semibold py-2 px-3 text-black/80 border border-gray-300 rounded h-32 resize-none"
                placeholder="Enter Task Description"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
              />

              <button
                onClick={handleUpdateTodo}
                className="w-full px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-md font-semibold transition duration-200"
              >
                Update
              </button>
            </div>
          </div>

          {/* Add Step */}
          <div className="flex w-full items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA]">
            <div className="flex items-center gap-4 cursor-pointer">
              <CgAddR className="text-xl" />
              <p className="text-md font-semibold text-black/80">Add Step</p>
            </div>
          </div>

          {/* Mark Completed */}
          <div className="flex w-full items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA]">
            <div
              onClick={handleOnCompleted}
              className="flex cursor-pointer items-center gap-4"
            >
              <IoIosCloudDone className="text-2xl" />
              <p className="text-md font-semibold text-black/80">
                Add to Completed
              </p>
            </div>
          </div>

          {/* Add Due Date */}
          <div className="flex w-full relative items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA]">
            <div
              onClick={toggleCalender}
              className="flex items-center gap-4 cursor-pointer"
            >
              <AiOutlineCalendar className="text-xl" />
              <p className="text-md font-semibold text-black/80">
                Add Due Date
              </p>
            </div>
            {isModal && (
              <div className="modal absolute top-16 right-32">
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
          </div>

          {/* Delete Task */}
          <div className="flex w-full items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA]">
            <div
              onClick={handleDeleteTodo}
              className="flex cursor-pointer items-center gap-4 text-red-600"
            >
              <AiOutlineDelete className="text-xl" />
              <p className="text-md font-semibold">Delete Task</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
