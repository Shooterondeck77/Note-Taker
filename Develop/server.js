const express = require('express')

const path = require('path');

const app = express();

const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 

const PORT = 3003;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => res.send('Navigate to /notes'));

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

const dbFilePath = './db/db.json';

const getNotesData = () => {
  const rawData = fs.readFileSync(dbFilePath);
  return JSON.parse(rawData);
};

// Initialize notesData with data from db.json
notesData = getNotesData();

// GET /api/notes - Retrieve all notes
app.get('/api/notes', (req, res) => {
  res.json(notesData);
});

// POST /api/notes - Create a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // Generate a unique ID for the new note
  newNote.id = uuidv4();

  // Add the new note to your data array
  notesData.push(newNote);

  // Write the updated data back to the file
  fs.writeFileSync(dbFilePath, JSON.stringify(notesData, null, 2));

  // Respond with the newly created note
  res.json(newNote);
});

module.exports = app;

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
 