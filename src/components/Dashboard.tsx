import { useRef } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTaskStore } from "@/store/Store";
import { DraggableCard } from "@/components/ui/DraggableCard";
import { DroppableColumn } from "@/components/ui/DroppableColumn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";



export function DashBoard() {
  const deatilsref = useRef<HTMLInputElement>(null);
  const descriptionRef=useRef<HTMLInputElement>(null);
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);

  function fun() {
    if (!deatilsref.current?.value) return;
    if (!descriptionRef.current?.value){
      alert("add description.")
      return;
    }
    setTasks([
      ...tasks,
      {
        id: `task-${tasks.length + 1}`,
        text: deatilsref.current.value,
        description: descriptionRef.current.value,
        column: "todo",
      },
    ]);

    deatilsref.current.value = ""; // Clearing Input Field after adding Tasks
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    setTasks(
      tasks.map((task) =>
        task.id === String(active.id)
          ? { ...task, column: String(over.id) }
          : task
      )
    );
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex w-full h-screen gap-4 p-4">
          {["todo", "peer-Review", "in-progress", "done"].map((column) => (
            <DroppableColumn
              key={column}
              id={column}
              className="flex-1 flex flex-col bg-gray-100 p-4 rounded-lg"
            >
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {column.replace("-", " ")}
              </h2>
              {tasks
                .filter((task) => task.column === column)
                .map((task) => (
                  <DraggableCard key={task.id} id={task.id}>
                    <div className="font-bold">{task.text}</div>
                    <div>{task.description}</div>
                  </DraggableCard>
                ))}
            </DroppableColumn>
          ))}
        </div>
      </DndContext>

      <Dialog>
        <DialogTrigger>Add Task</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-black" htmlFor="taskName">
                  Task Name
                </Label>
                <Input
                  ref={deatilsref}
                  type="text"
                  id="taskName"
                  placeholder="Enter task name"
                />
                <Label className="text-black" htmlFor="taskName">
                  Task Name
                </Label>
                <Input
                  ref={descriptionRef}
                  type="text"
                  id="taskName"
                  placeholder="Enter task name"
                />
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={fun}>
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
