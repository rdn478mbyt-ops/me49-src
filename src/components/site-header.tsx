"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { BrandMark } from "@/components/brand-mark"
import { LinkButton } from "@/components/link-button"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { nav, site } from "@/config/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="h-1 bg-me-gold" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link href="/" className="min-w-0 shrink">
          <BrandMark priority />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 lg:flex"
        >
          {nav.map((item) => {
            const current =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "px-2.5 py-1.5 text-sm font-medium transition-colors",
                  current
                    ? "text-me-navy underline decoration-me-gold decoration-2 underline-offset-4"
                    : "text-foreground/80 hover:text-me-navy"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton
            href={site.registration.path}
            size="default"
            className="max-w-[12rem] sm:max-w-none"
          >
            <span className="sm:hidden">S&apos;inscrire</span>
            <span className="hidden sm:inline">{site.registration.cta}</span>
          </LinkButton>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Ouvrir le menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,22rem)] bg-white">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Menu mobile">
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="border-b border-border py-3 text-base font-medium text-foreground"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <Link
                      href={site.registration.path}
                      className="mt-4 bg-me-navy px-4 py-3 text-center text-sm font-medium text-white"
                    />
                  }
                >
                  {site.registration.cta}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
