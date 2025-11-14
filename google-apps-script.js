/**
 * Google Apps Script for Rest On Wheels - Reviews API
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Form responses spreadsheet
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy > New Deployment
 * 5. Select type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy and copy the Web App URL
 * 9. Replace the GOOGLE_SCRIPT_URL in TestimonialsManager.jsx with your new URL
 * 
 * FORM REQUIREMENTS:
 * Your Google Form should have these fields (column names in Sheet):
 * - Timestamp (auto-added by Google Forms)
 * - Name (customer name)
 * - Location (city/place)
 * - Rating (1-5 stars, as number)
 * - Review (feedback text)
 */

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row (index 0)
    const headers = data[0];
    const reviews = [];
    
    // Find column indices (adjust these based on your actual Google Form columns)
    const timestampCol = headers.indexOf('Timestamp');
    const nameCol = headers.indexOf('Name') || headers.indexOf('Your Name') || 1;
    const locationCol = headers.indexOf('Location') || headers.indexOf('City') || 2;
    const ratingCol = headers.indexOf('Rating') || headers.indexOf('How would you rate us?') || 3;
    const reviewCol = headers.indexOf('Review') || headers.indexOf('Feedback') || headers.indexOf('Message') || 4;
    
    // Process each row (skip header)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Skip empty rows
      if (!row[nameCol] || !row[reviewCol]) continue;
      
      const review = {
        name: String(row[nameCol]).trim(),
        location: String(row[locationCol] || 'Not specified').trim(),
        rating: parseInt(row[ratingCol]) || 5,
        review: String(row[reviewCol]).trim(),
        date: row[timestampCol] ? formatDate(new Date(row[timestampCol])) : formatDate(new Date())
      };
      
      reviews.push(review);
    }
    
    // Return JSON response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        reviews: reviews,
        count: reviews.length 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error as JSON
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to fetch reviews. Check your sheet structure.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Test function - run this to check if your setup works
function testScript() {
  const result = doGet();
  Logger.log(result.getContent());
}
