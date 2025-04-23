import Markdown from 'marked-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function MarkDownEditor({ theme, handleChangeTheme, handleOpenDialog, setCurrentDocument, currentDocument, documentList, setDocumentList, setMarkdown, showPreview, setShowPreview, markdown, setIsMenuOpen, isMenuOpen }) {
  const [isEdit, setEdit] = useState(false); // edit durumunu tutan state
  const [tempName, setTempName] = useState(currentDocument?.name || ""); // başlangıçtaki doküman ismini tutan state

  // düzenleme moduna geçişi sağlayan fonksiyon
  function handleEditToggle() {
    setEdit((prev) => !prev); // isEdit true ise false, false ise true yapar
    setTempName(currentDocument?.name || ""); // geçiş esnasında var olan doc ismini geçiçi olarak tutar
  }

  // doc name editlendiğinde form gönderildiğinde yeni doc name'i güncelleyen fonksiyon
  function handleDocumentNameUpdate(e) {
    e.preventDefault(); // doc name bir form içinde input olduğu için varsayılan submit davranışını durdurmalıyız

    // yeni adı doküman listesine kaydeder
    setDocumentList((prevList) =>
      prevList.map((doc) =>
        // eğer listedeki döküman id ile currentDocument.id eşleşirse eşleşen doc'un name'i tempName olur
        // geri kalan eşleşmeyen doclar olduğu gibi kalır
        doc.id === currentDocument.id ? { ...doc, name: tempName } : doc
      )
    );

    // yeni adı o anda açık olan dokümanın içerisine kaydeder
    // şu anda açık olan doc'un diğer özellikleri alınır ve name özelliği ise tempName olur
    setCurrentDocument({ ...currentDocument, name: tempName });
    setEdit(false); // editleme kapatılır
  }

  // preview bölümünü açmak için olan fonksiyon
  function togglePreview() {
    setShowPreview((prevState) => !prevState); // true ise false, false ise true
  }

  // yazılan markdown metnini markdown stateine kaydeder
  function handleChange(e) {
    setMarkdown(e.target.value);
  }

  // hamburger menünün açılması için olan fonksiyon
  function hamburgerMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  // yeni bir doc eklemek için olan fonksiyon
  function handleNewDocument() {
    const newDocument = {
      name: "untitled-document.md",
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      content: "",
    };
    // önceki doc listesini alır ve üstüne newDocument ekler
    setDocumentList((prevList) => [...prevList, newDocument]);
  }

  // hangi doc'a tıklandıysa o doc'un açılmasını sağlar
  function openDocument(doc) {
    setMarkdown(doc.content || ""); // doc'ta metin varsa markdown alanına o gelir yoksa boş string gelir
    setIsMenuOpen(false); // hamburger menü kapat
    setCurrentDocument(doc); // o an açık olan doc state'ine doc kaydedilir
  }

  // açık olan doc'un içeriğini günceller
  function updatedDocument(e) {
    e.preventDefault();
    const form = new FormData(e.target); // form içndeki tüm input verileri alınır
    const formObj = Object.fromEntries(form); // form verileri nesneye dönüşür
    setDocumentList((prevList) => // doc idlerden biri current doc id ile eşleşirse
      prevList.map((doc) =>
        doc.id === currentDocument.id
          ? { ...doc, ...formObj } //  değişiklik olanın değişiklikleri kaydedilir
          : doc // diğer doclar aynı kalır
      )
    );
    toast.success("Markdown dosyanız kaydedildi");
  }

  const screenWidth = window.innerWidth; // tarayıcı penceresinin genişliğini px olarak alır
  const isSmallScreen = screenWidth < 768; // 768px'den düşük olan ekranlar small screen olur

  return (
    <>
      <div className={`header-modal ${isMenuOpen ? "grid" : "none"}`}>
        <div className="hamburger-menu-overlay">
          <div className="menu-header">
            <h1>MARKDOWN</h1>
          </div>
          <div className="menu-content">
            <h2>MY DOCUMENTS</h2>
            <button onClick={handleNewDocument}>+ New Document</button>
          </div>
          <div className="document-list">
            <ul>
              {documentList.map((doc) => (
                <li key={doc.id} onClick={() => openDocument(doc)}>
                  <img src="/img/file-header-icon.svg" alt="File Icon" />
                  <div className="document-info">
                    <span>{doc.date}</span>
                    <p>{doc.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <label className="theme-switch">
            <img src={theme === "light" ? "/img/light-mode-sun.svg" : "/img/dark-mode-sun.svg"} alt="Sun Icon" />
            <input
              className="switch"
              type="checkbox"
              defaultChecked={theme === "dark-mode"}
              onChange={handleChangeTheme}
            />
            <img src={theme === "light" ? "/img/light-mode-moon.svg" : "/img/dark-mode-moon.svg"} alt="Moon Icon" />
          </label>
        </div>
      </div>
      <div className={`header ${isMenuOpen ? "header-open" : "menu-close"}`}>
        <div className="header-content">
          <div className="hamburger-menu">
            <img
              src={isMenuOpen ? "/img/hamburger-menu-close.svg" : "/img/hamburger-menu.svg"}
              alt="Hamburger Menu"
              onClick={hamburgerMenu}
            />
          </div>
          <div className="header-inner">
            <div className="header-inner-left">
              <h2 className='markdown-text-desktop'>MARKDOWN</h2>
              <div className="file-content">
                <img src="/img/file-header-icon.svg" alt="File Icon" />
                <form onSubmit={handleDocumentNameUpdate} className="file-info">
                  <span className="doc-name-tablet">Document Name</span>
                  {isEdit ? (
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onBlur={handleDocumentNameUpdate} // Odak kaybolursa otomatik güncelle
                      autoFocus
                    />
                  ) : (
                    <p onClick={handleEditToggle}>
                      {currentDocument?.name || "untitled-document.md"}
                    </p>
                  )}
                </form>
              </div>
            </div>
            <div className="file-delete-save">
              <div className="delete-btn">
                <img onClick={handleOpenDialog} src="/img/delete-header-btn.svg" alt="Delete File Icon" />
              </div>
              {isSmallScreen ?
                <button type="submit" form="markdownForm" className="save-btn">
                  <img src="/img/save-header-btn.svg" alt="Save File Icon" />
                </button> :
                <button type="submit" form="markdownForm" className="save-btn">
                  <img src="/img/save-header-btn.svg" alt="Save File Icon" />
                  <span className='save-text'>Save Changes</span>
                </button>
              }

            </div>
          </div>
        </div>
        <div className="markdown-container">
          <form id="markdownForm" onSubmit={updatedDocument}>
            <div className="markdown-preview-area">
              {isSmallScreen ? (
                <label className='small-screen-label'>
                  {showPreview ? <span>PREVIEW
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt="Eye Icon"
                      onClick={togglePreview}
                    />
                  </span> : <span>MARKDOWN
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt="Eye Icon"
                      onClick={togglePreview}
                    /></span>}
                </label>
              ) : (
                <label>
                  {showPreview ? <span className='tablet-titles'>PREVIEW
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt="Eye Icon"
                      onClick={togglePreview}
                    />
                  </span> : <div className='titles'><span>MARKDOWN</span><span>PREVIEW
                    <img
                      src={showPreview ? "/img/close-eye-icon.svg" : "/img/open-eye-icon.svg"}
                      alt="Eye Icon"
                      onClick={togglePreview}
                    />
                  </span></div>}
                </label>
              )}
            </div>
            <div className="text-container">
              {isSmallScreen ? (
                <>
                  {!showPreview ? (
                    <textarea
                      className="mobile-textarea"
                      name="content"
                      onChange={handleChange}
                      value={markdown}
                      placeholder="Type some markdown here..."
                    ></textarea>
                  ) : (
                    <div className="preview-container">
                      <Markdown>{markdown}</Markdown>
                    </div>
                  )}
                </>
              ) : (

                showPreview ? (
                  <div className="preview-container border-none">
                    <Markdown>{markdown}</Markdown>
                  </div>
                ) : (

                  <div className='bigscreen' >
                    <textarea
                      className="mobile-textarea"
                      name="content"
                      onChange={handleChange}
                      value={markdown}
                      placeholder="Type some markdown here..."
                    ></textarea>
                    <div className="preview-container">
                      <Markdown>{markdown}</Markdown>
                    </div>
                  </div>
                )
              )}
            </div>
          </form>
        </div >
      </div >
    </>
  );
}

// silme butonuna basıldığında açılan diyalog'un componenti
export function DeleteDialog({ dialogRef, handleDelete, cancelDelete }) {
  return (
    <>
      <dialog ref={dialogRef}>
        <div className="dialog-delete">
          <h3>Delete this document?</h3>
          <p>Are you sure you want to delete this document and its contents? This action cannot be reversed.</p>
          <div className="confirm-delete-cancel-btns">
            <button className='confirm-delete-btn' onClick={handleDelete}>Confirm & Delete</button>
            <button className='cancel-btn' onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      </dialog>
    </>
  );
}