
import { NotesProvider } from "./contexts/NotesContext";
import { TaskProvider } from "./contexts/TaskContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import WelcomeScreen from "./components/WelcomeScreen";
import TrashBin from "./pages/TrashBin";
import { Toaster } from "./components/ui/toaster";

const App = () => (
  <ThemeProvider>
    <NotesProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/new" element={<NoteEditor />} />
            <Route path="/edit/:id" element={<NoteEditor />} />
            <Route path="/trash" element={<TrashBin />} />
            <Route path="*" element={<Navigate to="/notes" replace />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </TaskProvider>
    </NotesProvider>
  </ThemeProvider>
);

export default App;
