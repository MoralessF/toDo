const nuevaTarea = document.querySelector('nuevaTarea')
const cardsTareas=document.getElementById('cardsTareas');
const nombreTarea = document.querySelector('input');
const tachado=document.getElementById('actividad');
const contadorCompletas=document.getElementById('contadorCompletas');
const contadorPendientes=document.getElementById('contadorPendientes');

let tareas=[];

const tarea = {
    nombre: '',
    estado: '',
    id: ''

};

const editarTareaaux = () => {
    let tareaEditada = prompt('Ingresa la tarea modificada.')
    nuevaTarea.TextContent = tareaEditada
}

const editarTarea = (id) =>
{
    let tareaEditada = prompt('Ingresa nuevo nombre tarea.')
    const tareaAux = tareas.find((tarea)=>tarea.id==id);
    tareaAux.nombre=tareaEditada;
    const tareasJson = JSON.stringify(tareas);
    localStorage.setItem('tareas', tareasJson);
    contadorTareas(-1);
    renderizarActividades();
}

const contadorTareas = (id) =>
{
    let pendientes = 0;
    let completas = 0;
    tareas.forEach((tarea) => {
        
        if(id == tarea.id)
        {
            if(tarea.estado == "pendiente")
            {
                tarea.estado = "completa";
            }
            else
            {
                tarea.estado = "pendiente";
            }
            const tareasJson = JSON.stringify(tareas);
            localStorage.setItem('tareas', tareasJson);

        }
        if(tarea.estado == "pendiente")
        {
            pendientes++;

        }
        else
        {
            completas++;
        }
    })

    contadorCompletas.innerText = completas;
    contadorPendientes.innerText = pendientes;
    renderizarActividades();
}

const construirTarea = (tarea) => {

   let tarea2 =`<div ondblclick="contadorTareas(${tarea.id})" class="border d-flex justify-content-between p-2">
            <div id="actividad" class="d-flex align-items-center">`;
    if(tarea.estado == "pendiente")
    {
        tarea2+= `<i id = "pendiente" class="fa-solid fa-list-check me-2"></i> <span class="">${tarea.nombre}</span>`;
    }
    else
    {
        tarea2+= `<i id = "completa" class="bi bi-check-lg me-2"></i> <span class="text-decoration-line-through">${tarea.nombre}</span>`;
    }

    tarea2+= `</div> 
            <div>
                <button class="editar btn btn-outline-primary" onclick="editarTarea(${tarea.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="eliminar btn btn-outline-danger" onclick="eliminarTarea(${tarea.id})">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
    </div>`;

    return tarea2;       
}

const renderizarActividades = () =>
{
    const cardsEnDiv = cardsTareas.children;
    if (cardsEnDiv.length > 0)
    {
        const cards = Array.from(cardsEnDiv);
        cards.forEach((card) =>
        {
            cardsTareas.removeChild(card);
        });
    }

    tareas.forEach((tarea) =>
    {
        const card = construirTarea(tarea);
        cardsTareas.insertAdjacentHTML('afterbegin', card);
    });
}

const eliminarTarea = (id) =>
{
    const eliminar = confirm('¿Deseas eliminar esta actividad?')
    if (eliminar == true) {
        tareas = tareas.filter((tarea) => {
            return tarea.id != id;
        });
        const tareasJson = JSON.stringify(tareas);
        localStorage.setItem('tareas', tareasJson);
        contadorTareas(-1);
        renderizarActividades();
    }

}

const guardarTarea = (e) => {
    e.preventDefault();
    const tiempoActual = new Date();
    const nombre = nombreTarea.value;
    nombreTarea.value='';
    let tarea = {};
    console.log("entre");
    tarea.nombre = nombre;
    tarea.estado = "completa";
    tarea.id = `${tiempoActual.getTime()}${tiempoActual.getMilliseconds()}`;
    tareas.push(tarea);
    const tareasJson = JSON.stringify(tareas);
    localStorage.setItem('tareas', tareasJson);
    contadorTareas(tarea.id);
    renderizarActividades();
}

const init = () => {
    const tareasLocales = localStorage.getItem('tareas');
    if (tareasLocales) {
        tareas = JSON.parse(tareasLocales);
        contadorTareas(-1);
        renderizarActividades();
    }
}

init();