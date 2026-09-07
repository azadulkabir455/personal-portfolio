import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "../src/firebase/auth";
import { saveSectionContent } from "../src/firebase/sectionContent";
import { createPost, getAllPostsForDashboard } from "../src/firebase/blogService";
import { createProject, getAllProjectsForDashboard } from "../src/firebase/projectService";

import { heroContent } from "../src/designUI/utilities/content/hero";
import { featureContent } from "../src/designUI/utilities/content/feature";
import { storyContent } from "../src/designUI/utilities/content/story";
import { journeyContent } from "../src/designUI/utilities/content/journey";
import { featuredProjectsContent } from "../src/designUI/utilities/content/featuredProjects";
import { recentDesignContent } from "../src/designUI/utilities/content/recentDesign";
import { caseStudyContent } from "../src/designUI/utilities/content/caseStudy";
import { servicesContent } from "../src/designUI/utilities/content/services";
import { footerContent } from "../src/designUI/utilities/content/footer";
import { topBarContent } from "../src/designUI/utilities/content/topbar";
import { privacyPolicyContent } from "../src/designUI/utilities/content/privacyPolicy";
import { termsAndConditionsContent } from "../src/designUI/utilities/content/termsAndConditions";
import { personalInfoContent } from "../src/designUI/utilities/content/personalInfo";
import { blogContent } from "../src/designUI/utilities/content/blog";
import { blogDetailsContent } from "../src/designUI/utilities/content/blogDetails";
import { blogListContent } from "../src/designUI/utilities/content/blogList";
import { projectsContent } from "../src/designUI/utilities/content/projects";

async function seedContentDocs() {
  await Promise.all([
    saveSectionContent("hero", heroContent),
    saveSectionContent("feature", featureContent),
    saveSectionContent("story", storyContent),
    saveSectionContent("journey", journeyContent),
    saveSectionContent("featuredProjects", {
      intro: featuredProjectsContent.intro,
      availableTags: featuredProjectsContent.availableTags,
      cta: featuredProjectsContent.cta,
    }),
    saveSectionContent("recentDesign", recentDesignContent),
    saveSectionContent("caseStudy", caseStudyContent),
    saveSectionContent("services", servicesContent),
    saveSectionContent("footer", footerContent),
    saveSectionContent("topbar", topBarContent),
    saveSectionContent("privacyPolicy", privacyPolicyContent),
    saveSectionContent("termsAndConditions", termsAndConditionsContent),
    saveSectionContent("personalInfo", personalInfoContent),
    saveSectionContent("blog", blogContent),
    saveSectionContent("blogDetails", blogDetailsContent),
    saveSectionContent("blogList", {
      categories: blogListContent.categories,
      suggestions: blogListContent.suggestions,
    }),
    saveSectionContent("projects", { intro: projectsContent.intro }),
  ]);
  console.log("Seeded content/* docs");
}

async function seedPosts() {
  const existing = await getAllPostsForDashboard();
  if (existing.length) {
    console.log(`Skipped posts seed — ${existing.length} post(s) already exist`);
    return;
  }

  for (const post of blogListContent.posts) {
    await createPost(post);
  }
  console.log(`Seeded ${blogListContent.posts.length} post(s)`);
}

async function seedProjects() {
  const existing = await getAllProjectsForDashboard();
  if (existing.length) {
    console.log(`Skipped projects seed — ${existing.length} project(s) already exist`);
    return;
  }

  for (const project of featuredProjectsContent.projects) {
    const { id, ...rest } = project;
    void id;
    await createProject(rest);
  }
  console.log(`Seeded ${featuredProjectsContent.projects.length} project(s)`);
}

async function signIn() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before seeding.");
  }
  await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  console.log(`Signed in as ${email}`);
}

async function main() {
  await signIn();
  await seedContentDocs();
  await seedPosts();
  await seedProjects();
  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
