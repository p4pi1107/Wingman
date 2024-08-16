import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signout } from "@/app/login/actions";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-[#fccc9c] backdrop-blur supports-[backdrop-filter]:bg-'[#fccc9c]/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold" style={{fontSize: '24px'}}>Wingman</span>
          </a>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <form action={signout} className="flex items-center gap-2">
                <p>{user.email}</p>
                <Button className="shadow-lg">Sign Out</Button>
            </form>
          ) : (
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          )}
        </div>
      </div>
    </header>
  );
}
