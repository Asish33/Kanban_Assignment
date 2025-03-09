import { useRef } from "react";
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
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function DashBoard() {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
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
      }, // adding new task intially to todo column
    ];
    setTasks(updatedTasks);

    taskNameRef.current.value = "";
    descriptionRef.current.value = "";
    const string = JSON.stringify(updatedTasks);
    console.log(JSON.parse(string));
    localStorage.setItem("tasks" , string);
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
    <div className="bg-red-200">
      <PlaceholdersAndVanishInput
        placeholders={["string", "enter"]}
        onChange={(e) => setSearchText(e.target.value)}
        onSubmit={() => setSearchText("")}
      ></PlaceholdersAndVanishInput>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {["todo", "peer-Review", "in-progress", "done"].map((column) => (
            <DroppableColumn
              key={column}
              id={column}
              className="flex-1 min-h-screen"
            >
              {" "}
              {/* rendering droppable columns */}
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {column.replace("-", " ")}
              </h2>
              {tasks
                .filter((task) => task.column === column)
                .filter((task) =>
                  task.text.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((task) => (
                  <DraggableCard key={task.id} id={task.id}>
                    {" "}
                    {/* rendering task cards */}
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
              <Label htmlFor="taskName">Task Name</Label>
              <Input ref={taskNameRef} type="text" id="taskName" />

              <Label htmlFor="taskDescription">Task Description</Label>
              <Input ref={descriptionRef} type="text" id="taskDescription" />

              <DialogClose asChild>
                <Button type="button" onClick={addTask}>
                  Submit
                </Button>
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
