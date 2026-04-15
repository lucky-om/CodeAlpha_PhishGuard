// Coded by Lucky
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col gap-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
