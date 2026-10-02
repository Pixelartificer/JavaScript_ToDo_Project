let inputName = document.querySelector(".inputName");
let inputText = document.querySelector(".inputText");
let sendBtn = document.querySelector(".sendBtn");
let updateBtn = document.querySelector(".updateBtn");
let allPost = document.querySelector(".allPost");
let deleteAll = document.querySelector(".deleteAll");

// Send Button Function
sendBtn.addEventListener("click", () => {
 
  if(inputName.value != "" && inputText.value != ""){
postArr.push({
    name: inputName.value,
    caption: inputText.value,
  });
  }else{
    alert("Please enter your name and messege")
  }
 
  
  allPost.innerHTML = "";
  display();
  inputName.value = "";
  inputText.value = "";
  deleteAll.classList.remove("d-none");
});

// All Dellet Button Function

deleteAll.addEventListener("click", () => {
  postArr = [];
  allPost.innerHTML = ""; 
  
});

let postArr = [];

function display() {
  postArr.map((item) => {
    allPost.innerHTML += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>         
          <p class="card-text">${item.caption}</p>
          <button type="button" class="btn btn-primary editBtn">Edit</button>
          <button type="button" class="btn btn-danger deletBtn">Delate</button>
        </div>
      </div>`;
  });

// Delet Button Function

let deletBtn = document.querySelectorAll(".deletBtn")
let deletPost = Array.from(deletBtn)

deletPost.map((item, index)=>{
  item.addEventListener("click", ()=>{
    postArr.splice(index, 1)
    allPost.innerHTML = "";
  display();
 if(postArr == ""){

 deleteAll.classList.add("d-none");
 }
  })
})

// Edit Post Function

let editBtn = document.querySelectorAll(".editBtn")
let editPost = Array.from(editBtn)

editPost.map((item, index)=>{
  item.addEventListener("click", ()=>{
inputName.value = postArr[index].name
inputText.value = postArr[index].caption
    
  })
})

}


