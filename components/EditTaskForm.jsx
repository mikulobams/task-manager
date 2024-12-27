"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTaskForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: newTitle,
          newDescription: newDescription,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Task: </label>
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 px-8 py-2"
          type="text"
          id="title"
          placeholder="Task Title"
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          className="border border-slate-500 px-8 py-2"
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
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
        Update Task
      </button>
    </form>
  );
}
