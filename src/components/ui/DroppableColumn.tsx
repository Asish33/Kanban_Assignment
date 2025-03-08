import { useDroppable } from "@dnd-kit/core";

interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
  className?:string
}

export function DroppableColumn({ id, children,className }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 bg-gray-100 rounded-lg min-h-[200px] flex flex-col gap-4 ${className}`}
    >
      {children}
    </div>
  );
}
