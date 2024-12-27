"use client";
import { HiOutlineTrash } from "react-icons/hi";
export default function RemoveButton({ id }) {
  const removeTask = async () => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error(`Failed to delete task ${res.status}`);
        }
        window.location.reload();
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };
  return (
    <button onClick={removeTask} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
}
