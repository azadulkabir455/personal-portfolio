import { notFound } from "next/navigation";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { getProjectById } from "@/firebase/projectService";
import { isFirebaseConfigured } from "@/firebase/config";
import AddProjectForm from "@/designUI/admin/sections/AddProjectForm/AddProjectForm";

export default async function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = decodeURIComponent(slug);
  const project = isFirebaseConfigured ? await getProjectById(id) : null;
  const fallbackProject = featuredProjectsContent.projects.find((item) => item.id === id);
  const resolved = project ?? fallbackProject;

  if (!resolved) return notFound();

  return (
    <AddProjectForm
      heading="Edit Project"
      existingProjectId={project ? project.id : undefined}
      defaultValues={{
        title: resolved.title,
        description: resolved.description,
        image: resolved.image,
        tags: resolved.tags,
        ctaLabel: resolved.ctaLabel ?? "",
        ctaLink: resolved.ctaLink ?? "",
        secondaryCtaLabel: resolved.secondaryCta?.label ?? "",
        secondaryCtaHref: resolved.secondaryCta?.href ?? "",
      }}
    />
  );
}
