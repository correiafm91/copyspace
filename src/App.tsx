
import { NotesProvider } from "./contexts/NotesContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import WelcomeScreen from "./components/WelcomeScreen";
import { Toaster } from "./components/ui/toaster";

const App = () => (
  <NotesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/new" element={<NoteEditor />} />
        <Route path="/edit/:id" element={<NoteEditor />} />
        <Route path="*" element={<Navigate to="/notes" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </NotesProvider>
);

export default App;
