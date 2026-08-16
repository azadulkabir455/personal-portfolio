import { notFound, redirect } from "next/navigation";
import { getPostBySlug } from "@/firebase/blogService";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) notFound();
  if (post.type === "external") redirect(post.externalUrl);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 data-aos="fade-up" className="text-3xl font-semibold sm:text-4xl">
        {post.title}
      </h1>
      <article
        data-aos="fade-up"
        data-aos-delay="100"
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
