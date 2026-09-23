"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FilterBar, type Filters } from "@/components/FilterBar";
import { PaperGrid } from "@/components/PaperGrid";
import { ViewPaperModal } from "@/components/ViewPaperModal";
import { UploadModal } from "@/components/UploadModal";
import { ReportModal } from "@/components/ReportModal";
import { LegalModal, type LegalDoc } from "@/components/LegalModal";
import { InfoSections } from "@/components/InfoSections";
import { Footer } from "@/components/Footer";
import { ExamPaper } from "@/types";
import { fetchPapers, uploadPaper, type NewPaperInput } from "@/lib/papers";

const EMPTY_FILTERS: Filters = {
  query: "",
  classes: [],
  boards: [],
  subjects: [],
  examTypes: [],
};

export default function Home() {
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const [viewingPaper, setViewingPaper] = useState<ExamPaper | null>(null);
  const [reportingPaper, setReportingPaper] = useState<ExamPaper | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPapers()
      .then((rows) => {
        if (!cancelled) setPapers(rows);
      })
      .catch((err) => {
        console.error("fetch error:", err);
        if (!cancelled) setLoadError("Couldn't load papers. Refresh to try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPapers = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return papers.filter((paper) => {
      if (q) {
        const haystack = `${paper.title} ${paper.subject} ${paper.school}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.classes.length && !filters.classes.includes(paper.class)) return false;
      if (filters.boards.length && !filters.boards.includes(paper.board)) return false;
      if (filters.subjects.length && !filters.subjects.includes(paper.subject)) return false;
      if (filters.examTypes.length && !filters.examTypes.includes(paper.examType)) return false;
      return true;
    });
  }, [papers, filters]);

  async function handleUpload(input: NewPaperInput) {
    await uploadPaper(input); // throws on failure, the modal shows the error
    setUploadOpen(false);
    setJustSubmitted(true);
    window.setTimeout(() => setJustSubmitted(false), 6000);
  }

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Navbar onUploadClick={() => setUploadOpen(true)} paperCount={papers.length} />
      <FilterBar filters={filters} onChange={setFilters} resultCount={filteredPapers.length} />

      <main id="browse" className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 sm:px-6">
        {justSubmitted && (
          <div className="mb-4 border border-success bg-success-bg px-3 py-2 text-[13px] text-success">
            Paper submitted. It&apos;ll appear here once it&apos;s reviewed.
          </div>
        )}

        {loadError && (
          <div className="mb-4 border border-danger bg-danger-bg px-3 py-2 text-[13px] text-danger">
            {loadError}
          </div>
        )}

        {loading ? (
          <p className="py-20 text-center text-[13px] text-muted">Loading papers...</p>
        ) : (
          <PaperGrid
            papers={filteredPapers}
            hasAnyPapers={papers.length > 0}
            onView={setViewingPaper}
            onReport={setReportingPaper}
            onClearFilters={() => setFilters(EMPTY_FILTERS)}
            onUploadClick={() => setUploadOpen(true)}
          />
        )}
      </main>

      <InfoSections onUploadClick={() => setUploadOpen(true)} />

      <Footer onOpenLegal={setLegalDoc} />

      {viewingPaper && (
        <ViewPaperModal paper={viewingPaper} onClose={() => setViewingPaper(null)} />
      )}
      {reportingPaper && (
        <ReportModal paper={reportingPaper} onClose={() => setReportingPaper(null)} />
      )}
      {uploadOpen && (
        <UploadModal onClose={() => setUploadOpen(false)} onUpload={handleUpload} />
      )}
      {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}
    </div>
  );
}