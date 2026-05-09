"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";
import { createTask, type CreateTaskState } from "@/app/actions/tasks";

const initialState: CreateTaskState = {};

export function CreateTaskForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createTask, initialState);
  const prevSuccess = useRef(false);

  useEffect(() => {
    if (state.success && !prevSuccess.current) {
      setOpen(false);
    }
    prevSuccess.current = !!state.success;
  }, [state.success]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>+ New Task</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-background border border-border p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">New Task</Dialog.Title>

          <form action={formAction} className="flex flex-col gap-4">
            {state.errors?.general && (
              <p className="text-sm text-destructive">{state.errors.general}</p>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-ring"
                aria-invalid={!!state.errors?.title}
              />
              {state.errors?.title && (
                <p className="text-xs text-destructive">{state.errors.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority <span className="text-destructive">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                defaultValue="medium"
                className="border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-ring"
                aria-invalid={!!state.errors?.priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {state.errors?.priority && (
                <p className="text-xs text-destructive">{state.errors.priority}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-ring resize-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                className="border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-ring"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="e.g. dev, urgent, frontend"
                className="border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-ring"
              />
              <p className="text-xs text-muted-foreground">Comma-separated list of tags</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating…" : "Create Task"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
