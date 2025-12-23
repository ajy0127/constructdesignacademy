'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';

type TaxView = 'requests' | 'files' | 'aiBulk' | 'entities';

type RequestStatus = 'Open' | 'In review' | 'Complete';
type RequestType = 'Document' | 'Questionnaire' | 'Other';

type InfoRequest = {
  id: string;
  title: string;
  entity: string;
  status: RequestStatus;
  type: RequestType;
  due: string;
  owner: string;
};

type FileStatus = 'Uploaded' | 'Processing' | 'Verified';
type FileItem = {
  id: string;
  name: string;
  entity: string;
  kind: 'PDF' | 'XLSX' | 'CSV' | 'Image';
  status: FileStatus;
  uploaded: string;
};

type EntityItem = {
  id: string;
  name: string;
  ein: string;
  jurisdiction: string;
  active: boolean;
};

export default function B2BTaxPrototype() {
  const [view, setView] = useState<TaxView>('requests');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('ent-1');

  const [requestQuery, setRequestQuery] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [requestTypeFilter, setRequestTypeFilter] = useState<RequestType | 'All'>('All');
  const [requestEntityFilter, setRequestEntityFilter] = useState<string>('All');

  const [fileQuery, setFileQuery] = useState('');
  const [fileStatusFilter, setFileStatusFilter] = useState<FileStatus | 'All'>('All');
  const [fileEntityFilter, setFileEntityFilter] = useState<string>('All');

  const entities: EntityItem[] = useMemo(
    () => [
      { id: 'ent-1', name: 'Construct Holdings, Inc.', ein: '12-3456789', jurisdiction: 'CA', active: true },
      { id: 'ent-2', name: 'Construct Services LLC', ein: '98-7654321', jurisdiction: 'NY', active: true },
      { id: 'ent-3', name: 'Construct R&D Labs', ein: '55-2109876', jurisdiction: 'TX', active: false },
    ],
    []
  );

  const requests: InfoRequest[] = useMemo(
    () => [
      {
        id: 'req-1',
        title: '2025 Q2 - Sales tax support package',
        entity: 'Construct Holdings, Inc.',
        status: 'Open',
        type: 'Document',
        due: 'Aug 08',
        owner: 'You',
      },
      {
        id: 'req-2',
        title: 'Nexus questionnaire - updates',
        entity: 'Construct Services LLC',
        status: 'In review',
        type: 'Questionnaire',
        due: 'Aug 10',
        owner: 'Ops',
      },
      {
        id: 'req-3',
        title: 'Exemption certificates (new customers)',
        entity: 'Construct Holdings, Inc.',
        status: 'Open',
        type: 'Document',
        due: 'Aug 14',
        owner: 'Sales',
      },
      {
        id: 'req-4',
        title: 'Prior period adjustments - explanation',
        entity: 'Construct R&D Labs',
        status: 'Complete',
        type: 'Other',
        due: 'Aug 01',
        owner: 'Finance',
      },
    ],
    []
  );

  const files: FileItem[] = useMemo(
    () => [
      {
        id: 'file-1',
        name: 'Sales_Journal_Q2_2025.xlsx',
        entity: 'Construct Holdings, Inc.',
        kind: 'XLSX',
        status: 'Verified',
        uploaded: 'Today 9:10 AM',
      },
      {
        id: 'file-2',
        name: 'Exemption_Certs.zip',
        entity: 'Construct Holdings, Inc.',
        kind: 'PDF',
        status: 'Processing',
        uploaded: 'Today 8:34 AM',
      },
      {
        id: 'file-3',
        name: 'Nexus_Questionnaire.pdf',
        entity: 'Construct Services LLC',
        kind: 'PDF',
        status: 'Uploaded',
        uploaded: 'Yesterday 4:26 PM',
      },
      {
        id: 'file-4',
        name: 'Receipts_Staging.csv',
        entity: 'Construct R&D Labs',
        kind: 'CSV',
        status: 'Verified',
        uploaded: 'Yesterday 1:02 PM',
      },
    ],
    []
  );

  const selectedEntity = useMemo(
    () => entities.find((e) => e.id === selectedEntityId) ?? entities[0],
    [entities, selectedEntityId]
  );

  const filteredRequests = useMemo(() => {
    const q = requestQuery.trim().toLowerCase();

    return requests.filter((r) => {
      const matchesQuery =
        q.length === 0 ||
        r.title.toLowerCase().includes(q) ||
        r.entity.toLowerCase().includes(q) ||
        r.owner.toLowerCase().includes(q);
      const matchesStatus = requestStatusFilter === 'All' || r.status === requestStatusFilter;
      const matchesType = requestTypeFilter === 'All' || r.type === requestTypeFilter;
      const matchesEntity = requestEntityFilter === 'All' || r.entity === requestEntityFilter;
      return matchesQuery && matchesStatus && matchesType && matchesEntity;
    });
  }, [requestEntityFilter, requestQuery, requestStatusFilter, requestTypeFilter, requests]);

  const filteredFiles = useMemo(() => {
    const q = fileQuery.trim().toLowerCase();
    return files.filter((f) => {
      const matchesQuery =
        q.length === 0 || f.name.toLowerCase().includes(q) || f.entity.toLowerCase().includes(q);
      const matchesStatus = fileStatusFilter === 'All' || f.status === fileStatusFilter;
      const matchesEntity = fileEntityFilter === 'All' || f.entity === fileEntityFilter;
      return matchesQuery && matchesStatus && matchesEntity;
    });
  }, [fileEntityFilter, fileQuery, fileStatusFilter, files]);

  const entityNames = useMemo(() => Array.from(new Set(entities.map((e) => e.name))), [entities]);

  const goToEntities = (entityName?: string) => {
    if (entityName) {
      const found = entities.find((e) => e.name === entityName);
      if (found) setSelectedEntityId(found.id);
    }
    setView('entities');
  };

  const StatusPill = ({ value }: { value: RequestStatus | FileStatus }) => {
    const tone =
      value === 'Open' || value === 'Uploaded'
        ? 'border-text-base/15 text-text-base/70'
        : value === 'In review' || value === 'Processing'
        ? 'border-cta-brass/40 text-cta-brass'
        : 'border-emerald-500/30 text-emerald-600';

    return (
      <span
        className={clsx(
          'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-widest font-label',
          tone
        )}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="absolute inset-0">
      <div className="h-full w-full bg-bg-primary">
        <div className="h-12 px-4 flex items-center justify-between border-b border-text-base/10">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-text-base/60 font-label">
              Information Requests
            </div>
            <div className="text-[11px] text-text-base/50 truncate">
              {selectedEntity?.name ?? 'Entity'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView('requests')}
              className={clsx(
                'text-xs uppercase tracking-widest font-label px-3 py-2 rounded-md border transition-colors',
                view === 'requests'
                  ? 'border-cta-brass text-cta-brass'
                  : 'border-text-base/15 text-text-base/60 hover:text-text-base'
              )}
              aria-pressed={view === 'requests'}
            >
              Requests
            </button>
            <button
              type="button"
              onClick={() => setView('files')}
              className={clsx(
                'text-xs uppercase tracking-widest font-label px-3 py-2 rounded-md border transition-colors',
                view === 'files'
                  ? 'border-cta-brass text-cta-brass'
                  : 'border-text-base/15 text-text-base/60 hover:text-text-base'
              )}
              aria-pressed={view === 'files'}
            >
              Files
            </button>
            <button
              type="button"
              onClick={() => setView('aiBulk')}
              className={clsx(
                'text-xs uppercase tracking-widest font-label px-3 py-2 rounded-md border transition-colors',
                view === 'aiBulk'
                  ? 'border-cta-brass text-cta-brass'
                  : 'border-text-base/15 text-text-base/60 hover:text-text-base'
              )}
              aria-pressed={view === 'aiBulk'}
            >
              AI Bulk
            </button>

            <button
              type="button"
              onClick={() => goToEntities()}
              className={clsx(
                'ml-1 rounded-md border px-3 py-2 transition-colors',
                view === 'entities'
                  ? 'border-cta-brass text-cta-brass'
                  : 'border-text-base/15 text-text-base/60 hover:text-text-base'
              )}
              aria-label="Entity management"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 7.125L16.862 4.487" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5 h-[calc(100%-3rem)] overflow-hidden">
          {view === 'requests' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-xl border border-text-base/10 bg-bg-primary flex flex-col min-h-0">
                <div className="p-4 border-b border-text-base/10">
                  <div className="font-serif text-lg text-text-base">Information requests</div>
                  <div className="mt-1 text-sm text-text-base/60">
                    Filter and triage requests across entities.
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      value={requestQuery}
                      onChange={(e) => setRequestQuery(e.target.value)}
                      placeholder="Search requests, entity, owner"
                      className="md:col-span-2 h-10 rounded-lg border border-text-base/15 bg-transparent px-3 text-sm text-text-base/80 placeholder:text-text-base/40 focus:outline-none focus:ring-2 focus:ring-cta-brass/40"
                    />

                    <select
                      value={requestStatusFilter}
                      onChange={(e) => setRequestStatusFilter(e.target.value as RequestStatus | 'All')}
                      className="h-10 rounded-lg border border-text-base/15 bg-transparent px-3 text-sm text-text-base/70 focus:outline-none focus:ring-2 focus:ring-cta-brass/40"
                      aria-label="Filter by status"
                    >
                      <option value="All">All statuses</option>
                      <option value="Open">Open</option>
                      <option value="In review">In review</option>
                      <option value="Complete">Complete</option>
                    </select>

                    <select
                      value={requestTypeFilter}
                      onChange={(e) => setRequestTypeFilter(e.target.value as RequestType | 'All')}
                      className="h-10 rounded-lg border border-text-base/15 bg-transparent px-3 text-sm text-text-base/70 focus:outline-none focus:ring-2 focus:ring-cta-brass/40"
                      aria-label="Filter by type"
                    >
                      <option value="All">All types</option>
                      <option value="Document">Document</option>
                      <option value="Questionnaire">Questionnaire</option>
                      <option value="Other">Other</option>
                    </select>

                    <select
                      value={requestEntityFilter}
                      onChange={(e) => setRequestEntityFilter(e.target.value)}
                      className="md:col-span-2 h-10 rounded-lg border border-text-base/15 bg-transparent px-3 text-sm text-text-base/70 focus:outline-none focus:ring-2 focus:ring-cta-brass/40"
                      aria-label="Filter by entity"
                    >
                      <option value="All">All entities</option>
                      {entityNames.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>

                    <div className="md:col-span-2 flex items-center justify-between text-xs uppercase tracking-widest text-text-base/40 font-label">
                      <span>{filteredRequests.length} results</span>
                      <button
                        type="button"
                        onClick={() => {
                          setRequestQuery('');
                          setRequestStatusFilter('All');
                          setRequestTypeFilter('All');
                          setRequestEntityFilter('All');
                        }}
                        className="border border-text-base/15 rounded-md px-3 py-2 text-text-base/60 hover:text-text-base transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-auto">
                  <div className="min-w-[740px]">
                    <div className="grid grid-cols-12 gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-text-base/40 font-label border-b border-text-base/10">
                      <div className="col-span-4">Request</div>
                      <div className="col-span-3">Entity</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-1">Due</div>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-1 text-right">Edit</div>
                    </div>

                    {filteredRequests.map((r) => (
                      <div
                        key={r.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setView('requests')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setView('requests');
                          }
                        }}
                        className="w-full text-left grid grid-cols-12 gap-3 px-4 py-3 border-b border-text-base/10 hover:bg-bg-primary/60 transition-colors"
                      >
                        <div className="col-span-4">
                          <div className="text-sm text-text-base/80 font-medium truncate">{r.title}</div>
                          <div className="mt-1 text-xs text-text-base/50">Owner: {r.owner}</div>
                        </div>
                        <div className="col-span-3 text-sm text-text-base/70 truncate">{r.entity}</div>
                        <div className="col-span-2 text-sm text-text-base/70">{r.type}</div>
                        <div className="col-span-1 text-sm text-text-base/70">{r.due}</div>
                        <div className="col-span-1">
                          <StatusPill value={r.status} />
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToEntities(r.entity);
                            }}
                            className="rounded-md border border-text-base/15 p-2 text-text-base/60 hover:text-text-base transition-colors"
                            aria-label="Edit entity"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredRequests.length === 0 && (
                      <div className="px-4 py-10 text-center text-sm text-text-base/50">
                        No requests match your filters.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-text-base/10 bg-bg-primary flex flex-col min-h-0">
                <div className="p-4 border-b border-text-base/10">
                  <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">Quick actions</div>
                  <div className="mt-2 text-sm text-text-base/70">
                    Jump between views (matches your click flow).
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => setView('requests')}
                    className="w-full rounded-lg border border-text-base/15 px-4 py-3 text-left text-sm text-text-base/70 hover:border-text-base/30"
                  >
                    Clicking Request: takes you to 01 (Request view)
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('files')}
                    className="w-full rounded-lg border border-text-base/15 px-4 py-3 text-left text-sm text-text-base/70 hover:border-text-base/30"
                  >
                    Clicking Files: takes you to 02 (Files view)
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('aiBulk')}
                    className="w-full rounded-lg border border-text-base/15 px-4 py-3 text-left text-sm text-text-base/70 hover:border-text-base/30"
                  >
                    Clicking AI Bulk: takes you to 03 (AI bulk upload)
                  </button>
                  <button
                    type="button"
                    onClick={() => goToEntities()}
                    className="w-full rounded-lg border border-text-base/15 px-4 py-3 text-left text-sm text-text-base/70 hover:border-text-base/30"
                  >
                    Clicking the pencil: takes you to 04 (Entity management)
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'files' && (
            <div className="h-full rounded-xl border border-text-base/10 bg-bg-primary flex flex-col min-h-0">
              <div className="p-4 border-b border-text-base/10">
                <div className="font-serif text-lg text-text-base">Files</div>
                <div className="mt-1 text-sm text-text-base/60">Review uploads, processing, and verification.</div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    value={fileQuery}
                    onChange={(e) => setFileQuery(e.target.value)}
                    placeholder="Search file name or entity"
                    className="h-10 rounded-lg border border-text-base/15 bg-transparent px-3 text-sm text-text-base/80 placeholder:text-text-base/40 focus:outline-none focus:ring-2 focus:ring-cta-brass/40"
                  />

                  <select
                    value={fileStatusFilter}
                    onChange={(e) => setFileStatusFilter(e.target.value as FileStatus | 'All')}
                    className="h-10 rounded-lg border border-text-base/15 bg-transparent px-3 text-sm text-text-base/70 focus:outline-none focus:ring-2 focus:ring-cta-brass/40"
                    aria-label="Filter files by status"
                  >
                    <option value="All">All statuses</option>
                    <option value="Uploaded">Uploaded</option>
                    <option value="Processing">Processing</option>
                    <option value="Verified">Verified</option>
                  </select>

                  <select
                    value={fileEntityFilter}
                    onChange={(e) => setFileEntityFilter(e.target.value)}
                    className="h-10 rounded-lg border border-text-base/15 bg-transparent px-3 text-sm text-text-base/70 focus:outline-none focus:ring-2 focus:ring-cta-brass/40"
                    aria-label="Filter files by entity"
                  >
                    <option value="All">All entities</option>
                    {entityNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 min-h-0 overflow-auto">
                <div className="min-w-[720px]">
                  <div className="grid grid-cols-12 gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-text-base/40 font-label border-b border-text-base/10">
                    <div className="col-span-5">File</div>
                    <div className="col-span-3">Entity</div>
                    <div className="col-span-1">Type</div>
                    <div className="col-span-2">Uploaded</div>
                    <div className="col-span-1">Status</div>
                  </div>

                  {filteredFiles.map((f) => (
                    <div
                      key={f.id}
                      className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-text-base/10"
                    >
                      <div className="col-span-5">
                        <div className="text-sm text-text-base/80 font-medium truncate">{f.name}</div>
                        <div className="mt-1 text-xs text-text-base/50">{f.kind} • {f.id}</div>
                      </div>
                      <div className="col-span-3 text-sm text-text-base/70 truncate">{f.entity}</div>
                      <div className="col-span-1 text-sm text-text-base/70">{f.kind}</div>
                      <div className="col-span-2 text-sm text-text-base/70">{f.uploaded}</div>
                      <div className="col-span-1">
                        <StatusPill value={f.status} />
                      </div>
                    </div>
                  ))}

                  {filteredFiles.length === 0 && (
                    <div className="px-4 py-10 text-center text-sm text-text-base/50">
                      No files match your filters.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'aiBulk' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-xl border border-text-base/10 bg-bg-primary p-5">
                <div className="font-serif text-lg text-text-base">AI bulk upload</div>
                <div className="mt-1 text-sm text-text-base/60">
                  Drop a batch of files. AI will classify and route them to requests.
                </div>

                <div className="mt-6 rounded-xl border border-dashed border-text-base/25 p-8 text-center">
                  <div className="text-sm text-text-base/70">Drag & drop files here</div>
                  <div className="mt-2 text-xs text-text-base/50">
                    (Prototype) Simulates classification + routing.
                  </div>
                  <button type="button" className="cta-button mt-5">
                    Select files
                  </button>
                </div>

                <div className="mt-6 rounded-xl border border-text-base/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">
                    Suggested matches
                  </div>
                  <div className="mt-3 space-y-3 text-sm text-text-base/70">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-text-base/80 truncate">Sales_Journal_Q2_2025.xlsx</div>
                        <div className="text-xs text-text-base/50">→ 2025 Q2 - Sales tax support package</div>
                      </div>
                      <button type="button" className="rounded-md border border-text-base/15 px-3 py-2 text-xs uppercase tracking-widest font-label text-text-base/60 hover:text-text-base">
                        Attach
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-text-base/80 truncate">Nexus_Questionnaire.pdf</div>
                        <div className="text-xs text-text-base/50">→ Nexus questionnaire - updates</div>
                      </div>
                      <button type="button" className="rounded-md border border-text-base/15 px-3 py-2 text-xs uppercase tracking-widest font-label text-text-base/60 hover:text-text-base">
                        Attach
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-text-base/10 bg-bg-primary p-5">
                <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">Tips</div>
                <div className="mt-3 text-sm text-text-base/70 space-y-3">
                  <div className="rounded-lg border border-text-base/10 p-3">
                    Use consistent naming to increase match confidence.
                  </div>
                  <div className="rounded-lg border border-text-base/10 p-3">
                    Bulk upload can auto-create requests when no match exists.
                  </div>
                  <button
                    type="button"
                    onClick={() => setView('files')}
                    className="w-full rounded-lg border border-text-base/15 px-4 py-3 text-left text-sm text-text-base/70 hover:border-text-base/30"
                  >
                    Go to Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'entities' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-xl border border-text-base/10 bg-bg-primary flex flex-col min-h-0">
                <div className="p-4 border-b border-text-base/10">
                  <div className="font-serif text-lg text-text-base">Entity management</div>
                  <div className="mt-1 text-sm text-text-base/60">Manage entities tied to requests and files.</div>
                </div>
                <div className="flex-1 min-h-0 overflow-auto">
                  {entities.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setSelectedEntityId(e.id)}
                      className={clsx(
                        'w-full text-left px-4 py-3 border-b border-text-base/10 hover:bg-bg-primary/60 transition-colors',
                        e.id === selectedEntityId && 'bg-bg-primary/60'
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-sm text-text-base/80 font-medium truncate">{e.name}</div>
                          <div className="mt-1 text-xs text-text-base/50">
                            EIN {e.ein} • {e.jurisdiction}
                          </div>
                        </div>
                        <span
                          className={clsx(
                            'text-[10px] uppercase tracking-widest font-label rounded-full border px-2.5 py-1',
                            e.active
                              ? 'border-emerald-500/30 text-emerald-600'
                              : 'border-text-base/15 text-text-base/50'
                          )}
                        >
                          {e.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-text-base/10 bg-bg-primary p-5">
                <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">Selected entity</div>
                <div className="mt-3 font-serif text-lg text-text-base">{selectedEntity?.name}</div>
                <div className="mt-3 space-y-2 text-sm text-text-base/70">
                  <div className="rounded-lg border border-text-base/10 p-3">
                    <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">EIN</div>
                    <div className="mt-1 text-text-base/80">{selectedEntity?.ein}</div>
                  </div>
                  <div className="rounded-lg border border-text-base/10 p-3">
                    <div className="text-xs uppercase tracking-widest text-text-base/50 font-label">Jurisdiction</div>
                    <div className="mt-1 text-text-base/80">{selectedEntity?.jurisdiction}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView('requests')}
                    className="w-full rounded-lg border border-text-base/15 px-4 py-3 text-left text-sm text-text-base/70 hover:border-text-base/30"
                  >
                    Back to Requests
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
