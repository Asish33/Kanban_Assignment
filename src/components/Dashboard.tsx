import { useRef, forwardRef } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTaskStore } from "@/store/TaskStore";
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
import { Label } from "@/components/ui/label";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { Input } from "@/components/ui/input";

export function DashBoard() {
 const taskNameRef = useRef<HTMLInputElement | null>(null);
 const descriptionRef = useRef<HTMLInputElement | null>(null);

  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const searchText = useTaskStore((state) => state.searchText);
  const setSearchText = useTaskStore((state) => state.setSearchText);

  function addTask() {
    if (!taskNameRef.current?.value) return;
    if (!descriptionRef.current?.value) {
      alert("Please add a description.");
      return;
    }
    const updatedTasks = [
      ...tasks,
      {
        id: `task-${tasks.length + 1}`,
        text: taskNameRef.current.value,
        description: descriptionRef.current.value,
        column: "todo",
      },
    ];
    setTasks(updatedTasks);

    taskNameRef.current.value = "";
    descriptionRef.current.value = "";
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
    <div className="bg-[#1F1C2C] p-5">
      <PlaceholdersAndVanishInput
        className="mb-5"
        placeholders={["string", "enter"]}
        onChange={(e) => setSearchText(e.target.value)}
        onSubmit={() => setSearchText("")}
      />

      <Dialog>
        <DialogTrigger className="text-white">
          <Button className="p-5 mb-2">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="m-2">Add New Task</DialogTitle>
            <DialogDescription>
              <Label htmlFor="taskName" className="text-black">
                Task Name
              </Label>
              <Input
                ref={taskNameRef}
                type="text"
                id="taskName"
                className="m-2"
              />

              <Label htmlFor="taskDescription" className="text-black">
                Task Description
              </Label>
              <Input
                ref={descriptionRef}
                type="text"
                id="taskDescription"
                className="m-2"
              />

              <DialogClose asChild>
                <Button
                  type="button"
                  className="place-self-end m-2 w-fit"
                  onClick={addTask}
                >
                  Submit
                </Button>
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {["todo", "peer-review", "in-progress", "done"].map((column) => (
            <DroppableColumn
              key={column}
              id={column}
              className="flex-1  min-h-screen"
            >
              <h2 className="text-xl text-white font-semibold mb-2 capitalize">
                {column.replace("-", " ")}
              </h2>
              {tasks
                .filter((task) => task.column === column)
                .filter((task) =>
                  task.text.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((task) => (
                  <DraggableCard
                    className="bg-[#ECF0F1]"
                    key={task.id}
                    id={task.id}
                  >
                    <div className="font-bold">{task.text}</div>
                    <div>{task.description}</div>
                  </DraggableCard>
                ))}
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
