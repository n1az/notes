import { PlusCircle, FileText, Calendar } from 'lucide-react'
import type { Note } from '../types'
import { cn } from '../lib/utils'

interface DashboardProps {
  notes: Note[]
  onCreateNote: () => void
  onSelectNote: (note: Note) => void
  onViewAllNotes?: () => void
  onViewAllWorks?: () => void
  onCreateWork?: () => void
}

export function Dashboard({ notes, onCreateNote, onSelectNote, onViewAllNotes, onViewAllWorks, onCreateWork }: DashboardProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-800/30 to-slate-900/50 animate-gradient-shift"></div>
        
        {/* Twinkling Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-star-twinkle" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-blue-200 rounded-full animate-star-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 left-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-star-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-star-twinkle" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-100 rounded-full animate-star-twinkle" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-60 right-1/3 w-1.5 h-1.5 bg-purple-200 rounded-full animate-star-twinkle" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-star-twinkle" style={{animationDelay: '6s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-star-twinkle" style={{animationDelay: '7s'}}></div>
          <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-white rounded-full animate-star-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-10 left-2/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-star-twinkle" style={{animationDelay: '8s'}}></div>
        </div>
        
        {/* Moon */}
        <div className="absolute top-16 right-16 w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 animate-celestial-float shadow-lg">
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gray-500/30"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gray-500/40"></div>
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-gray-600/50"></div>
          <div className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full bg-gray-600/40"></div>
        </div>
        
        {/* Saturn */}
        <div className="absolute bottom-20 left-16 animate-celestial-float" style={{animationDelay: '6s'}}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 border-2 border-yellow-200/60 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-0.5 border border-yellow-100/40 rounded-full"></div>
          </div>
        </div>
        
        {/* Flying Space Objects */}
        <div className="absolute top-1/4 w-8 h-8 bg-gradient-to-r from-purple-500/40 to-blue-500/30 rounded-full animate-fly-across" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/2 w-6 h-6 bg-gradient-to-r from-cyan-500/40 to-indigo-500/30 rounded-full animate-fly-across" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 w-10 h-10 bg-gradient-to-r from-violet-500/40 to-purple-500/30 rounded-full animate-fly-across" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 w-4 h-4 bg-blue-500/40 transform rotate-45 animate-fly-across" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-2/3 w-5 h-5 bg-indigo-500/40 transform rotate-12 animate-fly-across" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Retro Header */}
        <header className="text-center mb-20 relative">
          {/* NMT branding in top right corner */}
          <div className="absolute top-0 right-0 font-liham text-2xl text-vintage-light tracking-widest">
            NMT
          </div>
          
          {/* Layout: MD NIAZ MORSHED and think in same container with aligned right edges */}
          <div className="relative inline-block mb-8">
            {/* MD NIAZ MORSHED positioned above and right-aligned with think */}
            <div className="text-right mb-12">
              <div className="font-metanoia text-vintage-light text-md tracking-wide">MD NIAZ</div>
              <div className="font-metanoia text-vintage-light text-md tracking-wide">MORSHED</div>
            </div>
            
            {/* Main title */}
            <h1 className="text-8xl md:text-9xl font-hangout font-bold text-vintage-light mb-8 tracking-wider drop-shadow-lg">
              think
            </h1>
            
            {/* PERSONAL MINDSCAPE moved down with more spacing */}
            <div className="text-center mt-8">
              <p className="text-2xl font-metanoia text-vintage-light leading-relaxed">
                PERSONAL MINDSCAPE
              </p>
            </div>
          </div>
        </header>

        {/* Recent Thinks Section */}

        {/* Retro Notes Grid */}
        <div className="mb-16">
          <h2 className="text-lg font-helvetica-world text-vintage-light mb-8 text-center tracking-wider">
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
              
              <h3 className="text-4xl font-metanoia font-bold text-vintage-light mb-4">No Notes Yet!</h3>
              <p className="text-vintage-light/80 max-w-md mx-auto text-lg leading-relaxed font-bauhaus">
                "The first page is always the hardest to fill..."
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Show only first 2 notes */}
              {notes.slice(0, 2).map((note, index) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className={cn(
                    "group glass-card cursor-pointer",
                    "hover:glass-hover transition-all duration-300 ease-out",
                    "relative overflow-hidden animate-slide-in-up",
                    "hover:transform hover:scale-[1.02] hover:-translate-y-1"
                  )}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-vintage-gold/5 via-transparent to-vintage-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 p-6">
                    {/* Note Title */}
                    <h3 className="font-metanoia font-bold text-lg text-vintage-light mb-3 line-clamp-2 group-hover:text-white transition-colors duration-200">
                      {note.title || 'Untitled Note'}
                    </h3>
                    
                    {/* Note Preview */}
                    <p className="font-bauhaus text-vintage-light/80 text-sm mb-4 line-clamp-4 leading-relaxed group-hover:text-vintage-light transition-colors duration-200">
                      {getPreview(note.content) || 'No content yet...'}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/20">
                      <div className="flex items-center gap-2 text-vintage-light/70 group-hover:text-vintage-light transition-colors duration-200">
                        <Calendar size={12} />
                        <span className="font-mono">{formatDate(note.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-vintage-light/70 group-hover:text-vintage-light font-mono text-xs uppercase transition-colors duration-200">{note.fontFamily}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Diagonal Split Add Card */}
              <div className="glass-subtle relative overflow-hidden min-h-[200px] animate-slide-in-up border-2 border-dashed border-vintage-gold/30 hover:border-vintage-gold/50 transition-all duration-300 group"
                   style={{animationDelay: `${Math.min(notes.length, 2) * 100}ms`}}>
                
                {/* Left side - View All */}
                <button className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-4 hover:bg-vintage-gold/10 transition-all duration-300 group/left z-10"
                        onClick={() => onViewAllNotes?.()}>
                  <FileText size={32} className="text-vintage-light/70 group-hover/left:text-vintage-gold transition-all duration-300 mb-2 transform group-hover/left:scale-110" />
                  <h4 className="font-metanoia font-bold text-sm text-vintage-light group-hover/left:text-white transition-colors duration-200">View All</h4>
                  <p className="font-bauhaus text-xs text-vintage-light/70 group-hover/left:text-vintage-light transition-colors duration-200">Browse thinks</p>
                </button>
                
                {/* Right side - Add New */}
                <button className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-4 hover:bg-vintage-orange/10 transition-all duration-300 group/right z-10"
                        onClick={onCreateNote}>
                  <PlusCircle size={32} className="text-vintage-light/70 group-hover/right:text-vintage-orange transition-all duration-300 mb-2 transform group-hover/right:scale-110" />
                  <h4 className="font-metanoia font-bold text-sm text-vintage-light group-hover/right:text-white transition-colors duration-200">Add New</h4>
                  <p className="font-bauhaus text-xs text-vintage-light/70 group-hover/right:text-vintage-light transition-colors duration-200">Start writing</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MY WORKS Section */}
        <div className="mb-8">
          <h2 className="text-lg font-helvetica-world text-vintage-light mb-8 text-center tracking-wider">
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
                  "group glass-card cursor-pointer",
                  "hover:glass-hover transition-all duration-300 ease-out",
                  "relative overflow-hidden",
                  "hover:transform hover:scale-[1.02] hover:-translate-y-1",
                  "animate-slide-in-up"
                )}
                style={{animationDelay: `${(index + notes.length + 1) * 100}ms`}}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-vintage-gold/10 via-transparent to-vintage-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 p-6">
                  <h3 className="font-metanoia font-bold text-lg text-vintage-light mb-3 group-hover:text-white transition-colors duration-200">
                    {work.title}
                  </h3>
                  <p className="font-bauhaus text-vintage-light/80 text-sm mb-4 leading-relaxed group-hover:text-vintage-light transition-colors duration-200">
                    {work.description}
                  </p>
                  <div className="text-blue-400 font-bauhaus text-sm font-medium group-hover:text-blue-300 transition-colors duration-200">
                    Here is the github link
                  </div>
                </div>
              </div>
            ))}
            
            {/* Diagonal Split Add Card for Works */}
            <div className="glass-subtle relative overflow-hidden min-h-[200px] animate-slide-in-up border-2 border-dashed border-vintage-gold/30 hover:border-vintage-gold/50 transition-all duration-300 group"
                 style={{animationDelay: `${(2 + 2) * 100}ms`}}>
              
              {/* Left side - View All Works */}
              <button className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-4 hover:bg-vintage-gold/10 transition-all duration-300 group/left z-10"
                      onClick={() => onViewAllWorks?.()}>
                <FileText size={32} className="text-vintage-light/70 group-hover/left:text-vintage-gold transition-all duration-300 mb-2 transform group-hover/left:scale-110" />
                <h4 className="font-metanoia font-bold text-sm text-vintage-light group-hover/left:text-white transition-colors duration-200">View All</h4>
                <p className="font-bauhaus text-xs text-vintage-light/70 group-hover/left:text-vintage-light transition-colors duration-200">Browse works</p>
              </button>
              
              {/* Right side - Add New Work */}
              <button className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-4 hover:bg-vintage-sage/10 transition-all duration-300 group/right z-10"
                      onClick={() => onCreateWork?.()}>
                <PlusCircle size={32} className="text-vintage-light/70 group-hover/right:text-vintage-sage transition-all duration-300 mb-2 transform group-hover/right:scale-110" />
                <h4 className="font-metanoia font-bold text-sm text-vintage-light group-hover/right:text-white transition-colors duration-200">Add New</h4>
                <p className="font-bauhaus text-xs text-vintage-light/70 group-hover/right:text-vintage-light transition-colors duration-200">Showcase project</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
