import { describe, it, expect } from "vitest";
import { openDb } from "../db";

describe("database schema", () => {
  it("creates the tasks table with the correct columns", () => {
    const db = openDb(":memory:");

    const tableInfo = db
      .prepare("PRAGMA table_info(tasks)")
      .all() as Array<{ name: string; type: string; notnull: number; pk: number }>;

    expect(tableInfo.length).toBeGreaterThan(0);

    const columns = Object.fromEntries(tableInfo.map((col) => [col.name, col]));

    expect(columns["id"]).toBeDefined();
    expect(columns["id"].type).toBe("TEXT");
    expect(columns["id"].pk).toBe(1);

    expect(columns["title"]).toBeDefined();
    expect(columns["title"].type).toBe("TEXT");
    expect(columns["title"].notnull).toBe(1);

    expect(columns["description"]).toBeDefined();
    expect(columns["description"].type).toBe("TEXT");

    expect(columns["due_date"]).toBeDefined();
    expect(columns["due_date"].type).toBe("TEXT");

    expect(columns["priority"]).toBeDefined();
    expect(columns["priority"].type).toBe("TEXT");
    expect(columns["priority"].notnull).toBe(1);

    expect(columns["status"]).toBeDefined();
    expect(columns["status"].type).toBe("TEXT");
    expect(columns["status"].notnull).toBe(1);

    expect(columns["tags"]).toBeDefined();
    expect(columns["tags"].type).toBe("TEXT");
    expect(columns["tags"].notnull).toBe(1);

    expect(columns["created_at"]).toBeDefined();
    expect(columns["created_at"].type).toBe("TEXT");
    expect(columns["created_at"].notnull).toBe(1);

    expect(columns["updated_at"]).toBeDefined();
    expect(columns["updated_at"].type).toBe("TEXT");
    expect(columns["updated_at"].notnull).toBe(1);

    db.close();
  });

  it("is idempotent — running migrations twice does not throw", () => {
    const db = openDb(":memory:");
    expect(() => openDb(":memory:")).not.toThrow();
    db.close();
  });
});
