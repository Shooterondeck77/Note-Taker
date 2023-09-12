const fs = require("fs")

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
      err ? console.error(err) : console.log("data added or deleted")
    })
  }
  
  const readAndDelete = (id, file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err)
      } else {
        const parsedNotes = JSON.parse(data);
        const filteredNotes = parsedNotes.filter((note) => {
          return note.id !== id
        })
  
        writeToFile(file, filteredNotes)
      }
    })
  }

  module.exports = {readAndDelete, writeToFile}