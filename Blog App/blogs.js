let container = document.querySelector("#container");

let api = "https://mockserverdata.onrender.com/blogs";
let data_arr;
let like=JSON.parse(localStorage.getItem("like")) ||[];
let comments= JSON.parse(localStorage.getItem("comments_arr")) || []
let commentblock = document.querySelector("#commentblock")
let abhi;

let currentPage = 1;
let playersPerPage = 4;

let getdata = async () => {
  let res = await fetch(api);
  let data = await res.json();
  
  // console.log(data)
  return data
  
};

let main = async()=>{
    data_arr = await getdata()
    //renderDOM(data_arr)
    renderDOM(1)
    showButton(1)

}
main()

function display(arr){
  container.innerHTML = null
  arr.forEach(function (el) {
    let div = document.createElement("div");

    let name = document.createElement("h3");
    name.innerText = el.name;

    let category = document.createElement("p");
    category.innerText = el.category;

    let date = document.createElement("p");
    date.innerText = el.date;

    let title = document.createElement("h2");
    title.innerText = el.title;

    let content = document.createElement("p");
    content.innerText = el.content;

    let edit_btn = document.createElement("button");
    edit_btn.innerText = "Edit";
    edit_btn.setAttribute("id", "edittBtn");
    edit_btn.addEventListener("click", function () {
      edit_fun(el.id);
    });

    let delete_btn = document.createElement("button");
    delete_btn.innerText = "Delete";
    delete_btn.setAttribute("id", "deleetBtn");
    delete_btn.addEventListener("click", function () {
      delete_fun(el.id);
    });

    let like_btn = document.createElement("img")
    let c = document.createElement("p")
    let max=0;
    like.forEach((e,i)=>{
        if(e.id==el.id){
            if(max<e.id){
                max=e.id;
            }
           
        }
        
    })
    c.innerText=max;
    
    like_btn.src="https://spng.pngfind.com/pngs/s/560-5601084_heart-outline-svg-vector-logos-love-instagram-hd.png"
    like_btn.setAttribute("id","like")
    c.setAttribute("id","num")
    like_btn.addEventListener("click",function(){
        likes(c,el.id)

    })

  

    let comment_btn = document.createElement("img")
    comment_btn.src="https://www.pngitem.com/pimgs/m/71-714713_comment-logo-png-comment-icon-transparent-png.png"
    comment_btn.setAttribute("id","comment")
    comment_btn.addEventListener("click",function(){
        comments()
    })

    div.append(name, category, date, title, content, edit_btn, delete_btn,c,like_btn,comment_btn);
    container.append(div);
  });
}
 

function renderDOM(page) {
  container.innerHTML = null;

    let start = playersPerPage * (page-1)
    let end = start + playersPerPage
    let per_page_data = data_arr.slice(start,end)
    abhi=per_page_data
    
    per_page_data.forEach(function (el) {
      let div = document.createElement("div");
  
      let name = document.createElement("h3");
      name.innerText = el.name;
  
      let category = document.createElement("p");
      category.innerText = el.category;
  
      let date = document.createElement("p");
      date.innerText = el.date;
  
      let title = document.createElement("h2");
      title.innerText = el.title;
  
      let content = document.createElement("p");
      content.innerText = el.content;
  
      let edit_btn = document.createElement("button");
      edit_btn.innerText = "Edit";
      edit_btn.setAttribute("id", "edittBtn");
      edit_btn.addEventListener("click", function () {
        edit_fun(el.id);
      });
  
      let delete_btn = document.createElement("button");
      delete_btn.innerText = "Delete";
      delete_btn.setAttribute("id", "deleetBtn");
      delete_btn.addEventListener("click", function () {
        delete_fun(el.id);
      });
  
      let like_btn = document.createElement("img")
      let c = document.createElement("p")
      let max=0;
      like.forEach((e,i)=>{
          if(e.id==el.id){
              if(max<e.id){
                  max=e.id;
              }
             
          }
          
      })
      c.innerText=max;
      
      like_btn.src="https://spng.pngfind.com/pngs/s/560-5601084_heart-outline-svg-vector-logos-love-instagram-hd.png"
      like_btn.setAttribute("id","like")
      c.setAttribute("id","num")
      like_btn.addEventListener("click",function(){
          likes(c,el.id)
  
      })
  
    
  
      let comment_btn = document.createElement("img")
      comment_btn.src="https://www.pngitem.com/pimgs/m/71-714713_comment-logo-png-comment-icon-transparent-png.png"
      comment_btn.setAttribute("id","comment")
      comment_btn.addEventListener("click",function(){
          funcomments(el,el.id)
      })
  
      div.append(name, category, date, title, content, edit_btn, delete_btn,c,like_btn,comment_btn);
      container.append(div);
    });
}

async function delete_fun(id) {
  console.log("ok");
  let res = await fetch(`${api}/${id}`, {
    method: "DELETE",
  });

  main();
}

async function edit_fun(id) {
  const new_content = window.prompt("Enter Updated Content");

  let data = { content: new_content };

  let res = await fetch(`${api}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  main();
}

let search = async () => {
  try {
    let searchname = document.querySelector("#search");
    let res = await fetch(`https://mockserverdata.onrender.com/blogs`);
    let data = await res.json();
    // let actual_data=data.results
    // console.log(data)
    searchname.addEventListener("input", function () {
      let filtered = data.filter(function (el) {
        return el.title.toLowerCase().includes(searchname.value.toLowerCase());
      });
      display(filtered);
    });
  } catch (err) {
    console.log(err);
  }
};

let id;

let debounce = (func, time) => {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(() => {
    func();
  }, time);
};

let cat = document.getElementById("filter_category");
console.log("1");
cat.addEventListener("change", sortingfn);

function sortingfn() {
  //console.log("2");
  console.log(data_arr)
  if (cat.value == "") {
    display(abhi);
  } else {
    let filtered = abhi.filter(function (el) {
      return el.category == cat.value;
    });
    display(filtered);
  }
}

let sort = document.querySelector("#sort_by_date");
sort.addEventListener("change", sorting);

function sorting() {
  let value = sort.value;
  if (value == "LowtoHigh") {
    abhi.sort((a, b) => {
      let a1=new Date(a.date);
      let b1=new Date(b.date);
      console.log(a1,b1)
      return a1 - b1;
    });
    //console.log(data_arr)
    display(abhi);
  } else if (value == "HightoLow") {
    abhi.sort((a, b) => {
      let a1=new Date(a.date);
      let b1=new Date(b.date);
      return b1 - a1;
    });
    console.log(abhi)
    display(abhi);
  } else {
    display(abhi);
  }
}

getdata();



function likes(el,id){
    let b=true;    
    like.forEach((e,i)=>{
        if(e.id==id){
            let num=e.id
            num++;
            e[id]=num; 
            b=false;
            like.push(e);
            el.innerText=num; 
        }
        
    })
   
    localStorage.setItem("like",JSON.stringify(like))

   if(b){
    let obj={};
   
    let str= el.innerText;
    let num=Number(str);
   
    num++;
    obj[id]=num;
    like.push(obj);
    localStorage.setItem("like",JSON.stringify(like))
   el.innerText=num; 
 } 
}



let showButton =(page)=>{
  let btn = document.querySelector("#buttons")
  btn.innerHTML = null

  const totalPages = Math.ceil(data_arr.length / playersPerPage);
  let start = 1
  if(page>6){
   start = page -5
  }

  for(let i=start;i<=totalPages;i++){
   let b=document.createElement("button")
   b.innerText = i;

   if(i==page){
       b.setAttribute("id","revbtn")
   }
   
   b.onclick=()=>{
       
       renderDOM(i);
       showButton(i);

   }
   btn.append(b)
}
}




function funcomments(el,id){
     let new_comment = window.prompt("add comment")

     let data = {comment : new_comment , i:id }
     comments.forEach((e,i)=>{
      
      if(i==id){
        let div = document.createElement("div")
      let p = document.createElement("p")
      p.innerText = e.comment
      div.append(p)
      container.append(div)
      }
     })
     comments.push(data)
     localStorage.setItem("comments_arr",JSON.stringify(comments))


}