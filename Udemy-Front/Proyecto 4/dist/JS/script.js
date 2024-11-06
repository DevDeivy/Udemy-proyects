
document.addEventListener('DOMContentLoaded', function(){ //cuando el DOM se cargue osea el HTML
    navegacionFija();
    resaltarEnlaces(); 
    CrearGaleria();
    scrollNavegation();
});

function navegacionFija(){
    const header = document.querySelector('.header'); //inyectar el header
    const sobre_festival = document.querySelector('.sobre-festival'); //clase a pasar

    //evento
    document.addEventListener('scroll', function(){
        if(sobre_festival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
}

function CrearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes'); //seleccionar el elemento galeria
    const limit = 16;

    //inyectar HTML
    for(let i = 1; i <= limit; i++){
        const imagen = document.createElement('IMG')
        imagen.src = `/SRC/img/gallery/full/${i}.jpg `;
        imagen.alt = `imagen galeria`;
        galeria.appendChild(imagen);
        
        imagen.onclick = function(){ //se llama la funcion mostrarImagen
            mostrarImagen(i);
        }

    }
}; 

function mostrarImagen(i){
    const imagen = document.createElement('IMG')
    imagen.src = `/SRC/img/gallery/full/${i}.jpg `;
    imagen.alt = `imagen galeria`;

    //agregando la clase modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    //boton cerrar modal
    const cerrarmodalBtn = document.createElement('BUTTON');
    cerrarmodalBtn.textContent = 'X';
    cerrarmodalBtn.classList.add('boton-cerrar');
    cerrarmodalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarmodalBtn);

    //agregar el modal al body para estilos
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden'); //quitar scroll
    body.appendChild(modal);
}

function cerrarModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() =>{
        modal?.remove();
        //permitir scroll
        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlaces(){
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');
        const links = document.querySelectorAll('.navegacion-principal a');

        let actual = '';
        sections.forEach(sections => {
            const sectionTop = sections.offsetTop; // offsetTop es la distancia entre secciones
            const sectionHeight = sections.clientHeight; // cluentHeight es el alto de la seccion

            if(window.scrollY >= (sectionTop - sectionHeight/3)){
                actual = sections.id;
            }
        });

        links.forEach(link  => {
            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('active');
            } else{
                link.classList.remove('active');
            }
        })
    });
}

function scrollNavegation(){
    const navegacion = document.querySelectorAll('.navegacion-principal a');
    navegacion.forEach(link =>{
        link.addEventListener('click', e =>{
            e.preventDefault(); //quitar el default
            const selectLinks = e.target.getAttribute('href')
            const section = document.querySelector(selectLinks);
            section.scrollIntoView({behavior: 'smooth'});
        });
    });
}
