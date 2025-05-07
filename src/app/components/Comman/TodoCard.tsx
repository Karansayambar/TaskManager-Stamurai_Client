"use client";

import React from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { formatDate } from "./FormatDate";

interface TodoCardProps {
  todo: any;
  checkedTaskId: string | null;
  handleCheckboxChange: (id: string, todo: any) => void;
  changeImportanceStatus: (id: string, isImportant: boolean) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  checkedTaskId,
  handleCheckboxChange,
  changeImportanceStatus,
}) => {
  console.log("todoo details", todo);
  return (
    <div className="flex items-start justify-between p-5 border border-gray-300 rounded-xl cursor-pointer hover:shadow-sm transition">
      {/* Left section */}
      <div className="flex gap-4 w-full">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={checkedTaskId === todo._id}
          onChange={() => handleCheckboxChange(todo._id, todo)}
          className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
        />

        {/* Task Info */}
        <div className="flex flex-col gap-3 p-1">
          {/* Title */}
          <div className="flex items-center gap-2">
            <strong className="text-gray-700">Title:</strong>
            <p className="text-lg font-semibold text-gray-900">
              {todo?.taskTitle}
            </p>
          </div>

          {/* Description */}
          <div className="flex items-center gap-2">
            <strong className="text-gray-700">Description:</strong>
            <p className="text-base text-gray-800">{todo?.taskDesc}</p>
          </div>

          {/* Priority */}
          <div className="flex items-center gap-2">
            <strong className="text-gray-700">Priority:</strong>
            <p className="text-base text-gray-800">{todo?.priority}</p>
          </div>

          {/* Assigned By */}
          <div className="flex items-center gap-2">
            <strong className="text-gray-700">Assigned By:</strong>
            <p className="text-base text-gray-800">{todo?.assignedBy?.email}</p>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2">
            <strong className="text-gray-700">Due Date:</strong>
            <p className="text-base text-gray-800">
              {formatDate(todo?.dueDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Star Icon */}
      <div
        className="p-2 rounded-full hover:bg-gray-100 transition"
        onClick={() => changeImportanceStatus(todo._id, todo.isImportant)}
      >
        {todo.isImportant ? (
          <MdOutlineStar size={28} color="#facc15" />
        ) : (
          <MdOutlineStarBorder size={28} color="#9ca3af" />
        )}
      </div>
    </div>
  );
};

export default TodoCard;
