import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const { title, description } = await request.json();

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, description, deleted: false }])
    .select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data[0], { status: 201 });
}
