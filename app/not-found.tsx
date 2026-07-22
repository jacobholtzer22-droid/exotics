import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-3 text-4xl text-bone">Nothing here but smoke</h1>
      <p className="mt-3 text-smoke">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/shop" className="btn-primary mt-8">
        Back to the shop
      </Link>
    </div>
  )
}
