"use client";

import { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function InfoSidebar() {
  // Mock weather data
  const weatherData = {
    temperature: "29°C",
    location: "Singapore",
    condition: "局部多云",
    coordinates: "1.28° L 103.85°",
  };

  // Mock todo items
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    { id: "1", text: "todo aaaa", completed: false },
    { id: "2", text: "todo bbb", completed: false },
    { id: "3", text: "xxx 生日", completed: false },
    { id: "4", text: "xx卡还款", completed: false },
    { id: "5", text: "xxxx", completed: false },
  ]);

  const toggleTodoCompleted = (id: string) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="flex h-full flex-col p-4">
      {/* Weather Widget */}
      <div className="mb-6 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">{weatherData.temperature}</div>
          <div className="text-sm text-muted-foreground">{weatherData.condition}</div>
        </div>
        <div className="mt-2 text-sm">{weatherData.location}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {weatherData.coordinates}
        </div>
      </div>

      {/* Todo List */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-3 font-medium">今天的提醒：</h3>
        <ul className="space-y-2">
          {todoItems.map((item, index) => (
            <li key={item.id} className="flex items-center gap-2">
              <span className="font-medium">{index + 1}.</span>
              <span
                className={`flex-1 text-sm ${
                  item.completed ? "text-muted-foreground line-through" : ""
                }`}
                onClick={() => toggleTodoCompleted(item.id)}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
