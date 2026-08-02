const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

const angularPath = path.join(
  __dirname,
  'dist',
  'gramin-bank',
  'browser'
);

// Serve Angular static files
app.use(express.static(angularPath));

// Angular SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(angularPath, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Angular app running on port ${PORT}`);
});
