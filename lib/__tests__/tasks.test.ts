import { describe, it, expect, beforeEach } from "vitest";
import { openDb } from "../db";
import { createTask, getTask, listTasks } from "../repository/tasks";
import type Database from "better-sqlite3";

let db: Database.Database;

beforeEach(() => {
  db = openDb(":memory:");
});

describe("createTask", () => {
  it("creates a task and reads it back by ID", () => {
    const task = createTask(db, {
      title: "Buy groceries",
      priority: "medium",
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe("Buy groceries");
    expect(task.priority).toBe("medium");
    expect(task.status).toBe("todo");
    expect(task.tags).toEqual([]);
    expect(task.description).toBeNull();
    expect(task.dueDate).toBeNull();
    expect(task.createdAt).toBeDefined();
    expect(task.updatedAt).toBeDefined();

    const fetched = getTask(db, task.id);
    expect(fetched).not.toBeNull();
    expect(fetched!.id).toBe(task.id);
    expect(fetched!.title).toBe("Buy groceries");
  });

  it("creates a task with all optional fields", () => {
    const task = createTask(db, {
      title: "Write tests",
      priority: "high",
      description: "Add vitest tests for the repo",
      dueDate: "2026-12-31",
      tags: ["dev", "testing"],
    });

    expect(task.description).toBe("Add vitest tests for the repo");
    expect(task.dueDate).toBe("2026-12-31");
    expect(task.tags).toEqual(["dev", "testing"]);
  });

  it("rejects missing title", () => {
    expect(() =>
      createTask(db, { title: "", priority: "medium" })
    ).toThrow();
  });

  it("rejects missing priority", () => {
    expect(() =>
      // @ts-expect-error testing runtime validation
      createTask(db, { title: "Test task" })
    ).toThrow();
  });
});

describe("listTasks", () => {
  it("returns all created tasks", () => {
    createTask(db, { title: "Task 1", priority: "low" });
    createTask(db, { title: "Task 2", priority: "high" });

    const tasks = listTasks(db);
    expect(tasks).toHaveLength(2);
  });

  it("returns empty array when no tasks exist", () => {
    expect(listTasks(db)).toEqual([]);
  });
});
