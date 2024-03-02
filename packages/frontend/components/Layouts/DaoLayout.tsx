import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { buttonVariants } from "ui-kit";
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
    title: "Proposals 🔗",
    href: "https://www.tally.xyz/gov/venndao2",
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
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferer"
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
      <div className="flex flex-grow flex-col gap-4 h-full lg:flex-row">
        <aside className="p-4 max-h-full lg:w-80 lg:border-r">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="container px-4 py-12 max-w-6xl mx-auto overflow-auto">
          <div>{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
