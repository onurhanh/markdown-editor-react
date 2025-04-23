# 📖 Markdown Editor Application

> A modern editor app enriched with features such as markdown writing, live preview, theme selection, and document management.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)

## 🔍 Project Overview

**Markdown Editor** is a modern single-page application where users can create, edit, and preview their own markdown documents.  
Built with React, this editor instantly converts your content into HTML and displays it in the preview area.


![Ekran görüntüsü 2025-04-23 232128](https://github.com/user-attachments/assets/8c1725cb-4e9b-4180-8b25-ec9c9dca3a47)


## 🚀 Key Features

### 📝 Markdown Writing & Live Preview
- As users write markdown content, the HTML-converted version is **instantly** shown on the right panel.
- Built using the `marked-react` library for safe and accurate conversion.

### 📁 Document Management
- **Create New Document:** Users can create new markdown documents from the left panel.


![Ekran görüntüsü 2025-04-23 232221](https://github.com/user-attachments/assets/31bcab34-d39c-4d56-bc1e-9167e1d4a78b)


- **Delete Document:** Any existing document can be deleted.

- **Update Title and Content:** Each document can be renamed, and its content can be updated individually.

### 💾 Persistent Storage (localStorage Support)
- All created documents and their content are saved in **localStorage**.
- Even if the page is refreshed, data is retained and users can continue from where they left off.

### 🌙 Theme Toggle (Light / Dark Mode)
- Users can toggle between light and dark mode based on their preference.
- The selected theme is saved in `localStorage` and remains persistent across sessions.

### 🛎️ Toast Notification (File Saved)
- When the user updates a file and clicks the **“Save Changes”** button, a toast message appears at the top indicating **“Your markdown file has been saved”**.
- This feature uses the `react-hot-toast` library to provide real-time feedback.

### 📱 Responsive Design
- Mobile-first layout ensures a smooth experience across all devices.
- Works seamlessly on mobile, tablet, and desktop screens.

### 💡 User Experience & Code Quality
- Minimal and distraction-free interface provides a focused writing environment.
- Components are modular and clearly commented to support long-term maintainability.

## 🛠️ Technologies & Tools

- React  
- JavaScript (ES6)  
- CSS  
- marked-react  
- react-hot-toast  
- localStorage  
- Responsive Design (Flexbox, Media Queries)

🟢 **Live Demo**  
🔗 

## 📂 Project Structure

📁 public  
📁 src  
 ┣ 📁 assets  
 ┃ ┣ 📄 darkMode.css             # Dark mode styling  
 ┃ ┗ 📄 reset.css                # CSS reset rules  
 ┣ 📄 App.css                    # Global application styles  
 ┣ 📄 App.jsx                    # Main app component  
 ┣ 📄 MarkDown.jsx               # Markdown editor and preview component  
 ┗ 📄 main.jsx                   # React DOM entry point  

📄 index.html                    # HTML template  
📄 .gitignore                    # Files ignored by Git  
📄 eslint.config.js              # ESLint configuration  
📄 package-lock.json             # Project dependency lock file  
📄 README.md                     # Project documentation
