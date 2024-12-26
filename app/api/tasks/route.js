import connectMongoDB from "../../../libs/mongodb";
import Task from "../../../models/task";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Task.create({ title, description });
  return NextResponse.json(
    { message: "Task created successfully" },
    { status: 201 }
  );
}
