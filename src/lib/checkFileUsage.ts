import { getAllSectionContentDocs } from "@/firebase/sectionContent";
import { getAllPostsForDashboard } from "@/firebase/blogService";
import { getAllProjectsForDashboard } from "@/firebase/projectService";
import { featureContent } from "@/designUI/utilities/content/feature";
import { topBarContent } from "@/designUI/utilities/content/topbar";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import { blogContent } from "@/designUI/utilities/content/blog";
import { caseStudyContent } from "@/designUI/utilities/content/caseStudy";
import { blogDetailsContent } from "@/designUI/utilities/content/blogDetails";
import { termsAndConditionsContent } from "@/designUI/utilities/content/termsAndConditions";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { storyContent } from "@/designUI/utilities/content/story";
import { servicesContent } from "@/designUI/utilities/content/services";
import { footerContent } from "@/designUI/utilities/content/footer";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { journeyContent } from "@/designUI/utilities/content/journey";
import { heroContent } from "@/designUI/utilities/content/hero";
import { privacyPolicyContent } from "@/designUI/utilities/content/privacyPolicy";
import { projectsContent } from "@/designUI/utilities/content/projects";
import { recentDesignContent } from "@/designUI/utilities/content/recentDesign";

// Sections that were never saved through the admin form still ship live from
// these local fallbacks (see useSectionContent), so they must be scanned too.
const DEFAULT_CONTENTS: unknown[] = [
  featureContent,
  topBarContent,
  blogListContent,
  blogContent,
  caseStudyContent,
  blogDetailsContent,
  termsAndConditionsContent,
  personalInfoContent,
  storyContent,
  servicesContent,
  footerContent,
  featuredProjectsContent,
  journeyContent,
  heroContent,
  privacyPolicyContent,
  projectsContent,
  recentDesignContent,
];

function containsUrl(value: unknown, url: string): boolean {
  if (typeof value === "string") return value === url;
  if (Array.isArray(value)) return value.some((item) => containsUrl(item, url));
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => containsUrl(item, url));
  }
  return false;
}

export async function isFileInUse(url: string): Promise<boolean> {
  if (DEFAULT_CONTENTS.some((content) => containsUrl(content, url))) return true;

  const [sections, posts, projects] = await Promise.all([
    getAllSectionContentDocs().catch(() => []),
    getAllPostsForDashboard().catch(() => []),
    getAllProjectsForDashboard().catch(() => []),
  ]);

  return (
    sections.some((section) => containsUrl(section, url)) ||
    posts.some((post) => containsUrl(post, url)) ||
    projects.some((project) => containsUrl(project, url))
  );
}
