"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task || !description) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task, description: description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label htmlFor="task">Task: </label>
        <input
          onChange={(e) => setTask(e.target.value)}
          value={task}
          className="border border-slate-500 px-8 py-2"
          type="text"
          id="task"
          placeholder="Task Title"
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2"
          type="text"
          id="description"
          placeholder="Task Description"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 font-bolf
       text-white py-3 px-6 w-fit rounded-md"
      >
        Add Task
      </button>
    </form>
  );
}
