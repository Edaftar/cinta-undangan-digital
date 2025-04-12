
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generateInvitationPDF = async (elementId: string, filename: string = 'wedding-invitation.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    // Get the element's dimensions
    const { offsetWidth, offsetHeight } = element;
    
    // Capture the element using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for external images
      logging: false,
      windowWidth: offsetWidth,
      windowHeight: offsetHeight
    });
    
    // Calculate dimensions for PDF
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (offsetHeight * imgWidth) / offsetWidth;
    
    // Create PDF with correct orientation
    const pdf = new jsPDF(imgHeight > pageHeight ? 'portrait' : 'portrait', 'mm', 'a4');
    
    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL('image/png'), 
      'PNG', 
      0, 
      0, 
      imgWidth, 
      imgHeight
    );
    
    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};
