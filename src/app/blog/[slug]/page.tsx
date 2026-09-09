import { notFound } from "next/navigation";
import BlogDetails from "@/designUI/sections/BlogDetails/BlogDetails";
import Footer from "@/designUI/sections/Footer/Footer";
import { blogListContent } from "@/designUI/utilities/content/blogList";
import { getPostBySlug } from "@/firebase/blogService";
import { isFirebaseConfigured } from "@/firebase/config";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const href = `/blog/${decodeURIComponent(slug)}`;
  const post = isFirebaseConfigured ? await getPostBySlug(href) : null;
  const resolved = post ?? blogListContent.posts.find((item) => item.href === href);

  if (!resolved) return notFound();

  return (
    <>
      <main className="flex flex-1 flex-col">
        <BlogDetails post={resolved} />
      </main>
      <Footer />
    </>
  );
}
