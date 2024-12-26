import Link from "next/link";

export default function NavBar() {
  return (
    <nav
      className="flex justify-between 
    items-center bg-slate-800 px-8 py-3"
    >
      <Link href={"/"} className="text-white font-bold">
        Task Manager
      </Link>
      <Link href={"/addTask"} className="bg-white p-2 rounded-md">
        Add Task
      </Link>
    </nav>
  );
}
