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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Controls */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-medium text-gray-900">Design Your Page</h2>
            <div className="w-5"></div>
          </div>
        </div>

        {/* Font Selection */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Choose your font</h3>
          <Select.Root
            value={currentNote.fontFamily}
            onValueChange={(value) => updateNote({ fontFamily: value })}
          >
            <Select.Trigger className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm flex items-center justify-between">
              <Select.Value />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Select.Viewport className="p-1">
                  {fontOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded"
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          
          <div className="mt-4">
            <Select.Root
              value={currentNote.fontSize}
              onValueChange={(value) => updateNote({ fontSize: value })}
            >
              <Select.Trigger className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm flex items-center justify-between">
                <Select.Value />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Select.Viewport className="p-1">
                    {fontSizes.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded"
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

        {/* Text & Accent Colors */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Text & Accent Colors</h3>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'].map((color) => (
              <button
                key={color}
                onClick={() => updateNote({ textColor: color })}
                className={`w-10 h-10 rounded-full border-2 ${currentNote.textColor === color ? 'border-gray-900' : 'border-gray-200'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <input
            type="color"
            value={currentNote.textColor}
            onChange={(e) => updateNote({ textColor: e.target.value })}
            className="w-full h-10 rounded border border-gray-200 cursor-pointer"
          />
        </div>

        {/* Page Background */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Page Background</h3>
          <div className="grid grid-cols-3 gap-3">
            {backgroundOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateNote({ background: option.value as Note['background'] })}
                className={`h-16 rounded-lg border-2 ${currentNote.background === option.value ? 'border-blue-500' : 'border-gray-200'} ${option.className}`}
                title={option.label}
              />
            ))}
          </div>
        </div>

        {/* Insert Image */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Insert Image</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ImageIcon size={24} />
              <span className="text-sm">Upload Image</span>
            </button>
            <p className="text-xs text-gray-400 mt-2">Drag & Drop Image Here</p>
          </div>
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
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>My Notes</span>
            <span>•</span>
            <span>My Notes</span>
            <span>•</span>
            <span>Drafts</span>
            <span>•</span>
            <span>Published</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNew}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Plus size={18} />
            </button>
            <button
              onClick={handleExport}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handleSave}
              className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors text-sm font-medium"
            >
              Publish
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 bg-white m-6 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Title Input */}
          <div className="p-8 border-b border-gray-100">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => updateNote({ title: e.target.value })}
              placeholder="Your text goes here"
              className="w-full text-3xl font-light text-gray-900 bg-transparent border-none outline-none placeholder-gray-400"
            />
          </div>

          {/* Content Editor */}
          <div className={cn("p-8", getBackgroundClass())}>
            <div
              ref={editorRef}
              contentEditable
              dangerouslySetInnerHTML={{ __html: currentNote.content }}
              className="min-h-[400px] outline-none text-lg leading-relaxed text-gray-700"
              style={{
                fontFamily: currentNote.fontFamily,
                fontSize: currentNote.fontSize,
                color: currentNote.textColor
              }}
              data-placeholder="Start your amazing story here..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 text-sm text-gray-500 flex items-center justify-between">
          <span>Saved Automatically | Word Count: {editorRef.current?.textContent?.split(' ').length || 0}</span>
        </div>
      </div>
    </div>
  )
}
