const { google } = require('googleapis');
const creds = require('./sheets-token.json');

const auth = new google.auth.OAuth2(creds.client_id, creds.client_secret);
auth.setCredentials({ refresh_token: creds.refresh_token });

const sheets = google.sheets({ version: 'v4', auth });

async function createRestockItSheet() {
  // Create the spreadsheet
  const spreadsheet = await sheets.spreadsheets.create({
    resource: {
      properties: { title: 'RestockIt - API & Access Tracker' },
      sheets: [
        {
          properties: { title: 'API Access', gridProperties: { rowCount: 50, columnCount: 7 } }
        }
      ]
    }
  });

  const spreadsheetId = spreadsheet.data.spreadsheetId;
  console.log('Sheet created:', `https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  // Add data
  const data = [
    ['RESTOCKIT - API & ACCESS TRACKER', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['Section', 'Service', 'What You Need', 'Add To', 'Sign Up URL', 'Status', 'Notes'],
    ['', '', '', '', '', '', ''],
    ['🔐 SHOPIFY', '', '', '', '', '', ''],
    ['', 'Shopify Partners', 'Partner Account', 'N/A', 'https://partners.shopify.com', '⬜ Not Started', 'Free - create app here'],
    ['', 'Shopify App', 'API Key', 'SHOPIFY_API_KEY in .env', 'Partners Dashboard', '⬜ Not Started', 'Auto-generated'],
    ['', 'Shopify App', 'API Secret', 'SHOPIFY_API_SECRET in .env', 'Partners Dashboard', '⬜ Not Started', 'Auto-generated'],
    ['', 'Dev Store', 'Test Store', 'N/A', 'Partners → Stores', '⬜ Not Started', 'Free unlimited'],
    ['', '', '', '', '', '', ''],
    ['📧 EMAIL', '', '', '', '', '', ''],
    ['', 'Resend', 'API Key', 'RESEND_API_KEY in .env', 'https://resend.com', '⬜ Not Started', 'You already have this!'],
    ['', 'Resend', 'From Email', 'RESEND_FROM_EMAIL in .env', 'Resend Dashboard', '⬜ Not Started', 'Verify domain'],
    ['', 'Mailgun', 'API Key', 'MAILGUN_API_KEY in .env', 'https://mailgun.com', '⬜ Not Started', 'Backup - 5000/month free'],
    ['', '', '', '', '', '', ''],
    ['🗄️ DATABASE', '', '', '', '', '', ''],
    ['', 'Supabase', 'Connection URL', 'DATABASE_URL in .env', 'https://supabase.com', '⬜ Not Started', 'Free: 500MB'],
    ['', '', '', '', '', '', ''],
    ['🌐 HOSTING', '', '', '', '', '', ''],
    ['', 'Vercel', 'Account', 'Deploy from GitHub', 'https://vercel.com', '⬜ Not Started', 'Free tier'],
    ['', 'Domain', 'Custom domain', 'Vercel Domains', 'https://namecheap.com', '⬜ Not Started', 'Optional'],
    ['', '', '', '', '', '', ''],
    ['🔧 DEV TOOLS', '', '', '', '', '', ''],
    ['', 'ngrok', 'Auth Token', 'Optional', 'https://ngrok.com', '⬜ Not Started', 'Webhook testing'],
    ['', 'Node.js', 'v18+', 'Install locally', 'https://nodejs.org', '⬜ Not Started', 'Required'],
    ['', '', '', '', '', '', ''],
    ['📱 PHASE 2', '', '', '', '', '', ''],
    ['', 'Twilio', 'Account SID', 'TWILIO_ACCOUNT_SID in .env', 'https://twilio.com', '⬜ Not Started', 'SMS ~$0.01 each'],
    ['', 'Twilio', 'Auth Token', 'TWILIO_AUTH_TOKEN in .env', 'Twilio Console', '⬜ Not Started', ''],
    ['', 'Twilio', 'Phone Number', 'TWILIO_PHONE_NUMBER in .env', 'Twilio Console', '⬜ Not Started', '~$1/month'],
    ['', 'Klaviyo', 'API Key', 'KLAVIYO_API_KEY in .env', 'https://klaviyo.com', '⬜ Not Started', 'Email marketing'],
    ['', 'Mailchimp', 'API Key', 'MAILCHIMP_API_KEY in .env', 'https://mailchimp.com', '⬜ Not Started', 'Email marketing'],
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'API Access!A1',
    valueInputOption: 'RAW',
    resource: { values: data }
  });

  // Format the sheet
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        // Bold header row
        {
          repeatCell: {
            range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 14 } } },
            fields: 'userEnteredFormat.textFormat'
          }
        },
        // Bold column headers
        {
          repeatCell: {
            range: { sheetId: 0, startRowIndex: 2, endRowIndex: 3 },
            cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
            fields: 'userEnteredFormat.textFormat,userEnteredFormat.backgroundColor'
          }
        },
        // Auto-resize columns
        {
          autoResizeDimensions: {
            dimensions: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: 7 }
          }
        }
      ]
    }
  });

  console.log('Sheet populated and formatted!');
  console.log(`Open: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
}

createRestockItSheet().catch(console.error);
