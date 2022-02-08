const left_cont = document.getElementById("left_container");
const center_cont = document.getElementById("center_container");
const right_cont = document.getElementById("right_container");
const left_btn = document.getElementById("left_btn");
const right_btn = document.getElementById("right_btn");

left_cont.style.left = "-100%";
right_cont.style.left = "100%";

left_btn.onclick = () =>{
	if (right_cont.style.left == "0px"){
		right_cont.style.left = "100%";
	}
	else{
		left_cont.style.left = "0px";
	};
	
}

right_btn.onclick = () =>{
	if (left_cont.style.left == "0px"){
		left_cont.style.left = "-100%";
	}
	else{
		right_cont.style.left = "0px";
	};
};

const titulo =  document.querySelectorAll("h2");
const apartado =  document.querySelectorAll("h3");
const subapartado =  document.querySelectorAll("h4");
const subsubapartado = document.querySelectorAll("h5");

for (let i = 0; i < apartado.length; i++){apartado[i].classList.add("H", "h3")};
for (let i = 0; i < subapartado.length; i++){subapartado[i].classList.add("H", "h4")};
for (let i = 0; i < subsubapartado.length; i++){subsubapartado[i].classList.add("H", "h5")};

const h = document.querySelectorAll(".H");

let h3count = 1;
let h4count = 1;
let h5count = 1;

//Organizamos toda la jerarquía de números
for (let i = 0; i < h.length; i++){
	if (h[i].classList == "H h3") {
		h[i].innerHTML = `${h3count}. ${h[i].innerHTML}`;
		h3count +=1;
	} else if(h[i].classList == "H h4") {
		h[i].innerHTML = `${h3count-1}.${h4count} ${h[i].innerHTML}`;
		h4count +=1;
	} else if(h[i].classList == "H h5"){
		h[i].innerHTML = `${h3count-1}.${h4count-1}.${h5count} ${h[i].innerHTML}`;
		h5count +=1;
	};
	if (i+1 < h.length && h[i+1].classList == "H h3") {
			h4count = 1;
	};
	if(i+1 < h.length && h[i+1].classList == "H h4") {
			h5count = 1;
	};
};

//Estableciendo el índice
const indice = document.getElementById("menu");

let documentFragment = document.createDocumentFragment();

//creando indice de temas
let numerotemas = parseInt(document.getElementById("numero_temas").value);
let asignatura = document.getElementById("asignatura").value;

let nombres_tema = document.querySelectorAll(".nombres_tema");
let lista_nombres_tema = [];
for(let i = 0; i < nombres_tema.length; i++){
	lista_nombres_tema.push(nombres_tema[i].value)
};

let url_tema = document.querySelectorAll(".url_tema");
let lista_url_tema = [];
for(let i = 0; i < url_tema.length; i++){
	lista_url_tema.push(url_tema[i].value)
};


for (let i = 0; i < numerotemas; i++){
	let li = document.createElement("LI");
	li.id = `${lista_url_tema[i]}_id`;
	li.innerHTML = `<input type="checkbox" 
				name="list" id="nivel${i}-${i}">
				<label for="nivel${i}-${i}" class="label">${lista_nombres_tema[i]}</label>
				<a href="/temas/${asignatura}/${lista_url_tema[i]}" target="_blank"></a>`;
	documentFragment.appendChild(li);
};

indice.appendChild(documentFragment);

let info_tema_actual = document.getElementById(`info_tema_actual`);

//creando indices dentro del tema
const tema_actual = document.getElementById(`${info_tema_actual.value}_id`);

//creamos la lista en la que vamos a meter todo, y luego lo meteremos dentro del tema
let lista = document.createElement("UL");
lista.classList.add("interior");

//añadiendo funcíon para que el indice se cierre solo al pulsar un enlace
let nav2 = document.querySelector(".nav_responsive-ul");
nav2.onmouseenter = function(){document.querySelector(".nav_li-container").style.left="20px"};
nav2.onmouseleave = function(){document.querySelector(".nav_li-container").style.left="-1000px"};

//ids para luego poder localizar cada apartado con su subapartado
let ids = 1;

for(let i = 0; i < h.length; i++){

	//crear un apartado que no tiene subapartados, luego es enlace directo
	if (i+1 < h.length && h[i+1].classList == "H h3" && h[i].classList == "H h3"){
		let il = document.createElement("LI");
		il.innerHTML = `<a href="#a000">${h[i].innerHTML}</a>`;
		il.onclick = () =>{h[i].scrollIntoView(); 
			document.querySelector(".nav_li-container").style.left="-1000px"};
		lista.appendChild(il);
		ids+=1;

	} else if (i+1 == h.length && h[i].classList == "H h3"){
		//creando el último apartado
		let il = document.createElement("LI");
		il.innerHTML = `<a href="#a000">${h[i].innerHTML}</a>`;
		il.onclick = () =>{h[i].scrollIntoView();
			document.querySelector(".nav_li-container").style.left="-1000px"};
		lista.appendChild(il);
	}else if (h[i].classList == "H h3"){
		//creando apartado con subapartados
		let li = document.createElement("LI");
		//creamos el texto en el que metemos el texto y la funcion scroll
		let text = document.createElement("TEXT");
		text.innerHTML = ` ${h[i].innerHTML}`;
		text.onclick = () =>{h[i].scrollIntoView();
			document.querySelector(".nav_li-container").style.left="-1000px"};
		li.innerHTML = `<input type="checkbox" 
					name="list" id="nivel${ids}"><label for="nivel${ids}" class="label_especial">(...)</label>`;
		li.appendChild(text)

		
		let ul = document.createElement("UL");
		ul.classList.add("interior");
		ul.id = `niveles${ids}`;

		li.appendChild(ul);
		lista.appendChild(li);

		ids+=1;
	};
};

tema_actual.appendChild(lista);

//creando subindices
for(let i = 0; i < h.length; i++){
	if(h[i].classList == "H h4"){
		let letra = h[i].innerHTML.substring(0,5);
		let nivel = document.getElementById(`niveles${letra[0]}`);
		let il = document.createElement("LI");
		il.innerHTML = `<a href="#a000">${h[i].innerHTML}</a>`;
		//añadiendo función para desplazarse
		il.onclick = () =>{h[i].scrollIntoView();
			document.querySelector(".nav_li-container").style.left="-1000px"};
		nivel.appendChild(il);
	}
}


/*<li id = "hola"><input type="checkbox" name="list" id="nivel1-1"><label for="nivel1-1">Tema 1</label>
</li>*/
/*`<li><input type="checkbox" name="list" id="nivel1-1"><label for="nivel1-1">Tema 1</label>
	<ul class="interior">
		<li><a href="#a000">Introducción</a></li>
		<li><a href="#a001">Dolor de origen gastrointestinal</a></li>
		<li><a href="#a002">Causas neumológicas</a></li>
		<li><a href="#a003">Dolor de origen cardiovascular</a></li>
		<li><a href="#a004">Causas neuromusculares</a></li>
		<li><a href="#a005">Causas psicosomáticas</a></li>
		<li><a href="#a006">Extras</a></li>
	</ul>
</li>`*/						





