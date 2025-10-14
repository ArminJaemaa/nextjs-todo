import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: number } }
) {
  const supabase = await createClient();
  const id = (await params).id;
  const fullTask = await req.json();

  const { error } = await supabase
    .from("tasks")
    .update({ title: fullTask.title, description: fullTask.description })
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const supabase = await createClient();

  const id = (await params).id;
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const supabase = await createClient();
  const id = (await params).id;
  const { error, data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  console.log(task);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(task), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
