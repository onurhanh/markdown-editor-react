import './App.css';
import './assets/darkMode.css';
import { useState, useRef, useEffect } from "react";
import { MarkDownEditor, DeleteDialog } from './MarkDown.jsx';
import { Toaster } from 'react-hot-toast';

const defaultMarkdown = `
  # Welcome to Markdown

  Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

  ## How to use this?

  1. Write markdown in the markdown editor window
  2. See the rendered markdown in the preview window

  ### Features

  - Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
  - Name and save the document to access again later
  - Choose between Light or Dark mode depending on your preference

  > This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

  #### Headings

  To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

  ##### Lists

  You can see examples of ordered and unordered lists above.

  ###### Code Blocks

  This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:

  \`\`\`
  <main>
    <h1>This is a larger code block</h1>
  </main>
  \`\`\`
`;

function App() {
  const dialogRef = useRef();
  const [markdown, setMarkdown] = useState(defaultMarkdown); // markdown alanını tutan state
  const [showPreview, setShowPreview] = useState(false); // önizleme olayı
  const [isMenuOpen, setIsMenuOpen] = useState(false); // hamburger menü
  const [documentList, setDocumentList] = useState([
    { name: "welcome.md", date: "01 April 2022", id: crypto.randomUUID(), content: defaultMarkdown }
  ]); // doküman listesini tutan state
  const [currentDocument, setCurrentDocument] = useState(""); // o anda açık olan dokümanı tutan state

  // localStorage'dan dosyaları alma ve kullanma
  useEffect(() => {
    const savedDocuments = localStorage.documentList;
    if (localStorage.documentList) { // localStorage'da documentList var mı yok mu?
      setDocumentList(JSON.parse(savedDocuments)); // varsa bu JSON formatındaki veriyi tekrar eski (dizi veya nesne) formatına çevir
    }
  }, []);

  // localStorage'ın veriyi kaydedebilmesi için JSON formatına dönüştürmeliyiz
  useEffect(() => {
    localStorage.documentList = JSON.stringify(documentList);
  }, [documentList]); // documentList bağımlılık dizisinde olmalı çünkü her değişikliği useEffect izlemeli ve kaydetmeli

  function getSystemThemePref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light';
  }

  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref()); // dark mode için olan state

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChangeTheme(e) {
    const changedTheme = e.target.checked ? 'dark-mode' : 'light';
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
  }

  // dialog penceresini açmak için olan fonksiyon
  const handleOpenDialog = () => {
    dialogRef.current.showModal(); // modalı aç
  };

  // doc silmek için olan fonksiyon
  const handleDelete = () => {
    if (currentDocument) {
      const updatedList = documentList.filter(doc => doc.id !== currentDocument.id);
      setDocumentList(updatedList); // doc listi günceller
      setMarkdown(""); // markdown alanını temizler
      setCurrentDocument(null); // herhangi bir doc seçilmemiş durumuna getirir
    }
    dialogRef.current.close(); // modalı kapat
  };

  // dialog penceresini kapatmak için olan fonksiyon 
  const cancelDelete = () => {
    dialogRef.current.close(); // modalı kapat
  };

  return (
    <>
      <div className={`container ${isMenuOpen ? "menu-open" : "menu-close"}`}>
        <Toaster position="top-center" reverseOrder={false} />
        <MarkDownEditor
          theme={theme}
          handleChangeTheme={handleChangeTheme}
          documentList={documentList}
          setDocumentList={setDocumentList}
          currentDocument={currentDocument}
          setCurrentDocument={setCurrentDocument}
          setMarkdown={setMarkdown}
          setShowPreview={setShowPreview}
          markdown={markdown}
          showPreview={showPreview}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          handleOpenDialog={handleOpenDialog}
        />
        <DeleteDialog dialogRef={dialogRef}
          handleDelete={handleDelete}
          cancelDelete={cancelDelete} />
      </div>
    </>
  )
}

export default App;