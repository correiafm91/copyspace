
import { NotesProvider } from "./contexts/NotesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

const App = () => (
  <NotesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/new" element={<NoteEditor />} />
        <Route path="/edit/:id" element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  </NotesProvider>
);

export default App;
