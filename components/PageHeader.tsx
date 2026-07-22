export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <section className="border-b border-moss bg-panel">
      <div className="container-page py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-display mt-3 max-w-3xl text-3xl text-bone sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl leading-relaxed text-smoke">{subtitle}</p>}
      </div>
    </section>
  )
}
