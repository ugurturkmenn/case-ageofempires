import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import './App.scss'
import Header from "./components/Header/Header";
import { fetchUnit } from "./redux/actions";

const Home = lazy(() => import("./pages/Home"));
const Units = lazy(() => import("./pages/Units"));
const UnitDetail = lazy(() => import("./pages/UnitDetail"));

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Routes>
          <Route path="/" element={<Suspense fallback="loading"><Home /></Suspense>} />
          <Route path="/units" element={<Suspense fallback="loading"><Units /></Suspense>} />
          <Route path="/unit/:id" element={<Suspense fallback="loading"><UnitDetail /></Suspense>} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
