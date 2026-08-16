import Link from "next/link";
import { getPublishedPosts } from "@/firebase/blogService";

function postHref(post: any) {
  return post.type === "external" ? post.externalUrl : `/blog/${post.slug}`;
}

export default async function BlogListPage() {
  let posts: any[] = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <h1 data-aos="fade-up" className="mb-10 text-3xl font-semibold sm:text-4xl">
        Blog
      </h1>

      {posts.length === 0 && (
        <p className="text-neutral-500">No posts published yet.</p>
      )}

      <div className="flex flex-col gap-8">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={postHref(post)}
            target={post.type === "external" ? "_blank" : undefined}
            rel={post.type === "external" ? "noopener noreferrer" : undefined}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className="group border-b border-neutral-200 pb-8"
          >
            <h2 className="text-xl font-medium group-hover:underline">
              {post.title}
            </h2>
            <p className="mt-2 text-neutral-500">{post.excerpt}</p>
            {post.type === "external" && (
              <span className="mt-2 inline-block text-xs uppercase tracking-wide text-neutral-400">
                via {post.externalPlatform}
              </span>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
