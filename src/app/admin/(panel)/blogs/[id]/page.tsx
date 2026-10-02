import React from "react";
import { notFound } from "next/navigation";
import { getBlogByIdAdmin } from "@/lib/blogs";
import BlogForm from "../BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogByIdAdmin(id);

  if (!blog) {
    notFound();
  }

  return <BlogForm blog={blog} />;
}
