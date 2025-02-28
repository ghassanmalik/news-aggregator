import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/layout";

const Home = React.lazy(() => import("./pages/Home"));

export default function App() {
  return (
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
              </Route>
          </Routes>
        </React.Suspense>
      </Router>
  );
}
