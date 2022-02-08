const IDBRequest = indexedDB.open("info_temas", 1);

IDBRequest.addEventListener("upgradeneeded", ()=>{
	const db = IDBRequest.result;
	db.createObjectStore("info_temas", {
		autoIncrement: true
		});
});

IDBRequest.addEventListener("success",()=>{
	console.log("Todo salió correctamente");
	iniciar();
	leerObjeto();
});

IDBRequest.addEventListener("error",()=>{
	console.log("Ocurrió un error")
});

const addObjeto = objeto =>{
	const IDBData = getIDBData("readwrite", "Objeto agregado correctamente");
	IDBData.add(objeto);
};

const modificarObjeto = (key,objeto) =>{
	const IDBData = getIDBData("readwrite","Objeto modificado correctamente");
	IDBData.put(objeto,key);
};

const eliminarObjeto = (key) =>{
	const IDBData = getIDBData("readwrite","Objeto elimiando correctamente");
	IDBData.delete(key);
};

const leerObjeto = () =>{
	const IDBData = getIDBData("readonly", "Todos los datos ya han sido leídos");
	const cursor = IDBData.openCursor();

	cursor.addEventListener("success", ()=>{
		if (cursor.result){
			poner_a_punto(cursor.result.value)
			cursor.result.continue();
		} else {
			console.log("Todos los datos han sido leídos")
		};
	});
};

const getIDBData = (mode, msg)=>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("info_temas", mode);
	const objectStore = IDBtransaction.objectStore("info_temas");
	IDBtransaction.addEventListener("complete", ()=>{
		console.log(msg);
	});
	return objectStore;
};


let fecha = new Date();
console.log(fecha.getTime())
let lista_meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const btn = document.getElementById("btn");
console.log(btn)
const btn_micro = document.getElementById("btn_microbiologia");
const btn_digestivo = document.getElementById("btn_digestivo");

const micro = document.getElementById("microbiologia");
const digestivo = document.getElementById("digestivo");

btn_micro.onclick = () =>{
	btn.style.left = "0px";
	btn.style.width = "180px";

	micro.style.left = "0px";
	digestivo.style.right = "-100%"; 

	btn_micro.style.color = "#000";
	btn_digestivo.style.color = "#fff";
};
btn_digestivo.onclick = () =>{
	btn.style.left = "186px";
	btn.style.width = "130px";

	micro.style.left = "-100%";
	digestivo.style.right = "0px"; 

	btn_micro.style.color = "#fff";
	btn_digestivo.style.color = "#000";
};


//crar modificaciones de los temas

function poner_a_punto(value) {
	let barra_dificultad = document.querySelectorAll(".dificultad");
	let bateria = document.querySelectorAll(".bateria");
	let fecha_ultimo_estudio = document.querySelectorAll(".fecha");

	bateria[value.id].classList = value.bateria;
	barra_dificultad[value.id].id = value.dificultad;
	fecha_ultimo_estudio[value.id].textContent = value.fecha; 


}

function s(i){
	let barra_dificultad = document.querySelectorAll(".dificultad");
	let bateria = document.querySelectorAll(".bateria");
	let boton_añadir = document.querySelectorAll(".boton_añadir");
	let texto_fecha = document.querySelectorAll(".fecha");

		barra_dificultad[i].onclick = () =>{
			if (barra_dificultad[i].id == "red"){
				barra_dificultad[i].id = "green";
				color = "green";
			} else if(barra_dificultad[i].id == "yellow"){
				barra_dificultad[i].id = "red";
				color = "red";
			} else if(barra_dificultad[i].id == "green"){
				barra_dificultad[i].id = "yellow"
				color = "yellow";
			} else{
				barra_dificultad[i].id = "green"
				color = "green";
			};
			modificarObjeto(i, 
				{
	        	"dificultad": `${color}`,
	        	"bateria": `${bateria[i].classList}`,
	        	"id": `${i}`,
	        	"fecha": `${texto_fecha[i].textContent}`
				});
		};

		bateria[i].onclick = () =>{
			if (bateria[i].classList.contains("fa-battery-quarter")){
				bateria[i].classList.replace("fa-battery-quarter","fa-battery-half")
				bat = "bateria fas fa-battery-half";
			} else if(bateria[i].classList.contains("fa-battery-half")){
				bateria[i].classList.replace("fa-battery-half","fa-battery-three-quarters")
				bat = "bateria fas fa-battery-three-quarters";
			} else if(bateria[i].classList.contains("fa-battery-three-quarters")){
				bateria[i].classList.replace("fa-battery-three-quarters","fa-battery-full")
				bat = "bateria fas fa-battery-full";
			} else if(bateria[i].classList.contains("fa-battery-full")){
				bateria[i].classList.replace("fa-battery-full","fa-battery-empty")
				bat = "bateria fas fa-battery-empty";
			}  else if(bateria[i].classList.contains("fa-battery-empty")){
				bateria[i].classList.replace("fa-battery-empty","fa-battery-quarter")
				bat = "bateria fas fa-battery-quarter";
			};
			modificarObjeto(i, 
					{
	        		"dificultad": `${barra_dificultad[i].id}`,
	        		"bateria": `${bat}`,
	        		"id": `${i}`,
	        		"fecha":`${texto_fecha[i].textContent}`
					});
		};

		boton_añadir[i].onclick =() =>{
			modificarObjeto(i, 
					{
	        		"dificultad": `${barra_dificultad[i].id}`,
	        		"bateria": `${bateria[i].classList}`,
	        		"id": `${i}`,
	        		"fecha": `${fecha.getDate().toString()}/${lista_meses[fecha.getMonth()].toString()}/${fecha.getFullYear().toString()}`
					});
		}

};

function iniciar(){
	let boton_añadir = document.querySelectorAll(".boton_añadir");
	for(let i = 0; i < boton_añadir.length; i++){
		s(i)
	};
};

