import { useState, useMemo } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import StatsPanel from './components/StatsPanel';
import ExamSection from './components/ExamSection';
import FinalResult from './components/FinalResult';
import './App.css';

let nextId = 1;

export default function App() {
  const [notes, setNotes] = useState([]);
  const [exam, setExam] = useState(null);

  function handleAddNote(note) {
    setNotes(prev => [...prev, { ...note, id: nextId++ }]);
  }

  function handleDeleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  function handleSetExam(examData) {
    setExam(examData);
  }

  function handleRemoveExam() {
    setExam(null);
  }

  const totalWeight = useMemo(() => {
    return notes.reduce((sum, n) => sum + n.weight, 0);
  }, [notes]);

  const weightedSum = useMemo(() => {
    return notes.reduce((sum, n) => sum + n.grade * n.weight, 0);
  }, [notes]);

  const noteAverage = useMemo(() => {
    if (notes.length === 0 || totalWeight === 0) return 0;
    return weightedSum / totalWeight;
  }, [notes, totalWeight, weightedSum]);

  const finalAverage = useMemo(() => {
    if (!exam) return noteAverage;
    const total = totalWeight + exam.weight;
    if (total === 0) return 0;
    return (weightedSum + exam.grade * exam.weight) / total;
  }, [noteAverage, exam, totalWeight, weightedSum]);

  const availableWeight = exam ? 100 - exam.weight : 100;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="layout">
          <div className="layout-left">
            <NoteForm onAddNote={handleAddNote} />
            <NoteList notes={notes} onDeleteNote={handleDeleteNote} />
          </div>
          <div className="layout-right">
            <StatsPanel
              noteAverage={noteAverage}
              totalWeight={totalWeight}
              notesCount={notes.length}
              examActive={!!exam}
              availableWeight={availableWeight}
            />
            <ExamSection
              exam={exam}
              onSetExam={handleSetExam}
              onRemoveExam={handleRemoveExam}
              noteTotalWeight={totalWeight}
            />
            <FinalResult
              noteAverage={noteAverage}
              finalAverage={finalAverage}
              exam={exam}
              totalWeight={totalWeight}
              notesCount={notes.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
