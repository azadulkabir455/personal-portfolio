import { notFound } from "next/navigation";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import AddProjectForm from "@/designUI/admin/sections/AddProjectForm/AddProjectForm";

export default async function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = decodeURIComponent(slug);
  const project = featuredProjectsContent.projects.find((item) => item.id === id);

  if (!project) return notFound();

  return (
    <AddProjectForm
      heading="Edit Project"
      defaultValues={{
        title: project.title,
        description: project.description,
        image: project.image,
        tags: project.tags,
        ctaLabel: project.ctaLabel ?? "",
        ctaLink: project.ctaLink ?? "",
        secondaryCtaLabel: project.secondaryCta?.label ?? "",
        secondaryCtaHref: project.secondaryCta?.href ?? "",
      }}
    />
  );
}
