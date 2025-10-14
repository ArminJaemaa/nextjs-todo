import { createClient } from "@/lib/supabase/server";

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
