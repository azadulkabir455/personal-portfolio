import { notFound } from "next/navigation";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import { getPostBySlug } from "@/firebase/blogService";
import { isFirebaseConfigured } from "@/firebase/config";
import AddBlogForm from "@/designUI/admin/sections/AddBlogForm/AddBlogForm";

export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const href = decodeURIComponent(slug);
  const post = isFirebaseConfigured ? await getPostBySlug(href) : null;
  const fallbackPost = blogListContent.posts.find((item) => item.href === href);
  const resolved = post ?? fallbackPost;

  if (!resolved) return notFound();

  return (
    <AddBlogForm
      heading="Edit Blog"
      existingPost={post ? { id: post.id, href: post.href } : undefined}
      defaultValues={{
        title: resolved.title,
        subtitle: resolved.subtitle ?? resolved.excerpt,
        image: resolved.image,
        category: resolved.category,
        tags: resolved.tags ?? [],
        content: resolved.content ?? "",
      }}
    />
  );
}
