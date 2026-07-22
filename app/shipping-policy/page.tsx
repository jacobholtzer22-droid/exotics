import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Shipping methods, timelines, and restrictions for Exotics orders.',
}

export default function ShippingPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Policies" title="Shipping Policy" />
      <section className="container-page max-w-3xl space-y-6 py-16 text-sm leading-relaxed text-smoke">
        <p>
          This Shipping Policy outlines the terms and conditions governing the shipment of
          products purchased through our online store. By placing an order with us, you agree
          to the terms outlined in this policy.
        </p>
        <div className="card-soft space-y-4 p-6">
          <div>
            <h2 className="font-display text-base font-bold text-bone">Standard Shipping</h2>
            <p className="mt-1">Delivery time: typically 5 to 7 business days. Cost is based on the weight of the order and destination.</p>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-bone">Express Shipping</h2>
            <p className="mt-1">Delivery time: typically 2 to 3 business days. Higher than standard shipping, based on weight and destination.</p>
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-bone">Overnight Shipping</h2>
            <p className="mt-1">Next business day delivery for orders placed before 2 PM. Premium rate.</p>
          </div>
        </div>
        <p>
          Shipping costs are determined by the weight and size of your order, the delivery
          destination, and the shipping method you choose. We confirm exact shipping costs
          with you when we finalize your order.
        </p>
        <p>
          While we make every effort to ensure your order is delivered within the estimated
          time frame, delivery times are estimates and not guarantees. Factors such as
          weather, carrier delays, and holidays can affect delivery.
        </p>
        <div className="card-soft border-red-500/30 p-6">
          <h2 className="font-display text-base font-bold text-bone">THCa Shipping Restrictions</h2>
          <p className="mt-2">
            {site.compliance.shippingNote} Restricted states: {site.restrictedStates.join(', ')}.
          </p>
        </div>
      </section>
    </>
  )
}
