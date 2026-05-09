import type Database from "better-sqlite3";

export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in_progress" | "done" | "cancelled";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: Priority;
  status: Status;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  priority: Priority;
  description?: string | null;
  dueDate?: string | null;
  tags?: string[];
}

interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  status: string;
  tags: string;
  created_at: string;
  updated_at: string;
}

function rowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    dueDate: row.due_date,
    priority: row.priority as Priority,
    status: row.status as Status,
    tags: row.tags ? JSON.parse(row.tags) : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createTask(db: Database.Database, input: CreateTaskInput): Task {
  if (!input.title || input.title.trim() === "") {
    throw new Error("title is required");
  }
  if (!input.priority) {
    throw new Error("priority is required");
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const tags = JSON.stringify(input.tags ?? []);

  db.prepare(
    `INSERT INTO tasks (id, title, description, due_date, priority, status, tags, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, 'todo', ?, ?, ?)`
  ).run(
    id,
    input.title.trim(),
    input.description ?? null,
    input.dueDate ?? null,
    input.priority,
    tags,
    now,
    now
  );

  return getTask(db, id)!;
}

export function getTask(db: Database.Database, id: string): Task | null {
  const row = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(id) as TaskRow | undefined;
  return row ? rowToTask(row) : null;
}

export function listTasks(db: Database.Database): Task[] {
  const rows = db
    .prepare("SELECT * FROM tasks ORDER BY created_at DESC")
    .all() as TaskRow[];
  return rows.map(rowToTask);
}
