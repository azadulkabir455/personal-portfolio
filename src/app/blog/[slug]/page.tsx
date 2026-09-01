import BlogDetails from "@/designUI/sections/BlogDetails/BlogDetails";
import Footer from "@/designUI/sections/Footer/Footer";

export default function BlogDetailPage() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <BlogDetails />
      </main>
      <Footer />
    </>
  );
}
