from flask import Flask, render_template
from os import listdir
import os


#El virtual env se llama env
#virt\Scripts\activate

app = Flask(__name__)

ruta_app = os.getcwd()

#Create a route/decorator
@app.route("/index")
def index():
	return render_template("index.html")

@app.route("/user/<name>")
def user(name):
	lista = ["1","2","3"]
	return render_template("user.html", name=name, lista=lista)

@app.route("/modelo_tema")
def modelo_tema():
	return render_template("/temas/modelo_tema_hecho.html")

#creando página de inicio
@app.route("/")
@app.route("/temas")
@app.route("/profile_card")
def profile_card():
	
	filename = []
	asignaturas = ("microbiologia", "digestivo")

	for asignatura in asignaturas:
		for archivo in listdir(ruta_app + "/templates/temas/" + asignatura):
			filename.append((archivo, asignatura))

	return render_template("profile_card.html",
	 filename=filename,
	 asignaturas=asignaturas)

#crear enlace dinámico a temas
@app.route("/temas/<asignatura>/<file>")
def temas(asignatura, file):
	filename = []
	nombre_temas = []

	for archivo in listdir(ruta_app + "/templates/temas/" + asignatura):
		filename.append(archivo)

	for tema in filename:
		tema = tema.replace(".html","").title()
		nombre_temas.append(tema)

	numero_temas = len(nombre_temas)
	return render_template("/temas/" + asignatura + "/" + file,
     filename=filename, asignatura=asignatura, nombre_temas=nombre_temas,
     numero_temas=numero_temas, file=file )

#Create custom error pages
@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404

@app.errorhandler(500)
def page_not_found(e):
	return render_template("500.html"), 500


if __name__ == '__main__':
    app.run(debug=True)

