import { getServerSession } from "next-auth";
import prisma from "@/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  if (!session?.user) {
    return NextResponse.json(null, { status: 401 });
  }

  const count = await prisma.like.count({
    where: {
      userId: parseInt(session.user.id),
    },
  });

  const skipPage = parseInt(page) - 1;

  const likes = await prisma.like.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: parseInt(session.user.id),
    },
    include: {
      store: true,
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
  });

  return NextResponse.json(
    {
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const data = await req.json();
  const { storeId } = data;

  if (!session?.user) {
    return NextResponse.json(null, { status: 401 });
  }

  let like = await prisma.like.findFirst({
    where: {
      storeId,
      userId: parseInt(session?.user?.id),
    },
  });

  if (like) {
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json(like, {
      status: 204,
    });
  } else {
    like = await prisma.like.create({
      data: {
        storeId: storeId,
        userId: parseInt(session?.user?.id),
      },
    });

    return NextResponse.json(like, { status: 201 });
  }
}
