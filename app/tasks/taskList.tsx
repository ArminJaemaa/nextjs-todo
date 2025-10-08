"use client";

export default function NoteList({
  tasks,
  onChanged,
}: {
  tasks: any[];
  onChanged?: () => void;
}) {
  async function handleDelete(id: number) {
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    onChanged?.();
  }

  if (!tasks.length) {
    return <p className="text-gray-500">Hetkel pole sul taske kirjas</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold text-lg">{task.title}</h3>
          </div>
          <div>
            <h4>{task.description}</h4>
          </div>
          <button
            onClick={() => handleDelete(task.id)}
            className="text-red-500 hover:text-red-700 font-medium ml-3"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
