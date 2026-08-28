import BlogList from "@/designUI/sections/BlogList/BlogList";
import Footer from "@/designUI/sections/Footer/Footer";

export default function BlogListPage() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
