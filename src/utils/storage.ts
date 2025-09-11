import type { Note } from '../types'

const NOTES_STORAGE_KEY = 'vintage-notes'

export const notesStorage = {
  // Get all notes from localStorage
  getAllNotes(): Note[] {
    try {
      const notes = localStorage.getItem(NOTES_STORAGE_KEY)
      return notes ? JSON.parse(notes) : []
    } catch (error) {
      console.error('Error loading notes:', error)
      return []
    }
  },

  // Save a note to localStorage
  saveNote(note: Note): void {
    try {
      const notes = this.getAllNotes()
      const existingIndex = notes.findIndex(n => n.id === note.id)
      
      if (existingIndex >= 0) {
        notes[existingIndex] = { ...note, updatedAt: new Date().toISOString() }
      } else {
        notes.push(note)
      }
      
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes))
    } catch (error) {
      console.error('Error saving note:', error)
    }
  },

  // Delete a note from localStorage
  deleteNote(id: string): void {
    try {
      const notes = this.getAllNotes()
      const filteredNotes = notes.filter(note => note.id !== id)
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filteredNotes))
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  },

  // Get a specific note by ID
  getNoteById(id: string): Note | undefined {
    const notes = this.getAllNotes()
    return notes.find(note => note.id === id)
  }
}

// Create a new empty note
export function createEmptyNote(): Note {
  return {
    id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: '',
    content: '',
    background: 'white',
    fontFamily: 'Inter',
    fontSize: '16px',
    textColor: '#333333',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}
