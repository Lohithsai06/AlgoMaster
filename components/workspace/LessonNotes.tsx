"use client";

import { useState } from "react";
import { StickyNote, Save, Trash2 } from "lucide-react";
import { useWorkspaceStore } from "@/lib/stores/useWorkspaceStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

/* ============================================================
   LessonNotes — Per-lesson note editor. Saves to localStorage
   via the workspace store. Uses key-based remount to reset
   content when lessonId changes.
   ============================================================ */

interface LessonNotesProps {
  lessonId: string;
}

export function LessonNotes({ lessonId }: LessonNotesProps) {
  const getNote = useWorkspaceStore((s) => s.getNote);
  const saveNote = useWorkspaceStore((s) => s.saveNote);
  const deleteNote = useWorkspaceStore((s) => s.deleteNote);
  const initialContent = getNote(lessonId)?.content || "";

  return (
    <NoteEditor
      key={lessonId}
      lessonId={lessonId}
      initialContent={initialContent}
      onSave={(content) => saveNote(lessonId, content)}
      onDelete={() => deleteNote(lessonId)}
    />
  );
}

interface NoteEditorProps {
  lessonId: string;
  initialContent: string;
  onSave: (content: string) => void;
  onDelete: () => void;
}

function NoteEditor({ initialContent, onSave, onDelete }: NoteEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleDelete() {
    onDelete();
    setContent("");
  }

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-accent-500" />
          <h3 className="text-subheading font-semibold">My Notes</h3>
        </div>
        {saved && (
          <span className="text-caption font-medium text-success-500">Saved!</span>
        )}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your notes for this lesson here..."
        rows={5}
        className="w-full rounded-lg border border-border bg-background-subtle px-3 py-2 text-body outline-none transition-all focus:border-primary-500"
      />
      <div className="mt-3 flex items-center gap-2">
        <Button onClick={handleSave} size="sm" disabled={!content}>
          <Save className="h-3.5 w-3.5" />
          Save Note
        </Button>
        {content && (
          <Button onClick={handleDelete} size="sm" variant="ghost">
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}
