import { getServerSession } from "next-auth";
import prisma from "@/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const storeId = searchParams.get("storeId") || "";
  const user = searchParams.get("user") || false;

  const skipPage = parseInt(page) - 1;
  const count = await prisma.comment.count({
    where: {
      storeId: storeId ? parseInt(storeId) : {},
      userId: user && session?.user.id ? parseInt(session?.user.id) : {},
    },
  });

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      storeId: storeId ? parseInt(storeId) : {},
      userId: user && session?.user.id ? parseInt(session?.user.id) : {},
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
    include: {
      user: true,
      store: true,
    },
  });

  return NextResponse.json(
    {
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const data = await req.json();
  const { storeId, body } = data;

  if (!session?.user)
    return NextResponse.json(null, {
      status: 401,
    });

  const comment = await prisma.comment.create({
    data: {
      storeId,
      body,
      userId: parseInt(session.user.id),
    },
  });

  return NextResponse.json(comment, {
    status: 200,
  });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!session?.user || !id) {
    return NextResponse.json(null, { status: 401 });
  }

  const result = await prisma.comment.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json(result, {
    status: 200,
  });
}
