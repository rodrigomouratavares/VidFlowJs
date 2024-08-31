const capturandoVideo = document.querySelector('.videos__container')
// --json-server --watch backend/videos.json 

  async function buscarMostrarVideos(){

  try{
const api = await fetch("http://localhost:3000/videos")
const videos = await api.json()


    videos.forEach((video => {
      if(video.categoria == ""){
        throw new Error ("Categoria está vazia.");
      }
      capturandoVideo.innerHTML += `<li class="videos__item">
                	<iframe src="${video.url}" title="${video.descricao}" frameborder="0" allowfullscreen></iframe>
                            <div class="descricao-video">
                 	<img class="img-canal" src = "${video.imagem}" alt="Logo do Canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
                <p class="categoria" hidden> ${video.categoria}</p>
                 </div>
                </li>`  ;
    })
)

  }  catch(error){
capturandoVideo.innerHTML = `${error}`
                  }

}
buscarMostrarVideos();


const barraDePesquisa = document.querySelector(".pesquisar__input");


barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa(){
  const videos = document.querySelectorAll(".videos__item");

  if(!barraDePesquisa.value == ""){

    for(let video of videos) {
      let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if(!titulo.includes(valorFiltro)){
        video.style.display = "none";
      } 
    }
  } else{
    videos.forEach(video => {
      video.style.display = "block";
    });
  }
}

let botaoCategoria= document.querySelectorAll(".superior__item");

botaoCategoria.forEach(botao => {
let nomeCategoria = botao.getAttribute("name");
botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));

})


function filtrarPorCategoria(filtro){
const videos = document.querySelectorAll('.videos__item');
for(let video of videos){
  let categoria = video.querySelector(".categoria").textContent.toLowerCase();
  let valorFiltro = filtro.toLowerCase();
  
  if(!categoria.includes(valorFiltro)  && valorFiltro != 'tudo' )  {
    video.style.display = 'none';
  }
  else{
    video.style.display = 'block';
  } 
}
}
