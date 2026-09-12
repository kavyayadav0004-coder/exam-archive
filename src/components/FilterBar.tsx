"use client";

import { Search, X } from "lucide-react";
import { FilterDropdown } from "./FilterDropdown";
import { BOARDS, CLASSES, EXAM_TYPES, SUBJECTS } from "@/types";
import type { BoardType, ExamType, SubjectType } from "@/types";

export interface Filters {
  query: string;
  classes: number[];
  boards: BoardType[];
  subjects: SubjectType[];
  examTypes: ExamType[];
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const activeFilterCount =
    filters.classes.length +
    filters.boards.length +
    filters.subjects.length +
    filters.examTypes.length;

  function clearAll() {
    onChange({ query: filters.query, classes: [], boards: [], subjects: [], examTypes: [] });
  }

  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6">
        <div className="relative">
          <Search
            size={15}
            strokeWidth={2}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
          />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            placeholder="Search by title, subject, or school name"
            className="h-9 w-full border border-border bg-background pl-9 pr-9 text-[13px] placeholder:text-subtle transition-colors focus:border-foreground"
          />
          {filters.query && (
            <button
              onClick={() => onChange({ ...filters, query: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-subtle hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={14} strokeWidth={2} />
            </button>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <FilterDropdown
            label="Class"
            options={CLASSES}
            selected={filters.classes}
            onChange={(classes) => onChange({ ...filters, classes })}
          />
          <FilterDropdown
            label="Board"
            options={BOARDS}
            selected={filters.boards}
            onChange={(boards) => onChange({ ...filters, boards })}
          />
          <FilterDropdown
            label="Subject"
            options={SUBJECTS}
            selected={filters.subjects}
            onChange={(subjects) => onChange({ ...filters, subjects })}
          />
          <FilterDropdown
            label="Exam Type"
            options={EXAM_TYPES}
            selected={filters.examTypes}
            onChange={(examTypes) => onChange({ ...filters, examTypes })}
          />

          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex h-8 items-center gap-1 px-2 text-[13px] text-muted hover:text-foreground"
            >
              <X size={13} strokeWidth={2} />
              Clear all
            </button>
          )}

          <span className="mono-badge ml-auto text-subtle">
            {resultCount.toLocaleString("en-IN")} result{resultCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
