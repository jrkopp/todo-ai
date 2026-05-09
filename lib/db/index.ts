import Database from "better-sqlite3";

const MIGRATIONS = `
  CREATE TABLE IF NOT EXISTS tasks (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT,
    due_date    TEXT,
    priority    TEXT NOT NULL,
    status      TEXT NOT NULL,
    tags        TEXT NOT NULL,
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
  );
`;

function runMigrations(db: Database.Database): void {
  db.exec(MIGRATIONS);
}

/** Opens a database at the given path and runs migrations. Use `:memory:` for tests. */
export function openDb(path: string): Database.Database {
  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  runMigrations(db);
  return db;
}

let _db: Database.Database | null = null;

/** Returns the application singleton database, initialised on first call. */
export function getDb(): Database.Database {
  if (!_db) {
    const path = process.env.DATABASE_PATH ?? "tasks.db";
    _db = openDb(path);
  }
  return _db;
}
