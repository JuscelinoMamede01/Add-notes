import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const body = await request.json();
    const { title, description } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: "POST error", error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "POST error", error }, { status: 500 });
  }
};
