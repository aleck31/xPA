"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PlusCircle,
  Calendar as CalendarIcon,
  Clock,
  Tag,
  CheckCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ModuleSelector from "@/components/shared/ModuleSelector";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  color: string;
}

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  dayOfWeek: string;
  dayOfWeekZh: string;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

interface CalendarViewProps {
  moduleSelector?: ReactNode;
}

export default function CalendarView({ moduleSelector }: CalendarViewProps = {}) {
  const [viewMode, setViewMode] = useState<"week" | "month" | "year">("month");
  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  // Mock calendar data
  const calendarDays: CalendarDay[] = generateCalendarDays(currentMonth, currentYear);
  
  // Mock project calendars
  const projectCalendars = [
    { id: "1", name: "My Default Candar", color: "green", checked: true },
    { id: "2", name: "Birthdays", color: "blue", checked: true },
    { id: "3", name: "Work task A", color: "red", checked: true },
    { id: "4", name: "Holidays in China", color: "yellow", checked: true },
    { id: "5", name: "Phases of the Moon", color: "purple", checked: true },
  ];

  function generateCalendarDays(month: number, year: number): CalendarDay[] {
    const days: CalendarDay[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Add days from previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = prevMonthDays - firstDayOfMonth + i + 1;
      const prevMonth = month - 1 < 0 ? 11 : month - 1;
      const prevYear = prevMonth === 11 ? year - 1 : year;
      days.push({
        date: day,
        month: prevMonth,
        year: prevYear,
        dayOfWeek: getDayOfWeek(new Date(prevYear, prevMonth, day).getDay()),
        dayOfWeekZh: getDayOfWeekZh(new Date(prevYear, prevMonth, day).getDay()),
        isCurrentMonth: false,
        events: [],
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      days.push({
        date: i,
        month,
        year,
        dayOfWeek: getDayOfWeek(dayOfWeek),
        dayOfWeekZh: getDayOfWeekZh(dayOfWeek),
        isCurrentMonth: true,
        events: getEventsForDate(i, month, year),
      });
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonth = month + 1 > 11 ? 0 : month + 1;
      const nextYear = nextMonth === 0 ? year + 1 : year;
      days.push({
        date: i,
        month: nextMonth,
        year: nextYear,
        dayOfWeek: getDayOfWeek(new Date(nextYear, nextMonth, i).getDay()),
        dayOfWeekZh: getDayOfWeekZh(new Date(nextYear, nextMonth, i).getDay()),
        isCurrentMonth: false,
        events: [],
      });
    }
    
    return days;
  }
  
  function getDayOfWeek(day: number): string {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[day];
  }
  
  function getDayOfWeekZh(day: number): string {
    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return days[day];
  }
  
  function getEventsForDate(date: number, month: number, year: number): CalendarEvent[] {
    // Mock events data
    const allEvents: CalendarEvent[] = [
      { id: "1", title: "Qing Ming Jie holiday", date: "2025-04-04", color: "bg-yellow-400" },
      { id: "2", title: "Qing Ming Jie holiday", date: "2025-04-05", color: "bg-yellow-400" },
      { id: "3", title: "Qing Ming Jie holiday", date: "2025-04-06", color: "bg-yellow-400" },
      { id: "4", title: "First quarter 10:15", date: "2025-04-05", color: "bg-purple-400" },
      { id: "5", title: "Full moon 08:22", date: "2025-04-13", color: "bg-purple-400" },
      { id: "6", title: "Last quarter 09:36", date: "2025-04-21", color: "bg-purple-400" },
      { id: "7", title: "New moon 03:31", date: "2025-04-28", color: "bg-purple-400" },
      { id: "8", title: "Labour Day", date: "2025-05-01", color: "bg-yellow-400" },
      { id: "9", title: "Labour Day Holiday", date: "2025-05-02", color: "bg-yellow-400" },
      { id: "10", title: "Labour Day Holiday", date: "2025-05-03", color: "bg-yellow-400" },
    ];
    
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return allEvents.filter(event => event.date === dateStr);
  }
  
  function getMonthName(month: number): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month];
  }
  
  function getMonthNameZh(month: number): string {
    const months = [
      "一月", "二月", "三月", "四月", "五月", "六月",
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ];
    return months[month];
  }
  
  function navigateMonth(direction: "prev" | "next") {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  }

  return (
    <div className="flex h-full w-full">
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h1 className="text-xl font-semibold">Calendar</h1>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-auto">
            {/* View Options and Month Navigation */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("month")}
                >
                  Month
                </Button>
                <Button
                  variant={viewMode === "year" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("year")}
                >
                  Year
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigateMonth("prev")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigateMonth("next")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {getMonthName(currentMonth)} {currentYear}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    农历{getMonthNameZh(currentMonth)} - {getMonthNameZh((currentMonth + 1) % 12)}
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid flex-1 grid-cols-7 overflow-auto">
              {/* Day Headers */}
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div
                  key={day}
                  className="border-b border-r p-2 text-center text-sm font-medium"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`relative border-b border-r p-2 ${
                    !day.isCurrentMonth ? "bg-gray-50" : ""
                  } ${
                    new Date().getDate() === day.date &&
                    new Date().getMonth() === day.month &&
                    new Date().getFullYear() === day.year
                      ? "bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {day.date} {day.isCurrentMonth ? "" : `(${day.month + 1}月)`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {day.dayOfWeekZh}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        className={`rounded px-2 py-1 text-xs ${event.color}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Project Calendars */}
          <div className="w-64 border-l p-4">
            <h3 className="mb-4 font-medium">Project Calendars</h3>
            <div className="space-y-2">
              {projectCalendars.map((calendar) => (
                <div key={calendar.id} className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded border ${
                      calendar.checked ? `bg-${calendar.color}-500` : ""
                    }`}
                  >
                    {calendar.checked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-white"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{calendar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
