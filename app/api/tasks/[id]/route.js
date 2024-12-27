import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Task from "../../../../models/task";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newTitle: title, newDescription: description } =
      await request.json();

    // Check if id is provided
    if (!id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    // Check if title and description are provided
    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if the task exists before updating
    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await Task.findByIdAndUpdate(id, { title, description });
    return NextResponse.json(
      { message: "Task updated successfully", data: { title, description } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.log(`Error fetching task: ${error.message}`); // Log the error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
