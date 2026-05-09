"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { createTask as createTaskInDb } from "@/lib/repository/tasks";
import type { Priority } from "@/lib/repository/tasks";

export type CreateTaskState = {
  errors?: {
    title?: string;
    priority?: string;
    general?: string;
  };
  success?: boolean;
};

export async function createTask(
  _prevState: CreateTaskState,
  formData: FormData
): Promise<CreateTaskState> {
  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const priority = (formData.get("priority") as string | null)?.trim() ?? "";
  const description = (formData.get("description") as string | null)?.trim() || null;
  const dueDate = (formData.get("dueDate") as string | null)?.trim() || null;
  const tagsRaw = (formData.get("tags") as string | null)?.trim() ?? "";
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const errors: CreateTaskState["errors"] = {};

  if (!title) errors.title = "Title is required";
  if (!priority) errors.priority = "Priority is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const db = getDb();
    createTaskInDb(db, {
      title,
      priority: priority as Priority,
      description,
      dueDate,
      tags,
    });
  } catch {
    return { errors: { general: "Failed to create task. Please try again." } };
  }

  revalidatePath("/");
  return { success: true };
}
