let inputName = document.querySelector(".inputName");
let inputText = document.querySelector(".inputText");
let allPost = document.querySelector(".allPost");
let sendBtn = document.querySelector(".sendBtn");
let deleteAll = document.querySelector(".deleteAll");
let updateBtn = document.querySelector(".updateBtn");

let postArr = [];
let storeIndex;

sendBtn.addEventListener("click", () => {
  if (inputName.value != "" && inputText.value != "") {
    postArr.push({
      name: inputName.value,
      caption: inputText.value,
    });
    allPost.innerHTML = "";
    display();
    inputName.value = "";
    inputText.value = "";
    deleteAll.classList.remove("d-none");
  } else {
    alert("Please Enter Your name and Messege");
  }
});

updateBtn.addEventListener("click", () => {
  postArr[storeIndex].name = inputName.value;
  postArr[storeIndex].caption = inputText.value;
  allPost.innerHTML = "";
  display();
  updateBtn.classList.add("d-none");
  sendBtn.classList.remove("d-none");
  inputName.value = "";
  inputText.value = "";
  allPost.classList.remove("pe-none", "opacity-50");
});

deleteAll.addEventListener("click", () => {
  postArr = "";
  allPost.innerHTML = "";
  deleteAll.classList.add("d-none");
});

function display() {
  postArr.map((item) => {
    allPost.innerHTML += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>         
          <p class="card-text">${item.caption}</p>
          <button type="button" class="btn btn-primary editBtn">Edit</button>
          <button type="button" class="btn btn-danger deleteBtn">Delate</button>
        </div>
      </div>`;
  });

  let deleteBtn = document.querySelectorAll(".deleteBtn");
  let deletePost = Array.from(deleteBtn);

  deletePost.map((item, index) => {
    item.addEventListener("click", () => {
      postArr.splice(index, 1);
      allPost.innerHTML = "";
      display();
      if (postArr == "") {
        deleteAll.classList.add("d-none");
      }
    });
  });

  let editBtn = document.querySelectorAll(".editBtn");
  let editPost = Array.from(editBtn);

  editPost.map((item, index) => {
    item.addEventListener("click", () => {
      storeIndex = index;
      inputName.value = postArr[index].name;
      inputText.value = postArr[index].caption;
      
      updateBtn.classList.remove("d-none");
      sendBtn.classList.add("d-none");
      allPost.classList.add("pe-none", "opacity-50");
    });
  });
}

// {
//     name: "Lawrence",
//     caption: "kajdsfkjkladjskj"
//   },
//     {
//     name: "Lawrence",
//     caption: "kajdsfkjkladjskj"
//   },
//     {
//     name: "Lawrence",
//     caption: "kajdsfkjkladjskj"
//   },
//     {
//     name: "Lawrence",
//     caption: "kajdsfkjkladjskj"
//   },
//     {
//     name: "Lawrence",
//     caption: "kajdsfkjkladjskj"
//   },
//     {
//     name: "Lawrence",
//     caption: "kajdsfkjkladjskj"
//   },
//     {
//     name: "Lawrence",
//     caption: "kajdsfkjkladjskj"
//   },
