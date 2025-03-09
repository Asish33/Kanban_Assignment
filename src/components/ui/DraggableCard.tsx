import { useDraggable } from "@dnd-kit/core";

interface DraggableCardProps {
  id: string;
  children: React.ReactNode;
  className?:string
}

export function DraggableCard({ id, children,className}: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${
        className
      } p-4 rounded-lg shadow-md cursor-grab`}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
