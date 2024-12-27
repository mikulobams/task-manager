import connectMongoDB from "../../../libs/mongodb";
import Task from "../../../models/task";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const newTask = await Task.create({ title, description });

    return NextResponse.json(
      { message: "Task created successfully", data: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error creating task: ${error.message}`); // Log the error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const tasks = await Task.find();

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ message: "No tasks found" }, { status: 404 });
    }

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.log(`Error fetching tasks: ${error.message}`); // Log the error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log(`Deleting task with id: ${id}`); // Log the id

    if (!id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const del = await Task.findByIdAndDelete(id);
    if (!del) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
