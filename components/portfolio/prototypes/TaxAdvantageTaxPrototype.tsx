'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

type View = 'requests' | 'files' | 'aiBulk' | 'entities';

type RequestStatus = 'Returned' | 'Completed' | 'Outstanding' | 'Not Applicable';

type RequestItem = {
  id: string;
  title: string;
  dueLabel: string;
  description: string;
  status: RequestStatus;
  priority?: boolean;
};

type FileRow = {
  id: string;
  fileName: string;
  request: string;
  category: string;
  status: string;
  uploadBy: string;
  dateUploaded: string;
  fileStatus: string;
};

type EntityRow = {
  entityId: string;
  entityName: string;
  entityType: string;
  clientUsers: string[];
  clientId: string;
  lastModified: string;
  modifiedBy: string;
};

function Icon({ name, className }: { name: 'menu' | 'bell' | 'help' | 'user' | 'filter' | 'sort' | 'tool' | 'search' | 'upload' | 'doc' | 'pencil' | 'plus' | 'download'; className?: string }) {
  const base = clsx('h-4 w-4', className);

  if (name === 'menu') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }

  if (name === 'bell') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v1a3 3 0 006 0v-1" />
      </svg>
    );
  }

  if (name === 'help') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M9.09 9a3 3 0 015.82 1c0 2-3 2-3 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  if (name === 'user') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19a4 4 0 00-8 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    );
  }

  if (name === 'filter') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
      </svg>
    );
  }

  if (name === 'sort') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8v12m0 0l-4-4m4 4l4-4" />
      </svg>
    );
  }

  if (name === 'tool') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }

  if (name === 'search') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
      </svg>
    );
  }

  if (name === 'upload') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16V4m0 0l-4 4m4-4l4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      </svg>
    );
  }

  if (name === 'doc') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m-6-8h6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 3h8l4 4v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    );
  }

  if (name === 'pencil') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    );
  }

  if (name === 'plus') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v14M5 12h14" />
      </svg>
    );
  }

  if (name === 'download') {
    return (
      <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v12m0 0l-4-4m4 4l4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      </svg>
    );
  }

  return null;
}

export default function TaxAdvantageTaxPrototype() {
  const [view, setView] = useState<View>('requests');
  const [sidebarEntity, setSidebarEntity] = useState<string>('All');
  const [topEntity, setTopEntity] = useState<string>('All Entities');
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');

  const effectiveEntity = useMemo(() => {
    if (topEntity !== 'All Entities') return topEntity;
    if (sidebarEntity !== 'All') return sidebarEntity;
    return 'All';
  }, [sidebarEntity, topEntity]);

  const requestItems: RequestItem[] = useMemo(
    () => [
      {
        id: 'req-1',
        title: 'P&L By Dept.',
        dueLabel: 'Due Date: 05/30/2025 15 day(s) overdue',
        description: 'Please provide an Income Statement by department f…',
        status: 'Returned',
      },
      {
        id: 'req-2',
        title: 'Trial Balance',
        dueLabel: 'Due Date: 09/05/2025',
        description: 'Please provide trial balance by entity, including elimin…',
        status: 'Completed',
        priority: true,
      },
      {
        id: 'req-3',
        title: 'Accrued Bonus Payout Amount',
        dueLabel: 'Due Date: N/A',
        description: 'Please provide the amount of Accrued Bonus paid ou…',
        status: 'Outstanding',
      },
      {
        id: 'req-4',
        title: 'Accrued Bonus Policy',
        dueLabel: 'Due Date: N/A',
        description: 'Are accrued bonuses fixed at year end and board app…',
        status: 'Not Applicable',
      },
    ],
    []
  );

  const fileRows: FileRow[] = useMemo(
    () => [
      {
        id: 'f-1',
        fileName: 'thisisaclickab… .png',
        request: 'Trial Balance',
        category: 'Financial Report',
        status: 'Complete',
        uploadBy: 'J. Davis',
        dateUploaded: '6/2/2025 10:08 AM',
        fileStatus: 'Approved',
      },
      {
        id: 'f-2',
        fileName: 'thisisaclickab… .png',
        request: 'Balance Sheet',
        category: 'Financial Report',
        status: 'Complete',
        uploadBy: 'J. Davis',
        dateUploaded: '6/2/2025 10:08 AM',
        fileStatus: 'Approved',
      },
      {
        id: 'f-3',
        fileName: 'thisisaclickab… .png',
        request: 'Income Statement',
        category: 'Financial Report',
        status: 'Fulfilled',
        uploadBy: 'J. Davis',
        dateUploaded: '6/2/2025 10:08 AM',
        fileStatus: 'Approved',
      },
      {
        id: 'f-4',
        fileName: 'thisisaclickab… .png',
        request: 'PoI',
        category: 'Financial Report',
        status: 'Returned',
        uploadBy: 'J. Davis',
        dateUploaded: '6/2/2025 10:08 AM',
        fileStatus: 'Returned',
      },
      {
        id: 'f-5',
        fileName: 'thisisaclickab… .png',
        request: 'Fixed Asset',
        category: 'General',
        status: 'Fulfilled',
        uploadBy: 'J. Davis',
        dateUploaded: '6/2/2025 10:08 AM',
        fileStatus: 'Pending Review',
      },
    ],
    []
  );

  const entityRows: EntityRow[] = useMemo(
    () => [
      {
        entityId: 'ENT-002',
        entityName: 'Acme Global',
        entityType: 'Subsidiary',
        clientUsers: ['Jane Doe', 'Mike Johnson'],
        clientId: 'VID-12346',
        lastModified: '11/28/2024',
        modifiedBy: 'John Smith',
      },
      {
        entityId: 'ENT-003',
        entityName: 'Acme USA',
        entityType: 'Subsidiary',
        clientUsers: ['John Smith'],
        clientId: 'VID-12347',
        lastModified: '11/15/2024',
        modifiedBy: 'Jane Doe',
      },
      {
        entityId: 'ENT-004',
        entityName: 'Acme Holdings',
        entityType: 'Holding Company',
        clientUsers: ['John Smith', 'Jane Doe'],
        clientId: 'VID-12348',
        lastModified: '10/30/2024',
        modifiedBy: 'Mike Johnson',
      },
      {
        entityId: 'ENT-005',
        entityName: 'Acme Europe',
        entityType: 'Subsidiary',
        clientUsers: ['Sarah Williams'],
        clientId: 'VID-12349',
        lastModified: '10/15/2024',
        modifiedBy: 'Sarah Chen',
      },
    ],
    []
  );

  const entities = useMemo(() => ['All', 'Acme Corp', 'Acme Global', 'Acme USA', 'Acme Holdings'], []);

  const filteredRequests = useMemo(() => {
    const q = search.trim().toLowerCase();
    return requestItems.filter((r) => {
      const matchesSearch =
        q.length === 0 ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.dueLabel.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesEntity = effectiveEntity === 'All' || effectiveEntity === 'Acme Corp';
      return matchesSearch && matchesStatus && matchesEntity;
    });
  }, [effectiveEntity, requestItems, search, statusFilter]);

  const filteredFiles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return fileRows.filter((f) => {
      const matchesSearch =
        q.length === 0 ||
        f.fileName.toLowerCase().includes(q) ||
        f.request.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q);
      const matchesEntity = effectiveEntity === 'All' || effectiveEntity === 'Acme Corp';
      return matchesSearch && matchesEntity;
    });
  }, [effectiveEntity, fileRows, search]);

  const statusClass = (status: string) => {
    if (status === 'Returned') return 'text-red-600';
    if (status === 'Outstanding') return 'text-amber-600';
    if (status === 'Completed' || status === 'Complete' || status === 'Approved') return 'text-emerald-600';
    if (status === 'Not Applicable') return 'text-slate-500';
    if (status === 'Pending Review') return 'text-slate-600';
    return 'text-slate-600';
  };

  const Tab = ({ id, label }: { id: View; label: string }) => (
    <button
      type="button"
      onClick={() => setView(id)}
      className={clsx(
        'px-4 py-3 text-[12px] font-medium',
        view === id ? 'text-[#b45309]' : 'text-slate-500 hover:text-slate-700'
      )}
    >
      <span className="relative">
        {label}
        {view === id && <span className="absolute left-0 -bottom-3 h-[2px] w-full bg-[#b45309]" />}
      </span>
    </button>
  );

  return (
    <div className={clsx(roboto.className, 'h-full w-full bg-[#f7f7f7] text-[#111827] overflow-auto')}>
      <div className="min-h-full min-w-[980px] flex flex-col">
        <div className="h-12 bg-white border-b border-[#ececec] flex items-center px-4">
          <div className="flex items-center gap-3">
            <button type="button" className="text-slate-600 hover:text-slate-800">
              <Icon name="menu" />
            </button>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium tracking-tight">taxadvantage</div>
              <div className="h-4 w-4 rounded bg-[#b45309]" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="rounded bg-[#fef3c7] px-2 py-1 text-[11px] text-[#92400e]">Internal View</span>
            <button type="button" className="text-slate-500 hover:text-slate-800" aria-label="Notifications">
              <Icon name="bell" />
            </button>
            <button type="button" className="text-slate-500 hover:text-slate-800" aria-label="Help">
              <Icon name="help" />
            </button>
            <button type="button" className="text-slate-500 hover:text-slate-800" aria-label="Profile">
              <Icon name="user" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          {view !== 'entities' ? (
            <div className="h-full flex flex-col">
              <div className="px-6 pt-6 pb-3">
                <div className="text-[18px] font-medium">Information request</div>
                <div className="mt-1 text-[12px] text-slate-500">Acme Inc</div>

                <div className="mt-4 flex items-center gap-3 text-[12px]">
                  <span className="text-slate-500">Filter by Entity:</span>
                  <select
                    value={topEntity}
                    onChange={(e) => setTopEntity(e.target.value)}
                    className="h-8 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700"
                  >
                    <option>All Entities</option>
                    <option>Acme Corp</option>
                    <option>Acme Global</option>
                    <option>Acme USA</option>
                    <option>Acme Holdings</option>
                  </select>
                  <span className="text-slate-500">41 requests</span>
                </div>
              </div>

              <div className="flex-1 min-h-0 flex gap-4 px-6 pb-6 overflow-hidden">
                <div className="w-[240px] flex-none rounded-lg border border-[#ededed] bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#f1f1f1] text-[13px] font-medium">Request Lists</div>

                  <div className="p-2">
                    {entities.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setSidebarEntity(e)}
                        className={clsx(
                          'w-full rounded-md px-3 py-2 text-left text-[12px] transition-colors',
                          sidebarEntity === e ? 'bg-[#f6f6f6]' : 'hover:bg-[#fafafa]'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">{e}</span>
                          <span className="text-slate-400"> </span>
                        </div>
                        {e !== 'All' && (
                          <div className="mt-2 h-1.5 rounded-full bg-[#e5e7eb] overflow-hidden">
                            <div className="h-full w-[38%] bg-[#f59e0b]" />
                            <div className="-mt-1.5 h-1.5 w-[62%] bg-[#84cc16]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-auto px-4 py-3 flex items-center justify-end gap-3 text-slate-500">
                    <button
                      type="button"
                      className="hover:text-slate-800"
                      aria-label="Edit lists"
                      onClick={() => setView('entities')}
                    >
                      <Icon name="pencil" />
                    </button>
                    <button type="button" className="hover:text-slate-800" aria-label="Add list">
                      <Icon name="plus" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-w-0 rounded-lg border border-[#ededed] bg-white overflow-hidden flex flex-col">
                  <div className="border-b border-[#f1f1f1] px-2">
                    <div className="flex items-center">
                      <Tab id="requests" label="Requests" />
                      <Tab id="files" label="Files" />
                      <Tab id="aiBulk" label="AI Bulk" />
                      <div className="ml-auto" />
                    </div>
                  </div>

                  <div className="px-4 py-3 border-b border-[#f1f1f1]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Icon name="search" />
                          </span>
                          <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by summary, description, control ID…"
                            className="w-full h-9 rounded-md border border-[#e5e7eb] bg-white pl-9 pr-3 text-[12px] text-slate-700 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="h-9 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700 inline-flex items-center gap-2"
                        onClick={() => setFiltersOpen((v) => !v)}
                      >
                        <Icon name="filter" className="text-slate-500" />
                        Filters
                      </button>

                      <button type="button" className="h-9 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700 inline-flex items-center gap-2">
                        <Icon name="sort" className="text-slate-500" />
                        Sort
                      </button>

                      <button type="button" className="h-9 w-9 rounded-md border border-[#e5e7eb] bg-white inline-flex items-center justify-center text-slate-600">
                        <Icon name="tool" />
                      </button>

                      <button type="button" className="h-9 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700 inline-flex items-center gap-2">
                        Tools
                        <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {filtersOpen && (
                      <div className="mt-3 rounded-md border border-[#ececec] bg-[#fafafa] p-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <div className="text-[11px] text-slate-500 mb-1">Entity</div>
                            <select
                              value={topEntity}
                              onChange={(e) => setTopEntity(e.target.value)}
                              className="h-9 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700"
                            >
                              <option>All Entities</option>
                              <option>Acme Corp</option>
                              <option>Acme Global</option>
                              <option>Acme USA</option>
                              <option>Acme Holdings</option>
                            </select>
                          </div>
                          <div>
                            <div className="text-[11px] text-slate-500 mb-1">Status</div>
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'All')}
                              className="h-9 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700"
                            >
                              <option value="All">All</option>
                              <option value="Returned">Returned</option>
                              <option value="Completed">Completed</option>
                              <option value="Outstanding">Outstanding</option>
                              <option value="Not Applicable">Not Applicable</option>
                            </select>
                          </div>
                          <div className="flex items-end justify-end">
                            <button
                              type="button"
                              className="h-9 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700"
                              onClick={() => {
                                setSearch('');
                                setStatusFilter('All');
                                setTopEntity('All Entities');
                                setSidebarEntity('All');
                              }}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-h-0 overflow-auto">
                    {view === 'requests' && (
                      <div className="p-4">
                        <div className="text-[12px] text-slate-600 mb-3 inline-flex items-center gap-2">
                          <span className="text-slate-700">Financial Reports</span>
                        </div>

                        <div className="space-y-2">
                          {filteredRequests.map((r) => (
                            <div key={r.id} className="rounded-md border border-[#ededed] bg-white">
                              <div className="px-4 py-3 flex items-start gap-3">
                                <div className="mt-0.5 text-slate-400">
                                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                  </svg>
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <div className="text-[12px] font-medium text-slate-800">{r.title}</div>
                                    {r.priority && (
                                      <span className="rounded-full bg-[#f97316] px-2 py-0.5 text-[10px] font-medium text-white">
                                        PRIORITY
                                      </span>
                                    )}
                                  </div>
                                  <div className={clsx('mt-1 text-[11px]', r.status === 'Returned' ? 'text-red-600' : 'text-slate-500')}>
                                    {r.dueLabel}
                                  </div>
                                </div>

                                <div className="hidden md:block w-[44%] text-[11px] text-slate-500 truncate pt-0.5">
                                  {r.description}
                                </div>

                                <div className="ml-auto flex items-center gap-4">
                                  <div className={clsx('text-[11px] font-medium', statusClass(r.status))}>{r.status}</div>
                                  <div className="flex items-center gap-2 text-slate-500">
                                    <button type="button" className="h-8 w-8 rounded-md border border-[#ededed] bg-white inline-flex items-center justify-center">
                                      <Icon name="doc" className="h-4 w-4" />
                                    </button>
                                    <button type="button" className="h-8 w-8 rounded-md border border-[#ededed] bg-white inline-flex items-center justify-center">
                                      <Icon name="upload" className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {filteredRequests.length === 0 && (
                            <div className="py-10 text-center text-[12px] text-slate-500">No results.</div>
                          )}
                        </div>
                      </div>
                    )}

                    {view === 'files' && (
                      <div className="p-4">
                        <div className="rounded-md border border-[#ededed] overflow-hidden">
                          <div className="grid grid-cols-12 gap-2 bg-[#fafafa] px-4 py-2 text-[11px] text-slate-500">
                            <div className="col-span-3">File Name</div>
                            <div className="col-span-2">Request</div>
                            <div className="col-span-2">Category</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-1">Upload By</div>
                            <div className="col-span-2">Date Uploaded</div>
                            <div className="col-span-1">File Status</div>
                          </div>

                          {filteredFiles.map((row) => (
                            <div key={row.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-t border-[#f1f1f1] text-[12px]">
                              <div className="col-span-3 flex items-center gap-2 min-w-0">
                                <button type="button" className="text-slate-400 hover:text-slate-700" aria-label="Download">
                                  <Icon name="download" className="h-4 w-4" />
                                </button>
                                <div className="truncate text-slate-700">{row.fileName}</div>
                              </div>
                              <div className="col-span-2 text-slate-700 truncate">{row.request}</div>
                              <div className="col-span-2 text-slate-700 truncate">{row.category}</div>
                              <div className={clsx('col-span-1 font-medium', statusClass(row.status))}>{row.status}</div>
                              <div className="col-span-1 text-slate-700 truncate">{row.uploadBy}</div>
                              <div className="col-span-2 text-slate-700 truncate">{row.dateUploaded}</div>
                              <div className={clsx('col-span-1 font-medium', statusClass(row.fileStatus))}>{row.fileStatus}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {view === 'aiBulk' && (
                      <div className="p-4">
                        <div className="h-full flex items-center justify-center">
                          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="rounded-md border border-dashed border-[#d1d5db] bg-white p-8 text-center">
                              <div className="mx-auto h-12 w-12 rounded-full bg-[#f3f4f6] flex items-center justify-center text-slate-500">
                                <Icon name="upload" className="h-5 w-5" />
                              </div>
                              <div className="mt-4 text-[12px] text-slate-600">Drag and drop files to upload</div>
                              <div className="mt-2 text-[12px] text-slate-400">or</div>
                              <button
                                type="button"
                                className="mt-3 inline-flex items-center justify-center rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-[12px] font-medium text-[#92400e]"
                              >
                                CHOOSE FILE
                              </button>
                            </div>

                            <div>
                              <div className="text-center md:text-left">
                                <div className="text-[18px] font-medium">Let&apos;s Get Started</div>
                                <div className="mt-1 text-[12px] text-slate-500">Use the button or drag and drop to upload</div>
                              </div>

                              <div className="mt-6">
                                <div className="text-[12px] font-medium text-slate-700">How It Works</div>
                                <div className="mt-3 space-y-3 text-[12px] text-slate-600 leading-relaxed">
                                  <p>Upload your files and our AI will automatically match each file to the most relevant request.</p>
                                  <p>You&apos;ll be able to review the matches and make any necessary adjustments before completing the upload.</p>
                                  <p>This bulk upload feature saves you time by processing multiple files at once and intelligently categorizing them.</p>
                                </div>
                              </div>

                              <div className="mt-6 flex justify-end">
                                <button type="button" className="h-9 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700 inline-flex items-center gap-2">
                                  Tools
                                  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="px-6 pt-6 pb-4">
                <div className="text-[10px] tracking-widest text-slate-500">ENTITY MANAGEMENT</div>
                <div className="mt-1 text-[16px] font-medium">Entity Hierarchy</div>
                <div className="mt-4 text-[12px] text-slate-500">Manage your entity hierarchies and access controls</div>
              </div>

              <div className="px-6 pb-6 flex-1 min-h-0 overflow-hidden">
                <div className="h-full rounded-lg border border-[#ededed] bg-white overflow-hidden flex flex-col">
                  <div className="bg-[#fdf6ec] px-4 py-4 border-b border-[#f3e5d2]">
                    <div className="flex items-center gap-2">
                      <div className="text-[12px] font-medium">Acme Corp</div>
                      <span className="rounded-full bg-[#f59e0b] px-2 py-0.5 text-[10px] font-medium text-white">Parent Group</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-600">4 entities • Last updated 12/10/2024</div>
                  </div>

                  <div className="px-4 py-3 border-b border-[#f1f1f1] flex items-center gap-3">
                    <div className="flex-1 min-w-0 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon name="search" />
                      </span>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search entities, types, or users…"
                        className="w-full h-9 rounded-md border border-[#e5e7eb] bg-white pl-9 pr-3 text-[12px] text-slate-700 placeholder:text-slate-400"
                      />
                    </div>

                    <button type="button" className="h-9 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700 inline-flex items-center gap-2">
                      Current Structure
                      <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1 min-h-0 overflow-auto">
                    <div className="min-w-[860px]">
                      <div className="grid grid-cols-12 gap-3 bg-[#fafafa] px-4 py-2 text-[11px] text-slate-500 border-b border-[#f1f1f1]">
                        <div className="col-span-1">Entity ID</div>
                        <div className="col-span-2">Entity Name</div>
                        <div className="col-span-2">Entity Type</div>
                        <div className="col-span-3">Client Users</div>
                        <div className="col-span-1">Client ID</div>
                        <div className="col-span-1">Last Modified</div>
                        <div className="col-span-1">Modified By</div>
                        <div className="col-span-1 text-right">Actions</div>
                      </div>

                      {entityRows.map((row) => (
                        <div key={row.entityId} className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-[#f6f6f6] text-[12px] items-center">
                          <div className="col-span-1 text-slate-700">{row.entityId}</div>
                          <div className="col-span-2 text-slate-700">{row.entityName}</div>
                          <div className="col-span-2">
                            <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] text-slate-700">
                              {row.entityType}
                            </span>
                          </div>
                          <div className="col-span-3 flex flex-wrap gap-2">
                            {row.clientUsers.map((u) => (
                              <span key={u} className="inline-flex items-center rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] text-slate-700">
                                {u}
                              </span>
                            ))}
                          </div>
                          <div className="col-span-1 text-slate-700">{row.clientId}</div>
                          <div className="col-span-1 text-slate-700">{row.lastModified}</div>
                          <div className="col-span-1 text-slate-700">{row.modifiedBy}</div>
                          <div className="col-span-1 flex justify-end">
                            <button
                              type="button"
                              className="h-8 w-8 rounded-md border border-[#e5e7eb] bg-white inline-flex items-center justify-center text-slate-600"
                              onClick={() => {
                                setView('requests');
                              }}
                              aria-label="Edit"
                            >
                              <Icon name="pencil" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-[#f1f1f1] flex items-center justify-between">
                    <button
                      type="button"
                      className="h-9 rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-slate-700"
                      onClick={() => setView('requests')}
                    >
                      Back
                    </button>
                    <div className="text-[11px] text-slate-500">Prototype</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
