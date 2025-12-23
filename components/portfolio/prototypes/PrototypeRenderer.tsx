'use client';

import B2BAuditPrototype from './B2BAuditPrototype';
import TaxAdvantageTaxPrototype from './TaxAdvantageTaxPrototype';

export default function PrototypeRenderer({
  prototypeId,
}: {
  prototypeId: string;
}) {
  if (prototypeId === 'b2b-tax') return <TaxAdvantageTaxPrototype />;
  if (prototypeId === 'b2b-audit') return <B2BAuditPrototype />;

  return (
    <div className="w-full h-full flex items-center justify-center text-text-base/50">
      Prototype coming soon.
    </div>
  );
}
