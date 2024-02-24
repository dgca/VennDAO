import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { buttonVariants, Text } from "ui-kit";
import { cn } from "ui-utils";

import { MainLayout } from "@/components/Layouts/MainLayout";

const sidebarNavItems = [
  {
    title: "Orders",
    href: "/dao/orders",
  },
  {
    title: "Products",
    href: "/dao/products",
  },
  {
    title: "Proposals",
    href: "/dao/proposals",
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const router = useRouter();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            router.pathname.startsWith(item.href)
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function DaoLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout includeFooter={false}>
      <div className="flex flex-grow flex-col lg:flex-row gap-4 min-h-full">
        <aside className="p-4 lg:w-80 lg:border-r">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="container px-4 py-12 max-w-6xl mx-auto">{children}</div>
      </div>
    </MainLayout>
  );
}
