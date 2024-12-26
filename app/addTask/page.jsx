export default function AddTask() {
  return (
    <form className="flex flex-col gap-3">
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Task Title"
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Task Description"
      />
      <button
        className="bg-green-600 font-bolf
       text-white py-3 px-6 w-fit rounded-md"
      >
        Add Task
      </button>
    </form>
  );
}
