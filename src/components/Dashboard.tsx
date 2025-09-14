import { PlusCircle, FileText, Calendar } from 'lucide-react'
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
          <div className="absolute top-0 right-0 font-liham text-2xl text-vintage-deep-grey tracking-widest">
            NMT
          </div>
          
          {/* Layout: MD NIAZ MORSHED and think in same container with aligned right edges */}
          <div className="relative inline-block mb-8">
            {/* MD NIAZ MORSHED positioned above and right-aligned with think */}
            <div className="text-right mb-12">
              <div className="font-metanoia text-vintage-deep-grey text-md tracking-wide">MD NIAZ</div>
              <div className="font-metanoia text-vintage-deep-grey text-md tracking-wide">MORSHED</div>
            </div>
            
            {/* Main title */}
            <h1 className="text-8xl md:text-9xl font-hangout font-bold text-vintage-deep-grey mb-8 tracking-wider drop-shadow-lg">
              think
            </h1>
            
            {/* PERSONAL MINDSCAPE moved down with more spacing */}
            <div className="text-center mt-8">
              <p className="text-2xl font-metanoia text-vintage-deep-grey leading-relaxed">
                PERSONAL MINDSCAPE
              </p>
            </div>
          </div>
        </header>

        {/* Recent Thinks Section */}

        {/* Retro Notes Grid */}
        <div className="mb-16">
          <h2 className="text-lg font-helvetica-world font-bold text-vintage-deep-grey mb-8 text-center tracking-wider">
            RECENT THINKS
          </h2>
          
          {notes.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="w-40 h-40 mx-auto bg-gray-100 rounded-full flex items-center justify-center border-2 border-vintage-grey-border">
                  <FileText size={64} className="text-vintage-light-grey" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-vintage-deep-grey rounded-full border-4 border-white"></div>
              </div>
              
              <h3 className="text-4xl font-metanoia font-bold text-vintage-deep-grey mb-4">No Notes Yet!</h3>
              <p className="text-vintage-light-grey max-w-md mx-auto text-lg leading-relaxed font-bauhaus">
                "The first page is always the hardest to fill..."
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className={cn(
                    "group bg-white border-2 border-vintage-deep-grey rounded-lg p-6 cursor-pointer",
                    "hover:border-vintage-medium-grey hover:shadow-lg",
                    "transition-all duration-200 ease-out",
                    "relative overflow-hidden"
                  )}
                >
                  <div className="relative z-10">
                    {/* Note Title */}
                    <h3 className="font-metanoia font-bold text-lg text-vintage-deep-grey mb-3 line-clamp-2">
                      {note.title || 'Untitled Note'}
                    </h3>
                    
                    {/* Note Preview */}
                    <p className="font-bauhaus text-vintage-medium-grey text-sm mb-4 line-clamp-4 leading-relaxed">
                      {getPreview(note.content) || 'No content yet...'}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-vintage-light-grey/30">
                      <div className="flex items-center gap-2 text-vintage-light-grey">
                        <Calendar size={12} />
                        <span className="font-mono">{formatDate(note.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-vintage-light-grey font-mono text-xs uppercase">{note.fontFamily}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add New Note Card */}
              <div
                onClick={onCreateNote}
                className={cn(
                  "group bg-white border-2 border-dashed border-vintage-grey-border rounded-lg p-6 cursor-pointer",
                  "hover:border-vintage-medium-grey hover:bg-gray-50",
                  "transition-all duration-200 ease-out",
                  "relative overflow-hidden flex items-center justify-center min-h-[200px]"
                )}
              >
                <div className="text-center">
                  <PlusCircle size={48} className="text-vintage-light-grey mx-auto mb-4 group-hover:text-vintage-medium-grey transition-colors duration-300" />
                  <h3 className="font-metanoia font-bold text-lg text-vintage-deep-grey mb-2">Add New Note</h3>
                  <p className="font-bauhaus text-vintage-light-grey text-sm">Start writing your thoughts...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MY WORKS Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-giaza font-bold text-vintage-deep-grey mb-8 text-center tracking-wider">
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
                  "group border-2 border-vintage-deep-grey rounded-lg p-6 cursor-pointer",
                  "hover:border-vintage-medium-grey hover:shadow-lg",
                  "transition-all duration-200 ease-out",
                  "relative overflow-hidden",
                  // Different background colors for each card
                  index === 0 ? "bg-blue-100" : index === 1 ? "bg-rose-100" : "bg-green-100"
                )}
              >
                <div className="relative z-10">
                  <h3 className="font-metanoia font-bold text-lg text-vintage-deep-grey mb-3">
                    {work.title}
                  </h3>
                  <p className="font-bauhaus text-vintage-medium-grey text-sm mb-4 leading-relaxed">
                    {work.description}
                  </p>
                  <div className="text-blue-600 font-bauhaus text-sm font-medium">
                    Here is the github link
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Work Card */}
            <div
              className={cn(
                "group bg-white border-2 border-dashed border-vintage-grey-border rounded-lg p-6 cursor-pointer",
                "hover:border-vintage-medium-grey hover:bg-gray-50",
                "transition-all duration-200 ease-out",
                "relative overflow-hidden flex items-center justify-center min-h-[200px]"
              )}
            >
              <div className="text-center">
                <PlusCircle size={48} className="text-vintage-light-grey mx-auto mb-4 group-hover:text-vintage-medium-grey transition-colors duration-300" />
                <h3 className="font-metanoia font-bold text-lg text-vintage-deep-grey mb-2">Add New Work</h3>
                <p className="font-bauhaus text-vintage-light-grey text-sm">Showcase your projects...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
