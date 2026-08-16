import Hero from "@/designUI/sections/Hero/Hero";
import Feature from "@/designUI/sections/Feature/Feature";
import Story from "@/designUI/sections/Story/Story";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Feature />
      <Story />
    </main>
  );
}
