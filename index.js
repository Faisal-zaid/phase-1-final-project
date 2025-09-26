const contestant=document.getElementById("contestants");
const nganyaImage=document.getElementById("nganya-image");
const category=document.getElementById("matwana");
const votes=document.getElementById("kura-button");
const nganyaVotes=document.getElementById("nganya-votes")
const rudiaKura=document.getElementById("reset-button")
const jina=document.getElementById("street_name")
const mtaa=document.getElementById("hood")
const kuhusu=document.getElementById("about")
 
let selectedNganya=null; 
let nganyas=[]

fetch("http://localhost:3000/nganya")
.then(response=>response.json())
.then(data=>{
    nganyas=data;
    displaycontestant(nganyas)
})

function displaycontestant(nganya){
    nganyas.forEach(nganya=>{
        const li=document.createElement("li")
        li.textContent=nganya.title
        li.addEventListener("click", ()=>  showContestant(nganya));
        contestant.appendChild(li)
    })
}


function showContestant(nganya) {
  selectedNganya = nganya;
  //contestant.textContent = nganya.title;
  nganyaImage.src =nganya.image;
  nganyaImage.alt = nganya.title;
  category.textContent="category:" +''+nganya.category;
  jina.textContent="street-name:" +''+nganya.street_name;
  mtaa.textContent="hood:" +''+nganya.hood;
  kuhusu.textContent="about:" +''+nganya.description;
  nganyaVotes.textContent = nganya.votes;
}

voteButton.addEventListener(`click`,()=>{
    if(selectedNganya){
        selectedNganya.votes++;
        nganyaVotes.textContent=selectedNganya.votes

        fetch(`http://localhost:3000/nganya/${selectedNganya.id}`,{
      method: "PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({votes:selectedNganya.votes})

    })
    .then(res=>res.json())
    .then (newNganya=>{
      console.log("voteMpya:",newNganya);

            })
        
}
});
