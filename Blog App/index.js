let api = "https://mockserverdata.onrender.com/users"

window.onload = ()=>{
    let form = document.querySelector("form")
    form.onsubmit=()=>{
        addUser(event) 
        alert("successfully registered")
        window.location.href="signin.html"
    }
}

let addUser = async (e)=>{
  e.preventDefault()
  let form = document.getElementById("user_form")
  let name = form.name.value
  let  image = form.image.value
  let email = form.email.value
  let password = form.password.value

  let user_obj = {
    name,image,email,password
  }

  
 
  let res = await fetch(api,{
    method : "POST",
    body : JSON.stringify(user_obj),
    headers : {
      "Content-Type" : "application/json"
    }
  })


  form.name.value = null
  form.image.value = null
  form.email.value = null
  form.password.value=null

}