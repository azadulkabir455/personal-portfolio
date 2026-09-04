import { notFound } from "next/navigation";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import AddBlogForm from "@/designUI/admin/sections/AddBlogForm/AddBlogForm";

export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const href = decodeURIComponent(slug);
  const post = blogListContent.posts.find((item) => item.href === href);

  if (!post) return notFound();

  return (
    <AddBlogForm
      heading="Edit Blog"
      defaultValues={{
        title: post.title,
        subtitle: post.subtitle ?? post.excerpt,
        image: post.image,
        category: post.category,
        tags: post.tags ?? [],
        content: post.content ?? "",
      }}
    />
  );
}
