import { useState, useRef } from 'react'
import { ArrowLeft, Save, Plus, Download, Palette, Type, Image as ImageIcon } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import type { Note } from '../types'
import { cn } from '../lib/utils'

interface NoteEditorProps {
  note: Note
  onSave: (note: Note) => void
  onBack: () => void
  onNew: () => void
}

const backgroundOptions = [
  { value: 'white', label: 'White Paper', className: 'bg-white' },
  { value: 'grey-paper', label: 'Grey Paper', className: 'bg-gray-50 vintage-paper' },
  { value: 'beige-dotted', label: 'Beige Dotted', className: 'bg-vintage-beige vintage-dotted' },
  { value: 'notebook', label: 'Notebook Lines', className: 'bg-white notebook-lines' }
]

const fontOptions = [
  { value: 'Inter', label: 'Inter (Sans-serif)' },
  { value: 'Merriweather', label: 'Merriweather (Serif)' },
  { value: 'Fira Code', label: 'Fira Code (Monospace)' }
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

  const updateNote = (updates: Partial<Note>) => {
    setCurrentNote(prev => ({ ...prev, ...updates }))
  }

  const handleSave = () => {
    const content = editorRef.current?.innerHTML || ''
    const updatedNote = {
      ...currentNote,
      content,
      updatedAt: new Date().toISOString()
    }
    onSave(updatedNote)
  }

  const handleExport = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${currentNote.title}</title>
        <style>
          body { 
            font-family: ${currentNote.fontFamily}; 
            font-size: ${currentNote.fontSize}; 
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

  const getBackgroundClass = () => {
    const option = backgroundOptions.find(opt => opt.value === currentNote.background)
    return option?.className || 'bg-white'
  }

  return (
    <div className="min-h-screen bg-vintage-cream">
      <div className="max-w-5xl mx-auto px-6 py-8">
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
          <h1 className="text-2xl font-serif font-semibold text-vintage-darkbrown">
            Write Note
          </h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </header>

        {/* Toolbar */}
        <div className="bg-white rounded-lg border border-vintage-beige p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            {/* Background Selection */}
            <div className="flex items-center gap-2">
              <Palette size={16} className="text-vintage-brown" />
              <span className="text-sm font-medium text-vintage-darkbrown">Background:</span>
              <Select.Root
                value={currentNote.background}
                onValueChange={(value) => updateNote({ background: value as Note['background'] })}
              >
                <Select.Trigger className="px-3 py-2 bg-white border border-vintage-beige rounded text-sm min-w-[140px] flex items-center justify-between">
                  <Select.Value />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border border-vintage-beige rounded-lg shadow-lg z-50">
                    <Select.Viewport className="p-1">
                      {backgroundOptions.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-vintage-beige rounded"
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Font Family */}
            <div className="flex items-center gap-2">
              <Type size={16} className="text-vintage-brown" />
              <span className="text-sm font-medium text-vintage-darkbrown">Font:</span>
              <Select.Root
                value={currentNote.fontFamily}
                onValueChange={(value) => updateNote({ fontFamily: value })}
              >
                <Select.Trigger className="px-3 py-2 bg-white border border-vintage-beige rounded text-sm min-w-[140px] flex items-center justify-between">
                  <Select.Value />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border border-vintage-beige rounded-lg shadow-lg z-50">
                    <Select.Viewport className="p-1">
                      {fontOptions.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-vintage-beige rounded"
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Font Size */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-vintage-darkbrown">Size:</span>
              <Select.Root
                value={currentNote.fontSize}
                onValueChange={(value) => updateNote({ fontSize: value })}
              >
                <Select.Trigger className="px-3 py-2 bg-white border border-vintage-beige rounded text-sm min-w-[120px] flex items-center justify-between">
                  <Select.Value />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border border-vintage-beige rounded-lg shadow-lg z-50">
                    <Select.Viewport className="p-1">
                      {fontSizes.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-vintage-beige rounded"
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Text Color */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-vintage-darkbrown">Color:</span>
              <input
                type="color"
                value={currentNote.textColor}
                onChange={(e) => updateNote({ textColor: e.target.value })}
                className="w-8 h-8 rounded border border-vintage-beige cursor-pointer"
              />
            </div>

            {/* Image Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-vintage-brown text-vintage-cream rounded text-sm hover:bg-vintage-darkbrown transition-colors"
            >
              <ImageIcon size={16} />
              Add Image
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

        {/* Editor Container */}
        <div className="bg-white rounded-lg border border-vintage-beige shadow-sm overflow-hidden">
          {/* Title Input */}
          <div className="border-b border-vintage-beige p-6">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => updateNote({ title: e.target.value })}
              placeholder="Enter your note title..."
              className="w-full text-3xl font-serif font-bold text-vintage-darkbrown bg-transparent border-none outline-none placeholder-vintage-brown placeholder-opacity-50"
            />
            <div className="text-sm text-vintage-brown mt-2">
              Created {new Date(currentNote.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Editor */}
          <div 
            className={cn("min-h-[500px] p-6", getBackgroundClass())}
          >
            <div
              ref={editorRef}
              contentEditable
              dangerouslySetInnerHTML={{ __html: currentNote.content }}
              className="min-h-[450px] outline-none prose prose-lg max-w-none"
              style={{
                fontFamily: currentNote.fontFamily,
                fontSize: currentNote.fontSize,
                color: currentNote.textColor
              }}
              data-placeholder="Start writing your thoughts..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handleSave}
            className={cn(
              "flex items-center gap-2 px-6 py-3 bg-vintage-brown text-vintage-cream",
              "rounded-lg hover:bg-vintage-darkbrown transition-colors duration-200",
              "font-medium shadow-md hover:shadow-lg"
            )}
          >
            <Save size={20} />
            Save Note
          </button>
          <button
            onClick={onNew}
            className={cn(
              "flex items-center gap-2 px-6 py-3 bg-white text-vintage-brown",
              "border border-vintage-brown rounded-lg hover:bg-vintage-beige",
              "transition-colors duration-200 font-medium"
            )}
          >
            <Plus size={20} />
            New Note
          </button>
          <button
            onClick={handleExport}
            className={cn(
              "flex items-center gap-2 px-6 py-3 bg-white text-vintage-brown",
              "border border-vintage-brown rounded-lg hover:bg-vintage-beige",
              "transition-colors duration-200 font-medium"
            )}
          >
            <Download size={20} />
            Export HTML
          </button>
        </div>
      </div>
    </div>
  )
}
