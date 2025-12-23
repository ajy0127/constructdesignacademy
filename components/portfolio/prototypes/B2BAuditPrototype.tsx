'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';

type AuditScreen = 'queue' | 'case';

type AuditCase = {
  id: string;
  title: string;
  company: string;
  risk: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In review' | 'Resolved';
};

export default function B2BAuditPrototype() {
  const [screen, setScreen] = useState<AuditScreen>('queue');
  const [activeId, setActiveId] = useState<string>('AU-1842');
  const [highRiskOnly, setHighRiskOnly] = useState(false);
  const [checks, setChecks] = useState({
    evidence: true,
    notes: false,
    approval: false,
  });

  const cases: AuditCase[] = useMemo(
    () => [
      { id: 'AU-1842', title: 'Sales tax variance', company: 'Northwind', risk: 'High', status: 'In review' },
      { id: 'AU-1799', title: 'Exemption validation', company: 'Acme Co', risk: 'Medium', status: 'Open' },
      { id: 'AU-1731', title: 'Filing mismatch', company: 'Umbrella', risk: 'High', status: 'Open' },
      { id: 'AU-1688', title: 'Invoice sampling', company: 'Globex', risk: 'Low', status: 'Resolved' },
    ],
    []
  );

  const visible = useMemo(() => {
    if (!highRiskOnly) return cases;
    return cases.filter((c) => c.risk === 'High');
  }, [cases, highRiskOnly]);

  const active = useMemo(() => cases.find((c) => c.id === activeId) ?? cases[0], [cases, activeId]);

  return (
    <div className="absolute inset-0">
      <div className="h-full w-full bg-bg-primary">
        <div className="h-12 px-4 flex items-center justify-between border-b border-text-base/10">
          <div className="text-xs uppercase tracking-widest text-text-base/60 font-label">
            B2B Audit Prototype
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScreen('queue')}
              className={clsx(
                'text-xs uppercase tracking-widest font-label px-3 py-2 rounded-md border transition-colors',
                screen === 'queue'
                  ? 'border-cta-brass text-cta-brass'
                  : 'border-text-base/15 text-text-base/60 hover:text-text-base'
              )}
              aria-pressed={screen === 'queue'}
            >
              Queue
            </button>
            <button
              type="button"
              onClick={() => setScreen('case')}
              className={clsx(
                'text-xs uppercase tracking-widest font-label px-3 py-2 rounded-md border transition-colors',
                screen === 'case'
                  ? 'border-cta-brass text-cta-brass'
                  : 'border-text-base/15 text-text-base/60 hover:text-text-base'
              )}
              aria-pressed={screen === 'case'}
            >
              Case
            </button>
          </div>
        </div>

        {screen === 'queue' ? (
          <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-xl border border-text-base/10 bg-bg-primary">
              <div className="p-4 border-b border-text-base/10 flex items-start justify-between gap-4">
                <div>
                  <div className="font-serif text-lg text-text-base">Audit queue</div>
                  <div className="mt-1 text-sm text-text-base/60">
                    Review and open a case.
                  </div>
                </div>
                <label className="flex items-center gap-3 text-sm text-text-base/70">
                  <input
                    type="checkbox"
                    checked={highRiskOnly}
                    onChange={(e) => setHighRiskOnly(e.target.checked)}
                    className="h-4 w-4 accent-cta-brass"
                  />
                  High risk only
                </label>
              </div>

              <div className="divide-y divide-text-base/10">
                {visible.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setActiveId(c.id);
                      setScreen('case');
                    }}
                    className={clsx(
                      'w-full text-left px-4 py-4 hover:bg-bg-primary/60 transition-colors',
                      c.id === activeId ? 'bg-bg-primary/60' : ''
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-serif text-base text-text-base truncate">{c.title}</div>
                        <div className="mt-1 text-sm text-text-base/60 truncate">
                          {c.company} · {c.id}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={clsx(
                            'inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest font-label',
                            c.risk === 'High'
                              ? 'border-red-400/30 text-red-300'
                              : c.risk === 'Medium'
                                ? 'border-amber-400/30 text-amber-300'
                                : 'border-text-base/15 text-text-base/60'
                          )}
                        >
                          {c.risk} risk
                        </div>
                        <div className="mt-2 text-xs uppercase tracking-widest text-text-base/50 font-label">
                          {c.status}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-text-base/10 bg-bg-primary">
              <div className="p-4 border-b border-text-base/10">
                <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">Selected</div>
                <div className="mt-2 font-serif text-lg text-text-base">{active.id}</div>
                <div className="mt-1 text-sm text-text-base/60">{active.company}</div>
              </div>
              <div className="p-4 space-y-3">
                <button type="button" onClick={() => setScreen('case')} className="cta-button w-full text-center">
                  Open case
                </button>
                <button
                  type="button"
                  onClick={() => setChecks({ evidence: true, notes: false, approval: false })}
                  className="w-full rounded-lg border border-text-base/15 px-4 py-3 text-left text-sm text-text-base/70 hover:border-text-base/30"
                >
                  Reset checklist
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="rounded-xl border border-text-base/10 bg-bg-primary">
              <div className="p-4 border-b border-text-base/10 flex items-start justify-between gap-4">
                <div>
                  <div className="font-serif text-lg text-text-base">{active.title}</div>
                  <div className="mt-1 text-sm text-text-base/60">
                    {active.company} · {active.id}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setScreen('queue')}
                  className="text-xs uppercase tracking-widest font-label px-3 py-2 rounded-md border border-text-base/15 text-text-base/60 hover:text-text-base"
                >
                  Back
                </button>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-text-base/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">Checklist</div>
                  <div className="mt-3 space-y-2 text-sm text-text-base/70">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checks.evidence}
                        onChange={(e) => setChecks((p) => ({ ...p, evidence: e.target.checked }))}
                        className="h-4 w-4 accent-cta-brass"
                      />
                      Evidence attached
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checks.notes}
                        onChange={(e) => setChecks((p) => ({ ...p, notes: e.target.checked }))}
                        className="h-4 w-4 accent-cta-brass"
                      />
                      Notes reviewed
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checks.approval}
                        onChange={(e) => setChecks((p) => ({ ...p, approval: e.target.checked }))}
                        className="h-4 w-4 accent-cta-brass"
                      />
                      Approval requested
                    </label>
                  </div>
                </div>

                <div className="rounded-xl border border-text-base/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">Actions</div>
                  <div className="mt-3 text-sm text-text-base/70 leading-relaxed">
                    Toggle checklist items to simulate evidence gathering and approvals.
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChecks({ evidence: true, notes: true, approval: true })}
                      className="cta-button"
                    >
                      Complete
                    </button>
                    <button
                      type="button"
                      onClick={() => setChecks({ evidence: true, notes: false, approval: false })}
                      className="rounded-md border border-text-base/15 px-4 py-2 text-xs uppercase tracking-widest font-label text-text-base/60 hover:text-text-base"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between gap-4">
                  <div className="text-sm text-text-base/60">
                    Case status: <span className="text-text-base/80">{active.status}</span>
                  </div>
                  <button type="button" onClick={() => setScreen('queue')} className="cta-button">
                    Back to queue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
