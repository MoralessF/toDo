const nuevaTarea = document.querySelector('.nuevaTarea')
const cardsActividades=document.getElementById('cardsActividades');
let actividades=[];

const tarea = {
    nombre: '',
    estado: '',

};

const editarTarea = () => {
    let tareaEditada = prompt('Ingresa la tarea modificada.')
    nuevaTarea.TextContent = tareaEditada
}


const construirTarea = () => {

   const tarea =`<div class="border border d-flex  justify-content-between bg-white">
            <div class="">`;
    if(tarea.estado == "pendiente"){
               tarea+= `<svg id = "pendiente" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>`
    }
    else
    {

        tarea+= `</svg> <svg id = "completa" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg>` 
    }

    tarea+= `${tarea.nombre}
            </div> 
            <div>
                <button class="editar" onclick="editarActividad(${tarea.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button class="eliminar" onclick="eliminarActividad(${tarea.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </div>
    </div>`;

    return tarea;
        
}

// const itemActividad = (actividad) => {
//     const card = `<div class="card col-sm-4">
//         <div class="card-body">
//             <h5 class="card-title">${actividad.alias}</h5>
//             <p class="card-text">Nombre Real: ${actividad.nombre}</p>
//             <div class = "d-flex justify-content-end gap-3">
//                 <button onclick="edicionHeroe(${actividad.id})" class="btn btn-primary"><i class="fa-solid fa-paintbrush"></i></button>
//                 <button onclick="eliminarHeroe(${actividad.id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
//             </div>
//         </div>
//     </div>`;
//     return card;
// }

const renderizarActividades = () =>
{

    const cardsEnDiv = cardsActividades.children;
    if (cardsEnDiv.length > 0)
    {
        const cards = Array.from(cardsEnDiv);
        cards.forEach((card) =>
        {
            cardsActividades.removeChild(card);
        });
    }

    actividades.forEach((actividad) =>
    {
        const card = construirTarea(actividad);
        cardsActividades.insertAdjacentHTML('afterbegin', card);
    });
}

const eliminarActividad = (id) =>
{
    const eliminar = confirm('¿Deseas eliminar este actividad?')
    if (eliminar == true) {
        actividades = actividades.filter((actividad) => {
            return actividad.id != id;
        });
        const actividadesJson = JSON.stringify(actividades);
        localStorage.setItem('actividades', actividadesJson);
        renderizarActividades();
    }

}

const guardarTarea = (e) => {
    e.preventDefault();
    const tiempoActual = new Date();
    const inputsNode = e.target.querySelectorAll('input');
    const inputs = Array.from(inputsNode);
    let tarea = {}
    inputs.forEach((input) => {
        actividad[input.name] = input.value;
    });
    actividad.id = `${tiempoActual.getTime()}-${tiempoActual.getMilliseconds()}`;
    actividades.push(actividad);
    const actividadesJson = JSON.stringify(actividades);
    localStorage.setItem('actividades', actividadesJson);

    setTimeout(() => {
        renderizarActividades();
    }, 2000);
}