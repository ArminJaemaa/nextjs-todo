import { createClient } from "@/lib/supabase/server";
import TaskForm from "./taskForm";
import TaskList from "./taskList";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const supabase = await createClient();
  const { data: tasks } = await supabase.from("tasks").select("*");

  async function refreshTasks() {
    "use server";
    revalidatePath("/notes");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My tasks:</h1>
      <TaskForm onAdded={refreshTasks} />
      <TaskList tasks={tasks || []} onChanged={refreshTasks} />
    </div>
  );
}
