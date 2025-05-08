import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

const usePdfGenerator = () => {
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [tempDivId, setTempDivId] = useState(null);
  const targetRef = useRef(null); // Ref to the element to capture

  // Clean up any temporary elements if component unmounts or tempDivId changes
  useEffect(() => {
    return () => {
      if (tempDivId) {
        const tempElement = document.getElementById(tempDivId);
        if (tempElement) {
          document.body.removeChild(tempElement);
        }
      }
    };
  }, [tempDivId]);

  const generatePdf = async (fileName = 'document') => {
    if (!targetRef.current) {
      console.error('Target element not found');
      return false;
    }

    setIsPdfGenerating(true);
    let currentTempDivId = null;

    try {
      // Create a unique ID for the temporary div
      const uniqueId = `pdf-container-${Date.now()}`;
      setTempDivId(uniqueId); // Update state for cleanup
      currentTempDivId = uniqueId; // Keep track for local cleanup

      // Create a temporary hidden div for capturing
      const tempDiv = document.createElement('div');
      tempDiv.id = uniqueId;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px'; // Position off-screen
      tempDiv.style.top = '0'; // Ensure it's at the top
      tempDiv.style.width = '210mm'; // A4 width - maintain width for layout
      // tempDiv.style.height = '297mm'; // REMOVE fixed height - allow content to define height
      tempDiv.style.backgroundColor = 'white'; // Ensure white background
      tempDiv.style.opacity = '0'; // Use opacity to hide but keep rendered
      tempDiv.style.overflow = 'hidden'; // Hide potential scrollbars
      tempDiv.style.zIndex = '-1000'; // Ensure it's behind everything

      // Clone the content of the target element
      const clonedNode = targetRef.current.cloneNode(true);
      tempDiv.appendChild(clonedNode);
      document.body.appendChild(tempDiv);

      // Wait a moment for styles to apply and content to render
      await new Promise(resolve => setTimeout(resolve, 500)); // Increased timeout

      // Capture the element
      const canvas = await html2canvas(document.getElementById(uniqueId), {
        scale: 2, // Increase scale for better resolution
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit the image onto the A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add the image to the PDF, potentially across multiple pages
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const safeFileName = fileName.replace(/\s+/g, '_');
      pdf.save(`${safeFileName}_resume.pdf`);

      console.log('PDF generated successfully');
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return false;
    } finally {
      // Clean up the temporary div
      if (currentTempDivId) {
        const tempElement = document.getElementById(currentTempDivId);
        if (tempElement) {
          document.body.removeChild(tempElement);
        }
      }
      setTempDivId(null); // Reset state
      setIsPdfGenerating(false);
    }
  };

  return {
    targetRef,
    isPdfGenerating,
    generatePdf,
  };
};

export default usePdfGenerator;
