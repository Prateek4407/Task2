console.log("script connected");

// ---------- 2.1 Data model: the single source of truth ----------
let students = [
  { id: 1, name: "Prateek", age: 20, course: "BTech" },
  { id: 2, name: "Mayank", age: 21, course: "BTech" },
  { id: 3, name: "Prabal", age: 21, course: "BTech" },
];

// Tracks whether the form is currently in "edit" mode, and which id
let editingId = null;

// ---------- DOM references ----------
const studentList = document.querySelector("#student-list");
const studentForm = document.querySelector("#student-form");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const courseInput = document.querySelector("#course");
const errorMessage = document.querySelector("#error-message");
const submitBtn = document.querySelector("#submit-btn");

// ---------- Helpers ----------
const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
};

const hideError = () => {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
};

// ---------- 2.1 Render ----------
function render() {
  // clear whatever the list currently contains
  studentList.innerHTML = "";

  // loop through the students array (map) and build an <li> for each
  students.map(({ id, name, age, course }) => {
    const li = document.createElement("li");
    li.className = "student-item";

    // template literal for the displayed text
    li.innerHTML = `
      <span class="student-info">${name} — ${age} yrs — ${course}</span>
    `;

    const actions = document.createElement("div");
    actions.className = "student-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => startEdit(id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteStudent(id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    studentList.appendChild(li);
    return li;
  });
}

render(); // call once so the page shows the starting students

// ---------- 2.2 Add Student (and 2.4 Edit, same form) ----------
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideError();

  // destructure the raw values off the inputs
  const { value: name } = nameInput;
  const { value: ageRaw } = ageInput;
  const { value: course } = courseInput;

  // ---- 2.5 Validation ----
  if (!name.trim() || !ageRaw.trim() || !course.trim()) {
    showError("Please fill in name, age, and course before submitting.");
    return;
  }

  const age = Number(ageRaw);
  if (Number.isNaN(age)) {
    showError("Age must be a number.");
    return;
  }

  if (editingId !== null) {
    // ---- 2.4 Update existing student ----
    students = students.map((student) =>
      student.id === editingId ? { ...student, name, age, course } : student
    );
    editingId = null;
    submitBtn.textContent = "Add Student";
  } else {
    // ---- 2.2 Create new student ----
    const newId =
      students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

    const newStudent = { id: newId, name, age, course };
    students.push(newStudent);
  }

  render();
  studentForm.reset();
});

// ---------- 2.3 Delete a Student ----------
const deleteStudent = (id) => {
  const exists = students.find((student) => student.id === id);
  if (!exists) {
    // handle gracefully if the id no longer exists
    showError("That student no longer exists.");
    return;
  }

  // build a new array without the deleted student, rather than mutating in place
  students = students.filter((student) => student.id !== id);
  render();
};

// ---------- 2.4 Start editing a student ----------
const startEdit = (id) => {
  const student = students.find((student) => student.id === id);

  if (!student) {
    showError("That student no longer exists.");
    return;
  }

  const { name, age, course } = student;

  nameInput.value = name;
  ageInput.value = age;
  courseInput.value = course;

  editingId = id;
  submitBtn.textContent = "Update Student";
  hideError();
};
