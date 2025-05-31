"use client";

import { useState, useEffect } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function InfoSidebar() {
  // Weather state
  const [weather, setWeather] = useState({
    temperature: "29°C",
    location: "Singapore",
    condition: "局部多云",
    coordinates: "1.28° L 103.85°",
  });

  // Todo items state
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    { id: "1", text: "todo aaaa", completed: false },
    { id: "2", text: "todo bbb", completed: false },
    { id: "3", text: "xxx 生日", completed: false },
    { id: "4", text: "xx卡还款", completed: false },
    { id: "5", text: "xxxx", completed: false },
  ]);

  // In a real implementation, we would fetch weather data and todo items from an API
  useEffect(() => {
    // This would be replaced with actual API calls in a real implementation
    // Example:
    // async function fetchWeatherData() {
    //   const response = await fetch('/api/weather');
    //   const data = await response.json();
    //   setWeather(data);
    // }
    // 
    // async function fetchTodoItems() {
    //   const response = await fetch('/api/todos');
    //   const data = await response.json();
    //   setTodoItems(data);
    // }
    //
    // fetchWeatherData();
    // fetchTodoItems();
  }, []);

  const toggleTodoCompleted = (id: string) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    // In a real implementation, we would update the todo item in the database
    // Example:
    // async function updateTodoItem(id, completed) {
    //   await fetch(`/api/todos/${id}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ completed }),
    //   });
    // }
    //
    // updateTodoItem(id, !todoItems.find(item => item.id === id)?.completed);
  };

  return (
    <div className="flex h-full flex-col p-4">
      {/* Weather Widget */}
      <div className="mb-6 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">{weather.temperature}</div>
          <div className="text-sm text-muted-foreground">局部多云</div>
        </div>
        <div className="mt-2 text-sm">{weather.location}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {weather.coordinates}
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
