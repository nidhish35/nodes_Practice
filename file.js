const fs = require('fs');

// creat a new file and write some content to it
fs.writeFile('./hello.txt', 'console.log("Hello, World!");', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File created and content written successfully.');
});

fs.writeFileSync('./hello.txt', 'console.log("Hello, World!");');



// Read the contents of the file
fs.readFile('./hello.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    // Print the contents of the file
    console.log(data);
});

const result = fs.readFileSync('./hello.txt', 'utf8');
console.log(result);



// Append new content to the file
fs.appendFile('./hello.txt', '\nconsole.log("Appended content!");', (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Content appended successfully.');
});

fs.appendFileSync('./hello.txt', '\nconsole.log("Appended content!");');



// Delete the file
fs.unlink('./hello.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully.');
}); 

fs.unlinkSync('./hello.txt');
