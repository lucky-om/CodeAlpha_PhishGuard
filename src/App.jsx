/* coded by lucky */
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Encyclopedia from './pages/Encyclopedia';
import Simulation from './pages/Simulation';
import Analysis from './pages/Analysis';
import Quiz from './pages/Quiz';
import Prevention from './pages/Prevention';
import Documentation from './pages/Documentation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

function App() {
  const location = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.99, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.01, filter: 'blur(10px)' }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encyclopedia" element={<Encyclopedia />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/analyzer" element={<Analysis />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/prevention" element={<Prevention />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Motion.div>
      </AnimatePresence>
    </Layout>
  )
}

export default App
