let form = document.querySelector("#login_form")

const api = "https://mockserverdata.onrender.com/users"

let rev_data;

let getData = async()=>{
    let res = await fetch(api)
    let data = await res.json()
    rev_data=data;
   //console.log(data)
   // displayDOM(data)
}

getData()

form.addEventListener("submit",function(e){
    e.preventDefault()
    
    let login_obj = {
        email : form.email.value,
        password : form.password.value
    }
    


    if(password.value=="" || email.value==""){
        alert("Fill all Fields")
    }
    else{
           let f=true;
        rev_data.forEach(function(el){
            
        if(el.email==login_obj.email && el.password == login_obj.password){
            alert("successful")
            window.location.href="blogs.html"
            f=false; 
            localStorage.setItem("sigiin",JSON.stringify(el))  
                 
        }  
         
    })

    if(f){
        alert("not succesfull..")
    }
    }

})