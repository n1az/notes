export interface Note {
  id: string
  title: string
  content: string
  background: 'white' | 'grey-paper' | 'beige-dotted' | 'notebook'
  fontFamily: string
  fontSize: string
  textColor: string
  createdAt: string
  updatedAt: string
}

export interface NoteStyle {
  background: Note['background']
  fontFamily: string
  fontSize: string
  textColor: string
}

export type ViewMode = 'dashboard' | 'editor' | 'reader'
