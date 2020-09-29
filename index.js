const baseURL="https://pokeapi.co/api/v2/"
let url;



const searchType=document.querySelector('.searchType');

const searchForm=document.querySelector('form');
const submitBtn=document.querySelector('.submit');

//result 
const nextBtn=document.querySelector('.next');
const previousBtn=document.querySelector('.prev');
const nav=document.querySelector('nav');

//result section
const section=document.querySelector('section');

nav.style.display='none';
let pageNumber=1;

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', prevPage);

function fetchResults(e){
    e.preventDefault();
    url = baseURL// +'page/'+pageNumber;
    if(searchType.value!== ''){
        url+='type/'+searchType.value+'/';
    }

    fetch(url)
    .then(function(result){
        console.log(result);
        return result.json();
    })
    .then(function(json){
        console.log(json);
       displayResults(json);
    })
    .catch(function(error){
        console.log(error);
    })
}
function displayResults(json){
    console.log('Display Results', json)
    while(section.firstChild){
        section.removeChild(section.firstChild);
   }
    let pokemon=json.pokemon;

   if(pokemon.length==0){
    console.log("No results");
    let para=document.createElement('p');
    para.textContent='No results found.';
    section.appendChild(para);
   } else{
       for(let i=0;i<pokemon.length;i++){
           let poke=document.createElement('article');
           let name=document.createElement('h2');
           let type=document.createElement('h3');
           let pic=document.createElement('img');
           let clearfix=document.createElement('div');
        
           let current=pokemon[i].pokemon.url
          // console.log('Current:', current);
            fetch(current)
            .then(function(result){
                console.log(result);
                return result.json();
            })
            .then(function(json){
                console.log(json);
            name.textContent+=json.id+" "+json.name;
            for(let i=0;i<json.types.length;i++){
                type.textContent+=json.types[`${i}`].type.name+" ";
            }
            // type.textContent+=json.types["0"].type.name;
            pic.src=json.sprites.front_default;
            pic.alt=json.name;
            clearfix.setAttribute('class','clearfix');
          
            poke.appendChild(name);
            poke.appendChild(pic);
            poke.appendChild(type);
            poke.appendChild(clearfix);
            section.appendChild(poke);
                return json;
            })
        }

       }}


function nextPage(e){
    pageNumber++;
    fetchResults(e);
    console.log('Page Number:',pageNumber);
}
function prevPage(){
    if(pageNumber>1){
        pageNumber--;
    } else{
        return;
    }
    fetchResults(e);
    console.log('Page:',pageNumber);
}