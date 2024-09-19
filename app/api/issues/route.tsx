import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is Reqiured").max(255),
  description: z.string().min(1, "description is Reqiured"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  return NextResponse.json(
    { title: body.title, description: body.description },
    { status: 201 }
  );

  // const newIssue = await prisma.issue.create({
  //   data: { title: body.title, description: body.desc },
  // });

  // return NextResponse.json(newIssue, { status: 201 });
}
