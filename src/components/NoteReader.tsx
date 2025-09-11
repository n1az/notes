import { ArrowLeft, Edit3, Trash2, Download, Calendar } from 'lucide-react'
import type { Note } from '../types'
import { cn } from '../lib/utils'

interface NoteReaderProps {
  note: Note
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

const backgroundOptions = [
  { value: 'white', label: 'White Paper', className: 'bg-white' },
  { value: 'grey-paper', label: 'Grey Paper', className: 'bg-gray-50 vintage-paper' },
  { value: 'beige-dotted', label: 'Beige Dotted', className: 'bg-vintage-beige vintage-dotted' },
  { value: 'notebook', label: 'Notebook Lines', className: 'bg-white notebook-lines' }
]

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

  const getBackgroundClass = () => {
    const option = backgroundOptions.find(opt => opt.value === note.background)
    return option?.className || 'bg-white'
  }

  return (
    <div className="min-h-screen bg-vintage-cream">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-vintage-beige">
          <button
            onClick={onBack}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-vintage-brown hover:text-vintage-darkbrown",
              "transition-colors duration-200 font-medium"
            )}
          >
            <ArrowLeft size={20} />
            Back to Notes
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className={cn(
                "flex items-center gap-2 px-4 py-2 bg-vintage-brown text-vintage-cream",
                "rounded-lg hover:bg-vintage-darkbrown transition-colors duration-200",
                "font-medium text-sm"
              )}
            >
              <Edit3 size={16} />
              Edit
            </button>
            <button
              onClick={handleExport}
              className={cn(
                "flex items-center gap-2 px-4 py-2 bg-white text-vintage-brown",
                "border border-vintage-brown rounded-lg hover:bg-vintage-beige",
                "transition-colors duration-200 font-medium text-sm"
              )}
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={onDelete}
              className={cn(
                "flex items-center gap-2 px-4 py-2 bg-red-600 text-white",
                "rounded-lg hover:bg-red-700 transition-colors duration-200",
                "font-medium text-sm"
              )}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </header>

        {/* Note Content */}
        <article className="bg-white rounded-lg border border-vintage-beige shadow-sm overflow-hidden">
          {/* Note Header */}
          <div className="border-b border-vintage-beige p-8">
            <h1 className="text-4xl font-serif font-bold text-vintage-darkbrown mb-4 leading-tight">
              {note.title || 'Untitled Note'}
            </h1>
            <div className="flex items-center gap-6 text-sm text-vintage-brown">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Created {new Date(note.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {note.updatedAt !== note.createdAt && (
                <div className="flex items-center gap-2">
                  <span>•</span>
                  <span>Updated {new Date(note.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
            </div>
            
            {/* Style Information */}
            <div className="flex items-center gap-4 mt-4 text-xs text-vintage-brown opacity-75">
              <span className="capitalize">Font: {note.fontFamily}</span>
              <span>•</span>
              <span>Size: {note.fontSize}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span>Color:</span>
                <div 
                  className="w-3 h-3 rounded-full border border-vintage-beige"
                  style={{ backgroundColor: note.textColor }}
                />
              </div>
            </div>
          </div>

          {/* Note Body */}
          <div className={cn("p-8", getBackgroundClass())}>
            <div
              className="prose prose-lg max-w-none"
              style={{
                fontFamily: note.fontFamily,
                fontSize: note.fontSize,
                color: note.textColor
              }}
              dangerouslySetInnerHTML={{ __html: note.content || '<p class="text-gray-500 italic">This note is empty.</p>' }}
            />
          </div>
        </article>

        {/* Bottom spacing */}
        <div className="h-16"></div>
      </div>
    </div>
  )
}
