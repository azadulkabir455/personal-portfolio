"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import BlogCard from "@/designUI/components/BlogCard/BlogCard";
import CategorySidebar from "./comp/CategorySidebar";
import BlogToolbar from "./comp/BlogToolbar";
import { useBlogList } from "./function";

export default function BlogList() {
  const {
    categories,
    suggestions,
    resultsCount,
    posts,
    visiblePosts,
    hasMore,
    isLoadingMore,
    loadMoreRef,
    activeCategories,
    expandedCategoryId,
    viewMode,
    sortDirection,
    activeTag,
    toggleCategory,
    clearCategories,
    activeSubCategories,
    toggleSubCategory,
    toggleExpanded,
    toggleSortDirection,
    toggleTag,
    isFilterOpen,
    openFilter,
    closeFilter,
  } = useBlogList();

  return (
    <Container variant="section" className="mt-[20px] w-full bg-[#F7F7F7] pb-[80px] md:mt-0 md:pt-[40px] lg:mt-[90px]">
      <Container className="container flex flex-col gap-[16px] px-[16px] min-[900px]:flex-row min-[900px]:items-start md:px-[30px] lg:gap-[24px] lg:px-[10px]">
        <Container className="hidden min-[900px]:contents">
          <CategorySidebar
            categories={categories}
            activeCategories={activeCategories}
            expandedCategoryId={expandedCategoryId}
            onToggleCategory={toggleCategory}
            onClearCategories={clearCategories}
            activeSubCategories={activeSubCategories}
            onToggleSubCategory={toggleSubCategory}
            onToggleExpand={toggleExpanded}
          />
        </Container>

        <Container className="flex min-w-0 flex-1 flex-col gap-[16px] lg:gap-[24px]">
          <BlogToolbar
            activeCategories={activeCategories}
            onClearCategories={clearCategories}
            suggestions={suggestions}
            activeTag={activeTag}
            onToggleTag={toggleTag}
            resultsCount={resultsCount}
            sortDirection={sortDirection}
            onToggleSortDirection={toggleSortDirection}
            onOpenFilter={openFilter}
          />

          {posts.length === 0 ? (
            <Text className="py-[40px] text-center text-[14px] text-[#8A8A86]">
              No posts match this filter.
            </Text>
          ) : (
            <>
              <Container
                className={clsx(
                  "grid gap-[16px] lg:gap-[24px]",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
                )}
              >
                {visiblePosts.map((post) => (
                  <BlogCard key={post.href} {...post} />
                ))}
              </Container>

              {hasMore && (
                <div ref={loadMoreRef} className="flex items-center justify-center py-[24px]">
                  {isLoadingMore && (
                    <Text className="text-[14px] text-[#8A8A86]">Loading more posts...</Text>
                  )}
                </div>
              )}
            </>
          )}
        </Container>
      </Container>

      <Container
        className={clsx("fixed inset-0 z-50 min-[900px]:hidden", !isFilterOpen && "pointer-events-none")}
        aria-hidden={!isFilterOpen}
      >
        <Container
          onClick={closeFilter}
          className={clsx(
            "absolute inset-0 bg-[#0B0B0AB8] transition-opacity duration-300",
            isFilterOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <Container
          className={clsx(
            "absolute top-[20px] bottom-[10px] left-[20px] w-[288px] max-w-[85vw] transition-transform duration-300 ease-in-out md:bottom-[20px] md:left-[20px]",
            isFilterOpen ? "translate-x-0" : "-translate-x-[calc(100%+20px)]",
          )}
        >
          <CategorySidebar
            categories={categories}
            activeCategories={activeCategories}
            expandedCategoryId={expandedCategoryId}
            onToggleCategory={toggleCategory}
            onClearCategories={clearCategories}
            activeSubCategories={activeSubCategories}
            onToggleSubCategory={toggleSubCategory}
            onToggleExpand={toggleExpanded}
            onClose={closeFilter}
          />
        </Container>
      </Container>
    </Container>
  );
}
