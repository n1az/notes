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
    <div className="min-h-screen bg-vintage-cream vintage-paper relative">
      {/* Retro Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-vintage-rust animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-vintage-olive animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-vintage-orange transform rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-vintage-sage transform rotate-12"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Retro Header */}
        <header className="text-center mb-20 relative">
          {/* NMT branding in top right corner */}
          <div className="absolute top-0 right-0 font-liham text-2xl text-vintage-rust tracking-widest">
            NMT
          </div>
          
          {/* Layout: MD NIAZ MORSHED and think in same container with aligned right edges */}
          <div className="relative inline-block mb-8">
            {/* MD NIAZ MORSHED positioned above and right-aligned with think */}
            <div className="text-right mb-12">
              <div className="font-metanoia text-vintage-brown text-md tracking-wide">MD NIAZ</div>
              <div className="font-metanoia text-vintage-brown text-md tracking-wide">MORSHED</div>
            </div>
            
            {/* Main title */}
            <h1 className="text-8xl md:text-9xl font-hangout font-bold text-vintage-darkbrown mb-8 tracking-wider drop-shadow-lg">
              think
            </h1>
            
            {/* PERSONAL MINDSCAPE moved down with more spacing */}
            <div className="text-center mt-8">
              <p className="text-2xl font-metanoia text-vintage-brown leading-relaxed">
                PERSONAL MINDSCAPE
              </p>
              <div className="mx-auto mt-2 w-32 h-1 bg-vintage-gold rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Recent Thinks Section */}

        {/* Retro Notes Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-metanoia font-bold text-vintage-darkbrown mb-8 text-center tracking-wider">
            RECENT THINKS
          </h2>
          
          {notes.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="w-40 h-40 mx-auto bg-vintage-beige rounded-full flex items-center justify-center shadow-[8px_8px_0px_0px_theme(colors.vintage.brown)] border-4 border-vintage-brown">
                  <FileText size={64} className="text-vintage-rust" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-vintage-gold rounded-full border-4 border-vintage-cream"></div>
              </div>
              
              <h3 className="text-4xl font-metanoia font-bold text-vintage-brown mb-4">No Notes Yet!</h3>
              <p className="text-vintage-brown/80 max-w-md mx-auto text-lg leading-relaxed font-bauhaus italic">
                "The first page is always the hardest to fill..."
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note, index) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className={cn(
                    "group bg-vintage-cream border-4 border-vintage-brown rounded-lg p-6 cursor-pointer",
                    "shadow-[6px_6px_0px_0px_theme(colors.vintage.brown)]",
                    "hover:shadow-[3px_3px_0px_0px_theme(colors.vintage.brown)]",
                    "hover:translate-x-1 hover:translate-y-1",
                    "transition-all duration-200 ease-out transform-gpu",
                    "relative overflow-hidden",
                    // Vary the rotation slightly for each card
                    index % 3 === 0 ? "transform rotate-1" : index % 3 === 1 ? "transform -rotate-1" : ""
                  )}
                >
                  {/* Retro Corner Badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-vintage-rust rounded-full border-2 border-vintage-cream"></div>
                  
                  {/* Background Pattern Based on Note Style */}
                  <div 
                    className={cn(
                      "absolute inset-0 opacity-10",
                      note.background === 'grey-paper' && 'vintage-paper',
                      note.background === 'beige-dotted' && 'vintage-dotted',
                      note.background === 'notebook' && 'notebook-lines'
                    )}
                  />
                  
                  <div className="relative z-10">
                    {/* Note Title */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-metanoia font-bold text-xl text-vintage-darkbrown line-clamp-2 flex-1">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <ChevronRight 
                        size={24} 
                        className="text-vintage-brown group-hover:text-vintage-rust group-hover:translate-x-1 transition-all duration-200 ml-2 flex-shrink-0" 
                      />
                    </div>
                    
                    {/* Note Preview */}
                    <p className="font-bauhaus text-vintage-brown text-sm mb-6 line-clamp-3 leading-relaxed">
                      {getPreview(note.content) || 'No content yet...'}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-vintage-brown/80">
                        <Calendar size={12} />
                        <span className="font-mono">{formatDate(note.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border-2 border-vintage-brown shadow-sm"
                          style={{ backgroundColor: note.textColor }}
                        />
                        <span className="text-vintage-brown/60 font-mono text-xs uppercase">{note.fontFamily}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add New Note Card */}
              <div
                onClick={onCreateNote}
                className={cn(
                  "group bg-vintage-beige border-4 border-dashed border-vintage-brown rounded-lg p-6 cursor-pointer",
                  "shadow-[6px_6px_0px_0px_theme(colors.vintage.brown)]",
                  "hover:shadow-[3px_3px_0px_0px_theme(colors.vintage.brown)]",
                  "hover:translate-x-1 hover:translate-y-1",
                  "transition-all duration-200 ease-out transform-gpu",
                  "relative overflow-hidden flex items-center justify-center min-h-[200px]"
                )}
              >
                <div className="text-center">
                  <PlusCircle size={48} className="text-vintage-brown mx-auto mb-4 group-hover:rotate-90 transition-transform duration-300" />
                  <h3 className="font-metanoia font-bold text-xl text-vintage-brown mb-2">Add New Note</h3>
                  <p className="font-bauhaus text-vintage-brown/80 text-sm">Start writing your thoughts...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MY WORKS Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-giaza font-bold text-vintage-darkbrown mb-8 text-center tracking-wider">
            MY WORKS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample work cards - you can replace with actual data */}
            {[
              { title: "DOG VISION AI", description: "A Computer Vision project to train a model to detect dog breeds.", link: "#" },
              { title: "DOG VISION AI", description: "A Computer Vision project to train a model to detect dog breeds.", link: "#" }
            ].map((work, index) => (
              <div
                key={index}
                className={cn(
                  "group bg-gradient-to-br from-vintage-beige to-vintage-cream border-4 border-vintage-brown rounded-lg p-6 cursor-pointer",
                  "shadow-[6px_6px_0px_0px_theme(colors.vintage.brown)]",
                  "hover:shadow-[3px_3px_0px_0px_theme(colors.vintage.brown)]",
                  "hover:translate-x-1 hover:translate-y-1",
                  "transition-all duration-200 ease-out transform-gpu",
                  "relative overflow-hidden"
                )}
              >
                <div className="relative z-10">
                  <h3 className="font-metanoia font-bold text-xl text-vintage-darkbrown mb-4">
                    {work.title}
                  </h3>
                  <p className="font-bauhaus text-vintage-brown text-sm mb-4 leading-relaxed">
                    {work.description}
                  </p>
                  <div className="text-vintage-rust font-bauhaus text-sm">
                    Here is the github link
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Work Card */}
            <div
              className={cn(
                "group bg-vintage-beige border-4 border-dashed border-vintage-brown rounded-lg p-6 cursor-pointer",
                "shadow-[6px_6px_0px_0px_theme(colors.vintage.brown)]",
                "hover:shadow-[3px_3px_0px_0px_theme(colors.vintage.brown)]",
                "hover:translate-x-1 hover:translate-y-1",
                "transition-all duration-200 ease-out transform-gpu",
                "relative overflow-hidden flex items-center justify-center min-h-[200px]"
              )}
            >
              <div className="text-center">
                <PlusCircle size={48} className="text-vintage-brown mx-auto mb-4 group-hover:rotate-90 transition-transform duration-300" />
                <h3 className="font-metanoia font-bold text-xl text-vintage-brown mb-2">Add New Work</h3>
                <p className="font-bauhaus text-vintage-brown/80 text-sm">Showcase your projects...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
