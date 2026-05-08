# Todo AI

A personal task management application running locally at localhost. No cloud backend — all data is persisted in a SQLite file on disk via Next.js Server Actions.

## Language

**Task**:
The core unit of work a user creates, tracks, and completes.
_Avoid_: Issue, item, todo (as a noun for the work unit)

**Status**:
The current state of a Task. One of: `Todo`, `In Progress`, `Done`, `Cancelled`. Tasks can move freely between any status.
_Avoid_: Stage, phase, column (as a synonym for status)

**Priority**:
The urgency level of a Task. One of: `Low`, `Medium`, `High`.
_Avoid_: Severity, importance

**Tag**:
A free-form text label assigned to a Task at creation or edit time. Created on the fly — no managed tag list.
_Avoid_: Label, category

**List View**:
The primary view of the application. Shows all Tasks in a filterable, sortable table. Supports filtering by status, priority, and tag; sorting by due date and priority.
_Avoid_: Table view, default view

**Kanban View**:
A secondary tab showing Tasks arranged in four columns — one per Status. Drag-and-drop between columns changes a Task's Status. Tasks cannot be reordered within a column.
_Avoid_: Board view, kanban board (lowercase)

## Relationships

- A **Task** has exactly one **Status** and exactly one **Priority**
- A **Task** has zero or more **Tags**
- **List View** and **Kanban View** are two presentations of the same set of Tasks

## Data model

A Task carries: `title`, `description`, `dueDate` (date only, optional), `priority`, `status`, `tags`, `createdAt` (system-set), `updatedAt` (system-set).

## Example dialogue

> **Dev:** "When a user drags a card in the **Kanban View**, what changes?"
> **Domain expert:** "The **Task's Status** changes — that's all. The order of cards within a column is not persisted."

> **Dev:** "Can I filter the **Kanban View** by **Tag**?"
> **Domain expert:** "No — filtering lives in the **List View**. The **Kanban View** always shows all Tasks grouped by **Status**."

## Flagged ambiguities

- "task" and "issue" both appeared in the brief — resolved: **Task** is canonical.
- "pending / in-progress / completed" appeared in the brief — resolved: **Todo / In Progress / Done / Cancelled** are the four canonical Status values.
- "free standing / no web server" in the brief — resolved: the app runs at localhost; "no web server" means no cloud/hosted backend.



