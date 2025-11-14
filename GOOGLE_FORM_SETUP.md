# Google Form Reviews Integration Setup

## Overview
This system automatically fetches customer reviews from your Google Form responses and displays them on your website.

---

## Step 1: Setup Your Google Form

Your Google Form should collect these fields:

1. **Name** (Short answer) - Customer's name
2. **Location** (Short answer) - City/Place (e.g., "Coimbatore")
3. **Rating** (Multiple choice or Linear scale) - 1 to 5 stars
4. **Review** (Paragraph) - Customer feedback

### Example Google Form Questions:
```
1. Your Name: [Short answer]
2. Your Location: [Short answer]
3. How would you rate us? [Linear scale 1-5]
4. Share your experience: [Paragraph]
```

---

## Step 2: Deploy Google Apps Script

### A. Open Script Editor
1. Open your Google Form
2. Click the three dots (⋮) → "View responses in Sheets"
3. In the Google Sheet, go to **Extensions** → **Apps Script**

### B. Add the Script
1. Delete any existing code in the editor
2. Copy all the code from `google-apps-script.js` file
3. Paste it into the Apps Script editor
4. Click **Save** (💾 icon)

### C. Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Reviews API for Rest On Wheels"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### D. Grant Permissions
1. Click "Authorize access"
2. Choose your Google account
3. Click "Advanced" → "Go to [Your Project]"
4. Click "Allow"

---

## Step 3: Update Website Code

1. Open `src/components/admin/TestimonialsManager.jsx`
2. Find this line (around line 20):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
3. Replace the URL with **your Web App URL** from Step 2C

---

## Step 4: Test the Integration

### A. Test in Apps Script
1. In Apps Script editor, select function: `testScript`
2. Click **Run** (▶️ icon)
3. Check **Execution log** - should show your reviews as JSON

### B. Test in Admin Panel
1. Login to your website admin panel
2. Go to **Reviews** tab
3. Click **"Fetch New Reviews"** button
4. Should see reviews with 4-5 stars in "Pending Reviews"
5. Click **Approve** to publish them on homepage

---

## How It Works

```
Customer fills form → Google Sheets → Apps Script → Your website admin → Approve → Homepage
```

1. **Customer fills Google Form** → Data saved to Google Sheets
2. **Admin clicks "Fetch New Reviews"** → Calls Google Apps Script
3. **Script reads Google Sheet** → Returns reviews as JSON
4. **Admin sees pending reviews** (4-5 stars only)
5. **Admin approves** → Review appears on homepage carousel
6. **Auto-rotates every 5 seconds** on homepage

---

## Column Name Mapping

The script looks for these column names in your Google Sheet (case-insensitive):

| Field | Possible Column Names |
|-------|----------------------|
| Name | "Name", "Your Name" |
| Location | "Location", "City" |
| Rating | "Rating", "How would you rate us?" |
| Review | "Review", "Feedback", "Message" |

If your columns have different names, edit the script's column finding logic.

---

## Troubleshooting

### "Failed to fetch reviews"
- Check if Apps Script is deployed as "Anyone" can access
- Verify the Web App URL is correct in `TestimonialsManager.jsx`
- Make sure Google Sheet has data

### "No new reviews found"
- Check if any reviews have 4-5 star rating
- Reviews with same names aren't fetched twice

### Column not found errors
- Open Google Sheet
- Check exact column names in row 1
- Update column indices in Apps Script if needed

### CORS errors
- Make sure deployment type is "Web app" not "API Executable"
- Execute as "Me", access "Anyone"

---

## Security Notes

✅ **Safe:**
- Read-only access to your spreadsheet
- No write permissions to website
- Admin approval required before publishing

⚠️ **Remember:**
- Anyone with the script URL can read your form responses
- Don't share the Web App URL publicly
- Only use it within your admin panel

---

## Support

If you encounter issues:
1. Check the Google Apps Script execution logs
2. Verify your Google Form column names match
3. Ensure the form has at least one 4-5 star response
4. Test using the `testScript()` function in Apps Script

---

## Example Workflow

1. Customer books a trip with Rest On Wheels
2. After trip, you send them the Google Form link
3. Customer fills: Name: "Rajesh", Location: "Coimbatore", Rating: 5, Review: "Excellent service!"
4. You login to admin → Reviews tab
5. Click "Fetch New Reviews"
6. See Rajesh's review in pending
7. Click "Approve"
8. Review now appears on homepage for all visitors! ✨
