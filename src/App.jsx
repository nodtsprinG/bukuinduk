import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SiswaRouting from "./Pages/Siswa/Home";
import AdminRouting from "./Pages/Admin/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminRouting />} />
        <Route path="/siswa/*" element={<SiswaRouting />} />
      </Routes>
    </Router>
  );
}

export default App;