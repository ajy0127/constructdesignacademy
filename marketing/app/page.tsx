import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <About />
      <Experience />
    </main>
  );
}