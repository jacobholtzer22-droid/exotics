import type { Metadata } from 'next'
import Link from 'next/link'
import { FlaskConical } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { byCategory } from '@/lib/products'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Lab Results',
  description:
    'Third-party certificates of analysis (COAs) for every Exotics THCa strain, with published THC and delta-9 potency.',
}

export default function LabResultsPage() {
  const flower = byCategory('flower').sort((a, b) => (b.thc ?? 0) - (a.thc ?? 0))

  return (
    <>
      <PageHeader
        eyebrow="COAs"
        title="Lab results you can check"
        subtitle="Every strain is third-party tested. Potency published on every product, batch COAs available on request."
      />

      <section className="container-page py-16">
        <div className="card-soft mb-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-moss bg-ink text-bud">
            <FlaskConical className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-smoke">
            {site.compliance.farmBill} Need the certificate of analysis for a specific batch?
            Email{' '}
            <a href={`mailto:${site.emails.support}`} className="text-bud hover:underline">
              {site.emails.support}
            </a>{' '}
            with the strain name and we&apos;ll send it over.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-moss font-display text-xs uppercase tracking-wider text-smoke">
                <th className="py-3 pr-4">Strain</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">THC</th>
                <th className="py-3 pr-4">Delta-9</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {flower.map((p) => (
                <tr key={p.handle} className="border-b border-moss/50">
                  <td className="py-3 pr-4">
                    <Link
                      href={`/shop/${p.handle}`}
                      className="font-semibold text-bone hover:text-bud"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-smoke">{p.strainType ?? '—'}</td>
                  <td className="py-3 pr-4 font-semibold text-bud">
                    {p.thc !== null ? `${p.thc}%` : '—'}
                  </td>
                  <td className="py-3 pr-4 text-smoke">
                    {p.delta9 !== null ? `${p.delta9}%` : '—'}
                  </td>
                  <td className="py-3 text-smoke">
                    <span className="stat-pill text-bud">Compliant</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
