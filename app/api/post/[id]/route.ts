import prisma from "@/libs/db";
import { NextResponse } from "next/server";

interface Params {
  id: string; // Defina o tipo correto para o id aqui
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    const { id } = params;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    const body = await request.json();
    const { title, description } = body;

    const { id } = params;

    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { message: "PATCH Error", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    const { id } = params;

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Post has been deleted");
  } catch (error) {
    return NextResponse.json(
      { message: "DELETE Error", error },
      { status: 500 }
    );
  }
};
