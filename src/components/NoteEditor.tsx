import { useState, useRef } from 'react'
import { ArrowLeft, Download, Image as ImageIcon } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import type { Note } from '../types'

interface NoteEditorProps {
  note: Note
  onSave: (note: Note) => void
  onBack: () => void
  onNew: () => void
}

const fontOptions = [
  { value: 'Inter', label: 'Inter (Modern Sans)' },
  { value: 'Merriweather', label: 'Merriweather (Classic Serif)' },
  { value: 'Playfair Display', label: 'Playfair Display (Elegant Serif)' },
  { value: 'Fira Code', label: 'Fira Code (Monospace)' },
  { value: 'Dancing Script', label: 'Dancing Script (Cursive)' },
  { value: 'Fredoka One', label: 'Fredoka One (Retro Fun)' },
  { value: 'Righteous', label: 'Righteous (Vintage)' },
  { value: 'Griffy', label: 'Griffy (Old Style)' },
  { value: 'Rye', label: 'Rye (Western)' },
  { value: 'Creepster', label: 'Creepster (Spooky)' },
  { value: 'Nosifer', label: 'Nosifer (Horror)' }
]

const fontSizes = [
  { value: '14px', label: 'Small (14px)' },
  { value: '16px', label: 'Medium (16px)' },
  { value: '18px', label: 'Large (18px)' },
  { value: '20px', label: 'Extra Large (20px)' }
]

export function NoteEditor({ note, onSave, onBack, onNew }: NoteEditorProps) {
  const [currentNote, setCurrentNote] = useState<Note>(note)
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update content when note prop changes (for editing existing notes)
  useState(() => {
    setCurrentNote(note)
    if (editorRef.current) {
      editorRef.current.innerHTML = note.content
    }
  })

  const updateNote = (updates: Partial<Note>) => {
    setCurrentNote(prev => ({ ...prev, ...updates }))
  }

  const handleSave = () => {
    const content = editorRef.current?.innerHTML || ''
    onSave({ ...currentNote, content, updatedAt: new Date().toISOString() })
  }

  const handleExport = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${currentNote.title}</title>
        <style>
          body {
            font-family: ${currentNote.fontFamily}, sans-serif;
            font-size: ${currentNote.fontSize};
            line-height: 1.6;
            color: ${currentNote.textColor};
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
          }
        </style>
      </head>
      <body>
        <h1>${currentNote.title}</h1>
        <div>${editorRef.current?.innerHTML || ''}</div>
      </body>
      </html>
    `
    
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentNote.title || 'note'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = `<img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 10px 0;" />`
        if (editorRef.current) {
          editorRef.current.innerHTML += img
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-8">
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

      {/* Top Bar - First Element */}
      <div className="w-full max-w-7xl mt-4 mb-4 glass-warm border border-white/20 px-6 py-4 flex items-center justify-between rounded-3xl relative z-10 shadow-lg">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-vintage-light hover:text-white transition-colors duration-200 glass-subtle px-3 py-2 rounded-lg hover:glass-hover"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Thoughts</span>
        </button>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onNew}
            className="px-4 py-2 glass-subtle text-vintage-light rounded-lg hover:glass-hover transition-all duration-200 font-medium hover:transform hover:scale-105"
          >
            New Thought
          </button>
          <button
            onClick={handleExport}
            className="text-vintage-light hover:text-white transition-colors duration-200 glass-subtle p-2 rounded-lg hover:glass-hover hover:transform hover:scale-105"
            title="Export as HTML"
          >
            <Download size={18} />
          </button>
          <button
            onClick={handleSave}
            className="glass-card text-vintage-light px-4 py-2 rounded-lg hover:glass-hover transition-all duration-200 text-sm font-medium hover:transform hover:scale-105 border border-white/30"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main Container - Sidebar and Writing Area */}
      <div className="w-full max-w-7xl flex-1 glass-card rounded-3xl flex relative z-10 shadow-2xl">
        {/* Sidebar Controls */}
        <div className="w-80 glass-sidebar flex flex-col rounded-l-3xl border-r border-white/20">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/20">
            <h2 className="text-lg font-semibold text-vintage-deep-grey mb-2">Style Your Thought</h2>
            <p className="text-sm text-vintage-medium-grey">Customize the appearance of your writing</p>
          </div>

          {/* Writing Style */}
          <div className="p-6 border-b border-white/20">
            <h3 className="text-sm font-semibold text-vintage-deep-grey mb-4 uppercase tracking-wide">Writing Style</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-vintage-medium-grey mb-2 uppercase tracking-wide">Font Family</label>
                <Select.Root
                  value={currentNote.fontFamily}
                  onValueChange={(value) => updateNote({ fontFamily: value })}
                >
                  <Select.Trigger className="w-full px-4 py-3 glass-subtle border border-white/20 rounded-xl text-sm flex items-center justify-between hover:glass-hover transition-all duration-200 text-vintage-deep-grey">
                    <Select.Value />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="glass-warm border border-white/30 rounded-xl shadow-lg z-50 backdrop-blur-xl">
                      <Select.Viewport className="p-2">
                        {fontOptions.map((option) => (
                          <Select.Item
                            key={option.value}
                            value={option.value}
                            className="px-3 py-2 text-sm cursor-pointer hover:glass-subtle rounded-lg text-vintage-deep-grey"
                          >
                            <Select.ItemText>{option.label}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div>
                <label className="block text-xs font-medium text-vintage-medium-grey mb-2 uppercase tracking-wide">Font Size</label>
                <Select.Root
                  value={currentNote.fontSize}
                  onValueChange={(value) => updateNote({ fontSize: value })}
                >
                  <Select.Trigger className="w-full px-4 py-3 glass-subtle border border-white/20 rounded-xl text-sm flex items-center justify-between hover:glass-hover transition-all duration-200 text-vintage-deep-grey">
                    <Select.Value />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="glass-warm border border-white/30 rounded-xl shadow-lg z-50 backdrop-blur-xl">
                      <Select.Viewport className="p-2">
                        {fontSizes.map((option) => (
                          <Select.Item
                            key={option.value}
                            value={option.value}
                            className="px-3 py-2 text-sm cursor-pointer hover:glass-subtle rounded-lg text-vintage-deep-grey"
                          >
                            <Select.ItemText>{option.label}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-vintage-deep-grey mb-4 uppercase tracking-wide">Media</h3>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 border-2 border-dashed border-vintage-medium-grey/50 rounded-xl text-center hover:border-vintage-medium-grey transition-all duration-200 group"
            >
              <ImageIcon size={24} className="mx-auto mb-2 text-vintage-medium-grey group-hover:text-vintage-deep-grey transition-colors duration-200" />
              <p className="text-sm font-medium text-vintage-deep-grey group-hover:text-vintage-darkbrown transition-colors duration-200">Add Image</p>
              <p className="text-xs text-vintage-medium-grey">Click to upload</p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col rounded-r-3xl">
          {/* Title Input */}
          <div className="p-8 border-b-2 border-white/20">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => updateNote({ title: e.target.value })}
              placeholder="Your thought title goes here..."
              className="w-full text-3xl font-light text-vintage-light bg-transparent border-none outline-none placeholder-vintage-light/60"
            />
          </div>

          {/* Content Editor */}
          <div className="flex-1 p-8">
            <div
              ref={editorRef}
              contentEditable
              dangerouslySetInnerHTML={{ __html: currentNote.content }}
              className="min-h-full outline-none text-lg leading-relaxed"
              style={{
                fontFamily: currentNote.fontFamily,
                fontSize: currentNote.fontSize,
                color: currentNote.textColor
              }}
              data-placeholder="Start writing your amazing thoughts here..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}