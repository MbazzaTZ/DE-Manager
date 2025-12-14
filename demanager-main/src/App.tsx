import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ChannelManagement from "./pages/ChannelManagement";
// ...existing imports

function App() {
  return (
    <Routes>
      {/* ...existing routes... */}
      <Route path="/channel-management" element={<ProtectedRoute><ChannelManagement /></ProtectedRoute>} />
      {/* ...existing routes... */}
    </Routes>
  );
}

export default App;