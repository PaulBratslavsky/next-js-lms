import type { StrapiUserMeProps } from "@/types";
import Link from "next/link";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
export function UserNavButton({ user }: Readonly<StrapiUserMeProps>) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {user?.username}
    <Button asChild className="w-8 h-8 rounded-full">
      <Link href="/dashboard" className="cursor-pointer">
        {user?.username[0].toLocaleUpperCase()}
      </Link>
    </Button>
    <Link href="/logout" className="cursor-pointer">
      <ArrowLeftStartOnRectangleIcon className="ml-2 h-6 w-6 text-muted-foreground" />
    </Link>
  </div>
  )
}
