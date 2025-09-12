import { useState, useEffect } from 'react'
import { Dashboard } from './components/Dashboard'
import { NoteEditor } from './components/NoteEditor'
import { NoteReader } from './components/NoteReader'
import { notesStorage, createEmptyNote } from './utils/storage'
import type { Note, ViewMode } from './types'

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard')
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)

  // Load notes from storage on mount
  useEffect(() => {
    const savedNotes = notesStorage.initializeWithSeedData()
    setNotes(savedNotes)
  }, [])

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + N for new note
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault()
        if (currentView === 'dashboard') {
          handleCreateNote()
        }
      }
      
      // Escape to go back to dashboard
      if (event.key === 'Escape' && currentView !== 'dashboard') {
        event.preventDefault()
        handleBackToDashboard()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentView])

  const handleCreateNote = () => {
    const newNote = createEmptyNote()
    setCurrentNote(newNote)
    setCurrentView('editor')
  }

  const handleSelectNote = (note: Note) => {
    setCurrentNote(note)
    setCurrentView('reader')
  }

  const handleEditNote = () => {
    if (currentNote) {
      setCurrentView('editor')
    }
  }

  const handleSaveNote = (note: Note) => {
    notesStorage.saveNote(note)
    setCurrentNote(note)
    
    // Update notes list
    const updatedNotes = notesStorage.getAllNotes()
    setNotes(updatedNotes)
    
    // Stay in editor or go back to dashboard
    setCurrentView('dashboard')
  }

  const handleDeleteNote = () => {
    if (currentNote) {
      notesStorage.deleteNote(currentNote.id)
      
      // Update notes list
      const updatedNotes = notesStorage.getAllNotes()
      setNotes(updatedNotes)
      
      // Go back to dashboard
      setCurrentNote(null)
      setCurrentView('dashboard')
    }
  }

  const handleBackToDashboard = () => {
    setCurrentNote(null)
    setCurrentView('dashboard')
  }

  const handleNewNote = () => {
    const newNote = createEmptyNote()
    setCurrentNote(newNote)
    // Stay in editor view
  }

  return (
    <div className="app">
      {currentView === 'dashboard' && (
        <Dashboard
          notes={notes}
          onCreateNote={handleCreateNote}
          onSelectNote={handleSelectNote}
        />
      )}
      
      {currentView === 'editor' && currentNote && (
        <NoteEditor
          note={currentNote}
          onSave={handleSaveNote}
          onBack={handleBackToDashboard}
          onNew={handleNewNote}
        />
      )}
      
      {currentView === 'reader' && currentNote && (
        <NoteReader
          note={currentNote}
          onBack={handleBackToDashboard}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  )
}

export default App
