import { PlusCircle, FileText, Calendar, ChevronRight } from 'lucide-react'
import type { Note } from '../types'
import { cn } from '../lib/utils'

interface DashboardProps {
  notes: Note[]
  onCreateNote: () => void
  onSelectNote: (note: Note) => void
}

export function Dashboard({ notes, onCreateNote, onSelectNote }: DashboardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getPreview = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText
  }

  return (
    <div className="min-h-screen bg-vintage-cream vintage-paper">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-serif font-bold text-vintage-darkbrown mb-4 tracking-tight">
            My Notes
          </h1>
          <p className="text-xl text-vintage-brown font-light max-w-2xl mx-auto leading-relaxed">
            Your personal collection of thoughts and ideas, beautifully organized
          </p>
          <div className="w-24 h-1 bg-vintage-gold mx-auto mt-8 rounded-full"></div>
        </header>

        {/* Create Note Button */}
        <div className="text-center mb-12">
          <button
            onClick={onCreateNote}
            className={cn(
              "inline-flex items-center gap-3 px-8 py-4 bg-vintage-brown text-vintage-cream",
              "rounded-lg hover:bg-vintage-darkbrown transition-all duration-300",
              "font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            )}
          >
            <PlusCircle size={24} />
            Create New Note
          </button>
        </div>

        {/* Notes Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-semibold text-vintage-darkbrown mb-8 text-center">
            Your Notes
          </h2>
          
          {notes.length === 0 ? (
            <div className="text-center py-16">
              <FileText size={64} className="mx-auto text-vintage-brown mb-4 opacity-50" />
              <h3 className="text-2xl font-serif text-vintage-brown mb-2">No notes yet</h3>
              <p className="text-vintage-brown opacity-75 max-w-md mx-auto">
                Start your journey by creating your first note. Let your thoughts flow freely.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className={cn(
                    "bg-white border border-vintage-beige rounded-lg p-6 cursor-pointer",
                    "hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                    "group relative overflow-hidden"
                  )}
                >
                  {/* Background Pattern Based on Note Style */}
                  <div 
                    className={cn(
                      "absolute inset-0 opacity-30",
                      note.background === 'grey-paper' && 'vintage-paper',
                      note.background === 'beige-dotted' && 'vintage-dotted',
                      note.background === 'notebook' && 'notebook-lines'
                    )}
                  />
                  
                  <div className="relative z-10">
                    {/* Note Title */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif font-semibold text-lg text-vintage-darkbrown line-clamp-2 flex-1">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <ChevronRight 
                        size={20} 
                        className="text-vintage-brown opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" 
                      />
                    </div>
                    
                    {/* Note Preview */}
                    <p className="text-vintage-brown text-sm mb-4 line-clamp-3 leading-relaxed">
                      {getPreview(note.content) || 'No content yet...'}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-xs text-vintage-brown opacity-75">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(note.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: note.textColor }}
                        />
                        <span className="capitalize">{note.fontFamily}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
