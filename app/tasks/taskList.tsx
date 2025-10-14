"use client";

interface Task {
  id: number;
  title: string;
  description: string;
}

import { useState } from "react";

export default function NoteList({
  tasks,
  onChanged,
}: {
  tasks: Task[];
  onChanged?: () => void;
}) {
  const [editingNote, setEditingNote] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function seeOneTask(id: number) {
    const res = await fetch(`/tasks/${id}`, { method: "GET" });
    const task = await res.json();
  }

  async function handleDelete(id: number) {
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    onChanged?.();
  }

  function openEdit(task: Task) {
    setEditingNote(task);
    setTitle(task.title);
    setContent(task.description);
  }

  async function handleUpdate(id: number, title: string, description: string) {
    await fetch(`/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    });
    setEditingNote(null);
    onChanged?.();
  }

  function handleCancel() {
    setEditingNote(null);
  }

  if (!tasks.length) {
    return <p className="text-gray-500">Hetkel pole sul taske kirjas</p>;
  }

  return (
    <>
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
              onClick={() => openEdit(task)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-700 font-medium ml-3"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      {editingNote && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Note</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mb-4 h-16"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mb-4 h-32"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleCancel()}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editingNote.id, title, content)}
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
