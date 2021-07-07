listAdding();
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let deleteBtn = document.getElementById("deleteBtn");

// store data in a local storage
addBtn.addEventListener("click", function () {
  let inputVal = input.value;
  if (inputVal.trim() != 0) {
    let txt = localStorage.getItem("localtext");

    if (txt === null) {
      textobj = [];
    } else {
      textobj = JSON.parse(txt);
    }
    textobj.push(inputVal);
    localStorage.setItem("localtext", JSON.stringify(textobj));
    input.value = "";
  } else {
    alert("enter your task");
  }
  listAdding();
});

// add item to list
function listAdding() {
  let txt = localStorage.getItem("localtext");

  if (txt == null) {
    textobj = [];
  } else {
    textobj = JSON.parse(txt);
  }
  let html = "";
  let listItem = document.getElementById("listItem");
  textobj.forEach((element, index) => {
    html += ` <tr class="tableRow">
          <td class="sno">${index + 1}.</td>
          <td class="task">${element}</td>
          <td class="editBtn">
            <button class='btn1' onclick = 'editTask(${index})'><i class="fa fa-edit"> Edit</i></button>
          </td>
          <td class="deleteBtn">
            <button class='btn2' onclick= 'deletetask(${index})'><i class="fa fa-trash"> Delete</i></button>
          </td>
        </tr>`;
  });

  listItem.innerHTML = html;
}
// edit a item from a list
function editTask(index) {
  let saveIndex = document.getElementById("saveIndex");
  let addBtn = document.getElementById("addBtn");
  let saveBtn = document.getElementById("saveBtn");
  saveIndex.value = index;
  let txt = localStorage.getItem("localtext");
  let taskobj = JSON.parse(txt);
  input.value = taskobj[index];
  addBtn.style.display = "none";
  saveBtn.style.display = "block";
}

// saveTask
let saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function () {
  let txt = localStorage.getItem("localtext");
  let taskobj = JSON.parse(txt);
  let saveIndex = document.getElementById("saveIndex").value;
  taskobj[saveIndex] = input.value;
  localStorage.setItem("localtext", JSON.stringify(taskobj));
  listAdding();
  addBtn.style.display = "block";
  saveBtn.style.display = "none";
  input.value = "";
});

// delete a item from a list
function deletetask(index) {
  let txt = localStorage.getItem("localtext");
  let taskobj = JSON.parse(txt);
  taskobj.splice(index, 1);
  localStorage.setItem("localtext", JSON.stringify(taskobj));
  listAdding();
}
