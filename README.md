#Student Manager (Browser)

A simple browser-based Student Manager built with plain HTML, CSS, and JavaScript. It supports full CRUD (Create, Read, Update, Delete) operations on an in-memory array of students — no backend, no database.

Tech Stack
HTML
CSS
JavaScript (vanilla — no frameworks or libraries)
How to Run

No install needed. Just clone or download the repository and open index.html directly in your browser.

Live Demo

https://task2-opal-one.vercel.app

How It Works
The students array in script.js is the single source of truth for everything shown on the page. All student data lives in this array, and nothing is considered "real" until it's reflected there.
The render() function rebuilds the entire student list on the page from scratch every time the array changes. It clears the current list, then loops through students and creates a new list item for each one — so the page always matches whatever is currently in the array.
addEventListener is used to listen for user actions — submitting the form (Add/Edit) and clicking the Edit or Delete buttons on each student. When one of these events fires, the corresponding function updates the students array first, and then calls render() again so the page reflects the change.
Note

There is no backend or persistent storage in this task, so refreshing the page resets the data back to the two starting students. This is expected behavior.
