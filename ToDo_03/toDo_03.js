const inText = document.getElementById("inText")
const button = document.getElementById("button")




button.addEventListener("click", ()=>{
if(inText.innerText === "Hello Bangladesh"){
inText.innerText = "it's Me"
button.innerText= "Ok"
}else {inText.innerText = "Hello Bangladesh"
    button.innerText= "Change me"
}
})