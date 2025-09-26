import { useEffect } from 'react';

export const useScreenshotBlocker = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Deter F12, Ctrl+Shift+I/J, PrintScreen
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
      }
    };
    
    // Disables the right-click context menu to further deter content access.
    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
    };

    const style = document.createElement('style');
    style.innerHTML = `@media print {
      body * {
        display: none !important;
        visibility: hidden !important;
      }
      html, body {
        background-color: #fff !important;
      }
      body::before {
        content: "Printing and content capture are disabled for this page.";
        display: block;
        color: black;
        font-size: 20px;
        text-align: center;
        padding: 50px;
        visibility: visible !important;
      }
    }
    body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    `;

    document.head.appendChild(style);
    window.addEventListener('keydown', handleKeyDown);
    // Add event listener to block the context menu
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Clean up the event listener on component unmount
      window.removeEventListener('contextmenu', handleContextMenu);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
};
