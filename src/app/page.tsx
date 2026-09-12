"use client";

import { useMemo, useState } from "react";
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

const EMPTY_FILTERS: Filters = {
  query: "",
  classes: [],
  boards: [],
  subjects: [],
  examTypes: [],
};

export default function Home() {
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const [viewingPaper, setViewingPaper] = useState<ExamPaper | null>(null);
  const [reportingPaper, setReportingPaper] = useState<ExamPaper | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);
  const [justUploadedId, setJustUploadedId] = useState<string | null>(null);

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

  function handleUpload(paper: ExamPaper) {
    setPapers((prev) => [paper, ...prev]);
    setUploadOpen(false);
    setJustUploadedId(paper.id);
    window.setTimeout(() => setJustUploadedId(null), 4000);
  }

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Navbar onUploadClick={() => setUploadOpen(true)} paperCount={papers.length} />
      <FilterBar filters={filters} onChange={setFilters} resultCount={filteredPapers.length} />

      <main id="browse" className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 sm:px-6">
        {justUploadedId && (
          <div className="mb-4 border border-success bg-success-bg px-3 py-2 text-[13px] text-success">
            Paper uploaded. It&apos;s live in the grid below and queued for moderator review.
          </div>
        )}

        <PaperGrid
          papers={filteredPapers}
          hasAnyPapers={papers.length > 0}
          onView={setViewingPaper}
          onReport={setReportingPaper}
          onClearFilters={() => setFilters(EMPTY_FILTERS)}
          onUploadClick={() => setUploadOpen(true)}
        />
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
