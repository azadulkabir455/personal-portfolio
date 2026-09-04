"use client";

import Link from "next/link";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Button from "@/designUI/elements/Button/Button";
import Input from "@/designUI/elements/formElement/Input/Input";
import Select from "@/designUI/elements/formElement/Select/Select";
import DatePicker from "@/designUI/elements/formElement/DatePicker/DatePicker";
import Icon from "@/designUI/elements/Icon/Icon";
import { ArrowLeftIcon, ArrowRightIcon } from "@/designUI/utilities/icons";
import ProjectListRow from "./comp/ProjectListRow";
import ProjectViewModal from "./comp/ProjectViewModal";
import { useProjectListManager } from "./function";

export default function ProjectListManager() {
  const {
    projects,
    filteredCount,
    totalCount,
    currentPage,
    totalPages,
    goToPage,
    tagOptions,
    searchQuery,
    setSearchQuery,
    tagFilter,
    setTagFilter,
    dateFilter,
    setDateFilter,
    selected,
    toggleSelect,
    toggleSelectAll,
    deleteProject,
    bulkDelete,
    viewProject,
    setViewProject,
  } = useProjectListManager();

  return (
    <Container className="flex w-full flex-col gap-6 rounded-[16px] border border-[#E4E4E4] bg-white p-4 lg:gap-8 lg:p-10">
      <Container className="flex items-start justify-between gap-4 border-b border-[#E4E4E4] pb-4 lg:pb-6">
        <Container className="flex flex-col gap-1.5 lg:gap-2">
          <Text variant="h2" className="font-sans text-[18px] font-semibold text-[#171717] lg:text-[24px]">
            All Projects
          </Text>
          <Text className="font-sans text-[12px] text-[#8A8A86] lg:text-[14px]">
            {filteredCount === totalCount
              ? `${totalCount} project${totalCount === 1 ? "" : "s"} total.`
              : `Showing ${filteredCount} of ${totalCount} projects.`}
          </Text>
        </Container>

        <Link href="/admin/project/add">
          <Button type="button">+ Add Project</Button>
        </Link>
      </Container>

      <Container className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          id="filter-search"
          label="Search"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          endAdornment={
            searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="mr-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#8A8A86] hover:bg-[#F7F7F7] hover:text-[#171717]"
              >
                <Icon name="FaTimes" width={10} height={10} />
              </button>
            )
          }
        />
        <Select id="filter-tag" label="Tag" value={tagFilter} onChange={setTagFilter} options={tagOptions} />
        <DatePicker
          id="filter-date"
          label="Published Date"
          value={dateFilter}
          onChange={setDateFilter}
        />
      </Container>

      {selected.size > 0 && (
        <Container className="flex items-center justify-between rounded-[10px] bg-[#F7F7F7] px-4 py-3">
          <Text className="font-sans text-[13px] font-medium text-[#171717]">
            {selected.size} selected
          </Text>
          <button
            type="button"
            onClick={bulkDelete}
            className="cursor-pointer font-sans text-[13px] font-medium text-[#E5484D] hover:underline"
          >
            Delete Selected
          </button>
        </Container>
      )}

      <Container className="flex flex-col gap-3">
        {projects.length > 0 && (
          <Container className="flex items-center gap-2 px-3">
            <input
              type="checkbox"
              checked={selected.size > 0 && selected.size === projects.length}
              onChange={toggleSelectAll}
              aria-label="Select all"
              className="h-4 w-4 cursor-pointer accent-[#242423]"
            />
            <Text className="font-sans text-[12px] text-[#8A8A86]">Select all</Text>
          </Container>
        )}

        {projects.length === 0 ? (
          <Text className="py-10 text-center font-sans text-[13px] text-[#8A8A86]">
            No projects match these filters.
          </Text>
        ) : (
          projects.map((project) => (
            <ProjectListRow
              key={project.id}
              project={project}
              checked={selected.has(project.id)}
              onToggle={() => toggleSelect(project.id)}
              onView={() => setViewProject(project)}
              onDelete={() => deleteProject(project.id)}
            />
          ))
        )}
      </Container>

      {totalPages > 1 && (
        <Container className="flex items-center justify-between border-t border-[#E4E4E4] pt-4">
          <Text className="font-sans text-[12px] text-[#8A8A86] lg:text-[13px]">
            Page {currentPage} of {totalPages}
          </Text>

          <Container className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-[#E4E4E4] text-[#171717] transition-colors duration-150 hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ArrowLeftIcon width={11} height={11} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={
                  page === currentPage
                    ? "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#242423] font-sans text-[12px] font-medium text-white"
                    : "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] font-sans text-[12px] font-medium text-[#171717] hover:bg-[#F7F7F7]"
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-[#E4E4E4] text-[#171717] transition-colors duration-150 hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ArrowRightIcon width={11} height={11} />
            </button>
          </Container>
        </Container>
      )}

      <ProjectViewModal project={viewProject} onClose={() => setViewProject(null)} />
    </Container>
  );
}
