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
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>#001</span>
            <span>•</span>
            <span>READING</span>
            <span>•</span>
            <span>#001</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={handleExport}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Download size={18} />
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Article Header */}
        <header className="text-center mb-16 border-b border-gray-200 pb-16">
          <h1 className="text-6xl md:text-7xl font-serif font-normal text-gray-900 mb-8 leading-tight tracking-tight">
            {note.title || 'Untitled Note'}
          </h1>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 uppercase tracking-wide">
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
              __html: note.content || '<p class="text-gray-500 italic text-center py-16">This note is empty.</p>' 
            }}
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>Font: {note.fontFamily}</span>
              <span>•</span>
              <span>Size: {note.fontSize}</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span>Color:</span>
                <div 
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: note.textColor }}
                />
              </div>
            </div>
            <div className="italic">
              @yourthoughts
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
