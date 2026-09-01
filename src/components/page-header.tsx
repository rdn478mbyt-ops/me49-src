import { Container, Kicker } from "@/components/layout"

export function PageHeader({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <header className="border-b border-border bg-white">
      <Container className="py-14 sm:py-20">
        <Kicker>{kicker}</Kicker>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        {children ? (
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {children}
          </div>
        ) : null}
      </Container>
    </header>
  )
}
