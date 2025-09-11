// Blog Application JavaScript
class BlogApp {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        this.currentImageFile = null;
        this.currentView = 'dashboard';
        this.currentPostId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCurrentDate();
        this.showView('dashboard');
        this.renderNotesGrid();
        this.loadLastPost();
    }

    showView(viewName) {
        // Hide all views
        document.getElementById('dashboardView').style.display = 'none';
        document.getElementById('editorView').style.display = 'none';
        document.getElementById('readerView').style.display = 'none';
        
        // Show the requested view
        document.getElementById(viewName + 'View').style.display = 'block';
        this.currentView = viewName;

        // Update view-specific content
        if (viewName === 'dashboard') {
            this.renderNotesGrid();
        }
    }

    setupEventListeners() {
        // Navigation event listeners
        document.getElementById('addNoteBtn').addEventListener('click', () => {
            this.newPost();
            this.showView('editor');
        });

        document.getElementById('backToDashboard').addEventListener('click', () => {
            this.showView('dashboard');
        });

        document.getElementById('backToDashboardFromReader').addEventListener('click', () => {
            this.showView('dashboard');
        });

        document.getElementById('editNote').addEventListener('click', () => {
            if (this.currentPostId) {
                this.loadPost(this.currentPostId);
                this.showView('editor');
            }
        });

        document.getElementById('deleteNote').addEventListener('click', () => {
            if (this.currentPostId && confirm('Are you sure you want to delete this note?')) {
                this.deletePost(this.currentPostId);
                this.showView('dashboard');
            }
        });

        // Background theme selection
        document.getElementById('backgroundSelect').addEventListener('change', (e) => {
            this.changeBackground(e.target.value);
        });

        // Font controls
        document.getElementById('fontFamily').addEventListener('change', (e) => {
            this.changeFontFamily(e.target.value);
        });

        document.getElementById('fontSize').addEventListener('change', (e) => {
            this.changeFontSize(e.target.value);
        });

        document.getElementById('textColor').addEventListener('change', (e) => {
            this.changeTextColor(e.target.value);
        });

        // Image handling
        document.getElementById('addImageBtn').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });

        document.getElementById('imageInput').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Modal controls
        document.querySelector('.close').addEventListener('click', () => {
            this.closeImageModal();
        });

        document.getElementById('insertImage').addEventListener('click', () => {
            this.insertImage();
        });

        // Alignment buttons
        document.querySelectorAll('.alignment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectAlignment(e.currentTarget);
            });
        });

        // Image width slider
        document.getElementById('imageWidth').addEventListener('input', (e) => {
            document.getElementById('widthValue').textContent = e.target.value + 'px';
        });

        // Action buttons
        document.getElementById('savePost').addEventListener('click', () => {
            this.savePost();
        });

        document.getElementById('newPost').addEventListener('click', () => {
            this.newPost();
        });

        document.getElementById('exportPost').addEventListener('click', () => {
            this.exportPost();
        });

        // Editor formatting shortcuts
        document.getElementById('editor').addEventListener('keydown', (e) => {
            this.handleEditorShortcuts(e);
        });

        // Modal close on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('imageModal');
            if (e.target === modal) {
                this.closeImageModal();
            }
        });

        // Auto-save functionality
        setInterval(() => {
            this.autoSave();
        }, 30000); // Auto-save every 30 seconds
    }

    updateCurrentDate() {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('currentDate').textContent = dateString;
    }

    changeBackground(theme) {
        // Remove existing theme classes
        document.body.classList.remove('grey-paper', 'beige-dotted', 'notebook');
        
        // Add new theme class
        if (theme !== 'white') {
            document.body.classList.add(theme);
        }
    }

    changeFontFamily(font) {
        const editor = document.getElementById('editor');
        editor.style.fontFamily = font;
    }

    changeFontSize(size) {
        const editor = document.getElementById('editor');
        editor.style.fontSize = size + 'px';
    }

    changeTextColor(color) {
        const editor = document.getElementById('editor');
        editor.style.color = color;
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.currentImageFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('imagePreview');
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                this.showImageModal();
            };
            reader.readAsDataURL(file);
        }
    }

    showImageModal() {
        document.getElementById('imageModal').style.display = 'block';
        // Reset alignment selection
        document.querySelectorAll('.alignment-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-align="center"]').classList.add('active');
    }

    closeImageModal() {
        document.getElementById('imageModal').style.display = 'none';
        this.currentImageFile = null;
    }

    selectAlignment(button) {
        document.querySelectorAll('.alignment-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }

    insertImage() {
        if (!this.currentImageFile) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const alignment = document.querySelector('.alignment-btn.active').dataset.align;
            const width = document.getElementById('imageWidth').value;
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = width + 'px';
            img.className = `align-${alignment}`;
            img.alt = 'Blog image';

            // Insert image at cursor position
            const editor = document.getElementById('editor');
            const selection = window.getSelection();
            
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(img);
                
                // Add a line break after the image
                const br = document.createElement('br');
                range.setStartAfter(img);
                range.insertNode(br);
                range.setStartAfter(br);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                editor.appendChild(img);
                editor.appendChild(document.createElement('br'));
            }

            this.closeImageModal();
        };
        reader.readAsDataURL(this.currentImageFile);
    }

    handleEditorShortcuts(event) {
        // Bold: Ctrl+B
        if (event.ctrlKey && event.key === 'b') {
            event.preventDefault();
            document.execCommand('bold');
        }
        
        // Italic: Ctrl+I
        if (event.ctrlKey && event.key === 'i') {
            event.preventDefault();
            document.execCommand('italic');
        }
        
        // Underline: Ctrl+U
        if (event.ctrlKey && event.key === 'u') {
            event.preventDefault();
            document.execCommand('underline');
        }

        // Save: Ctrl+S
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.savePost();
        }
    }

    generatePostId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    savePost() {
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('editor').innerHTML;
        
        if (!title) {
            alert('Please enter a title for your note');
            return;
        }

        const post = {
            id: this.generatePostId(),
            title: title,
            content: content,
            date: new Date().toISOString(),
            preview: this.generatePreview(content)
        };

        this.posts.unshift(post);
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
        
        // Show success message
        this.showNotification('Note saved successfully!', 'success');
        
        // Return to dashboard after saving
        setTimeout(() => {
            this.showView('dashboard');
        }, 1000);
    }

    generatePreview(content) {
        // Remove HTML tags and get first 100 characters
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        return textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent;
    }

    loadPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            this.currentPostId = postId;
            document.getElementById('postTitle').value = post.title;
            document.getElementById('editor').innerHTML = post.content;
            this.showNotification('Post loaded successfully!', 'success');
        }
    }

    newPost() {
        // Reset the current post ID
        this.currentPostId = null;
        
        // Clear the form
        document.getElementById('postTitle').value = '';
        document.getElementById('editor').innerHTML = '';
        
        // Focus on title input
        setTimeout(() => {
            document.getElementById('postTitle').focus();
        }, 100);
    }

    exportPost() {
        const title = document.getElementById('postTitle').value || 'Untitled Post';
        const content = document.getElementById('editor').innerHTML;
        const date = new Date().toLocaleDateString();

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: Inter, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .date { color: #666; font-style: italic; margin-bottom: 20px; }
        img { max-width: 100%; height: auto; border-radius: 8px; }
        .align-left { float: left; margin: 10px 20px 10px 0; }
        .align-right { float: right; margin: 10px 0 10px 20px; }
        .align-center { display: block; margin: 20px auto; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div class="date">${date}</div>
    <div class="content">${content}</div>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }

    renderNotesGrid() {
        const container = document.getElementById('notesGrid');
        
        if (this.posts.length === 0) {
            container.innerHTML = `
                <div class="empty-notes">
                    <i class="fas fa-sticky-note"></i>
                    <h3>No notes yet</h3>
                    <p>Click "Create New Note" to get started with your first note!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.posts.map(post => `
            <div class="note-card" onclick="blogApp.openNote('${post.id}')">
                <div class="note-card-title">${post.title || 'Untitled Note'}</div>
                <div class="note-card-date">${new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</div>
                <div class="note-card-preview">${post.preview}</div>
            </div>
        `).join('');
    }

    openNote(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            this.currentPostId = postId;
            document.getElementById('readerTitle').textContent = post.title || 'Untitled Note';
            document.getElementById('readerDate').textContent = new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            document.getElementById('readerBody').innerHTML = post.content;
            this.showView('reader');
        }
    }

    deletePost(postId) {
        this.posts = this.posts.filter(post => post.id !== postId);
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
        this.showNotification('Note deleted successfully', 'success');
    }

    renderPostsList() {
        // Keep for backward compatibility, but redirect to grid
        this.renderNotesGrid();
    }

    showPostsList() {
        // Redirect to dashboard view
        this.showView('dashboard');
    }

    autoSave() {
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('editor').innerHTML.trim();
        
        if (title || content) {
            const autoSaveData = {
                title: title,
                content: content,
                timestamp: Date.now()
            };
            localStorage.setItem('blogAutoSave', JSON.stringify(autoSaveData));
        }
    }

    loadLastPost() {
        const autoSave = localStorage.getItem('blogAutoSave');
        if (autoSave) {
            const data = JSON.parse(autoSave);
            const timeDiff = Date.now() - data.timestamp;
            
            // If auto-save is less than 1 hour old, offer to restore
            if (timeDiff < 3600000 && (data.title || data.content)) {
                if (confirm('Found an auto-saved draft. Would you like to restore it?')) {
                    document.getElementById('postTitle').value = data.title;
                    document.getElementById('editor').innerHTML = data.content;
                }
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the blog application when the page loads
let blogApp;
document.addEventListener('DOMContentLoaded', () => {
    blogApp = new BlogApp();
});

// Add some helpful formatting functions
function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('editor').focus();
}

function insertList(ordered = false) {
    const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
    document.execCommand(command, false, null);
    document.getElementById('editor').focus();
}

function insertLink() {
    const url = prompt('Enter the URL:');
    if (url) {
        document.execCommand('createLink', false, url);
        document.getElementById('editor').focus();
    }
}

// Add keyboard shortcuts help
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === '?') {
        alert(`Keyboard Shortcuts:
        
Ctrl + B: Bold text
Ctrl + I: Italic text
Ctrl + U: Underline text
Ctrl + S: Save post
Ctrl + Shift + ?: Show this help`);
    }
});