import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      {/* Sidebar Toggle Button - Top Left */}
      <button 
        className="sidebar-toggle-btn" 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        title="Menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Navbar />

      {/* Overlay - appears when sidebar is open */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className="app-body">
        {/* Sidebar - only visible when open */}
        {isSidebarOpen && (
          <Sidebar onClose={closeSidebar} />
        )}

        <main className="app-main container">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
