import TestList from "@/components/test-list";
import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Your tests</h1>
      <Separator />
      <TestList />
      </div>
    </div>
  );
}
