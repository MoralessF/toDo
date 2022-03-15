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
    if(tarea.estado == "pendiente")
    {
        tarea+= `<i id = "pendiente" class="fa-solid fa-list-check"></i>`;
    }
    else
    {

        tarea+= `<i id = "completa" class="bi bi-check-lg"></i>`;
    }

    tarea+= `${tarea.nombre}
            </div> 
            <div>
                <button class="editar btn btn-outline-primary" onclick="editarActividad(${tarea.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="eliminar btn btn-outline-danger" onclick="eliminarActividad(${tarea.id})">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
    </div>`;

    return tarea;
        
}

//<i class="bi bi-pencil-square"></i>
//<i class="bi bi-trash-fill"></i>

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