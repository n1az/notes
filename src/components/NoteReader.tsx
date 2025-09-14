import { ArrowLeft, Edit3, Trash2, Download } from 'lucide-react'
import type { Note } from '../types'

interface NoteReaderProps {
  note: Note
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export function NoteReader({ note, onBack, onEdit, onDelete }: NoteReaderProps) {
  const handleExport = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${note.title}</title>
        <style>
          body { 
            font-family: ${note.fontFamily}; 
            font-size: ${note.fontSize}; 
            color: ${note.textColor};
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
          }
          h1 { color: #654321; margin-bottom: 1rem; }
          .meta { color: #8B4513; font-size: 0.9em; margin-bottom: 2rem; }
        </style>
      </head>
      <body>
        <h1>${note.title}</h1>
        <div class="meta">
          Created: ${new Date(note.createdAt).toLocaleDateString()} | 
          Updated: ${new Date(note.updatedAt).toLocaleDateString()}
        </div>
        <div>${note.content}</div>
      </body>
      </html>
    `
    
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${note.title || 'note'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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

      {/* Header Navigation */}
      <header className="glass-warm border-b border-white/20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-vintage-light hover:text-white transition-colors duration-200 glass-subtle px-3 py-2 rounded-lg hover:glass-hover"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 text-sm text-vintage-light">
            <span>#001</span>
            <span>•</span>
            <span>READING</span>
            <span>•</span>
            <span>#001</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="text-vintage-light hover:text-white transition-colors duration-200 glass-subtle p-2 rounded-lg hover:glass-hover hover:scale-105"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={handleExport}
              className="text-vintage-light hover:text-white transition-colors duration-200 glass-subtle p-2 rounded-lg hover:glass-hover hover:scale-105"
            >
              <Download size={18} />
            </button>
            <button
              onClick={onDelete}
              className="text-red-400 hover:text-red-300 transition-colors duration-200 glass-subtle p-2 rounded-lg hover:glass-hover hover:scale-105"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Article Container with Glass Effect */}
        <div className="glass-warm rounded-2xl p-8 animate-slide-in-up">
          {/* Article Header */}
          <header className="text-center mb-16 border-b border-white/20 pb-16">
            <h1 className="text-6xl md:text-7xl font-serif font-normal text-vintage-light mb-8 leading-tight tracking-tight">
              {note.title || 'Untitled Note'}
            </h1>
            
            <div className="flex items-center justify-center gap-8 text-sm text-vintage-light/80 uppercase tracking-wide">
              <span>Published {new Date(note.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              {note.updatedAt !== note.createdAt && (
                <>
                  <span>•</span>
                  <span>Updated {new Date(note.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </>
              )}
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-xl prose-gray max-w-none">
            <div
              style={{
                fontFamily: note.fontFamily,
                fontSize: note.fontSize,
                color: note.textColor,
                lineHeight: '1.8'
              }}
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: note.content || '<p class="text-vintage-light/70 italic text-center py-16">This note is empty.</p>' 
              }}
            />
          </article>

          {/* Article Footer */}
          <footer className="mt-20 pt-12 border-t border-white/20">
            <div className="flex items-center justify-between text-sm text-vintage-light/80">
              <div className="flex items-center gap-4">
                <span>Font: {note.fontFamily}</span>
                <span>•</span>
                <span>Size: {note.fontSize}</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <span>Color:</span>
                  <div 
                    className="w-4 h-4 rounded border border-white/30"
                    style={{ backgroundColor: note.textColor }}
                  />
                </div>
              </div>
              <div className="italic text-vintage-light">
                @yourthoughts
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
