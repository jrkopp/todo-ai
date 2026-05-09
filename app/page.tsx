import { getDb } from "@/lib/db";
import { listTasks } from "@/lib/repository/tasks";
import { CreateTaskForm } from "@/components/create-task-form";

export default function ListViewPage() {
  const tasks = listTasks(getDb());

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">List View</h1>
        <CreateTaskForm />
      </div>

      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No tasks yet. Create one to get started.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="py-2 pr-4 font-medium">Title</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Priority</th>
              <th className="py-2 pr-4 font-medium">Due Date</th>
              <th className="py-2 font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-border">
                <td className="py-2 pr-4">{task.title}</td>
                <td className="py-2 pr-4 capitalize">{task.status.replace("_", " ")}</td>
                <td className="py-2 pr-4 capitalize">{task.priority}</td>
                <td className="py-2 pr-4">{task.dueDate ?? "—"}</td>
                <td className="py-2">{task.tags.join(", ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
