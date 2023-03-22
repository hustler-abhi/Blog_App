let api = "https://mockserverdata.onrender.com/blogs"

let getdata = JSON.parse(localStorage.getItem("sigiin")) || {}

window.onload = ()=>{
    let form = document.querySelector("form")
    form.onsubmit=()=>{
        addBlog(event) 
        alert("Successfully Post a Blog")
        window.location.href="signin.html"
    }
}
document.querySelector("#name").value = getdata.name

let addBlog = async (e)=>{
  e.preventDefault()
  let form = document.getElementById("blogs_form")
  let name = getdata.name
  let title = form.title.value
  let content = form.content.value
  let category = form.category.value
  let date = form.date.value

  let blog_obj = {
    name,title,content,category,date
  }

   let res = await fetch(api,{
    method : "POST",
    body : JSON.stringify(blog_obj),
    headers : {
      "Content-Type" : "application/json"
    }
  })

  form.title.value = null
  form.content.value = null
  form.category.value=null
  form.date.value=null

}