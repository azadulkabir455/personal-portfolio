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
  } = useBlogList();

  return (
    <Container variant="section" className="mt-[90px] w-full bg-[#F7F7F7] pt-[24px] pb-[80px] md:mt-0 md:pt-[40px] lg:mt-[90px]">
      <Container className="container flex flex-col gap-[16px] px-[16px] md:flex-row md:items-start md:px-[30px] lg:gap-[24px] lg:px-[10px]">
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

        <Container className="flex flex-1 flex-col gap-[16px] lg:gap-[24px]">
          <BlogToolbar
            activeCategories={activeCategories}
            onClearCategories={clearCategories}
            suggestions={suggestions}
            activeTag={activeTag}
            onToggleTag={toggleTag}
            resultsCount={resultsCount}
            sortDirection={sortDirection}
            onToggleSortDirection={toggleSortDirection}
          />

          {posts.length === 0 ? (
            <Text className="py-[40px] text-center text-[14px] text-[#8A8A86]">
              No posts match this filter.
            </Text>
          ) : (
            <Container
              className={clsx(
                "grid gap-[16px] lg:gap-[24px]",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
              )}
            >
              {posts.map((post) => (
                <BlogCard key={post.href} {...post} />
              ))}
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  );
}
