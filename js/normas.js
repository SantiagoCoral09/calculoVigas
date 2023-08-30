function normas(titulo) {
	console.log(titulo);

	if (titulo=="a"){
	    document.getElementById("Normas").innerHTML="<h3>REQUISITOS GENERALES</h3><iframe src='https://www.scg.org.co/Titulo-A-NSR-10-Decreto%20Final-2010-01-13.pdf' style='border: none; width: 95%; height: 780px;'></iframe>";
	}
	if (titulo=="b"){
	    document.getElementById("Normas").innerHTML="<h3>CARGAS</h3><iframe src='../manual/NSR-10_Titulo_B.pdf ' style='border: none; width: 95%; height: 780px;'></iframe>";
	}
	if (titulo=="c"){
	    document.getElementById("Normas").innerHTML="<h3>Concreto Estructural</h3><iframe src='../manual/NSR-10_Titulo_C.pdf' style='border: none; width: 95%; height: 780px;'></iframe>";
	}
	if (titulo=="j"){
	    document.getElementById("Normas").innerHTML="<h3>REQUISITOS DE PROTECCIÓN CONTRA INCENDIOS </h3><iframe src='../manual/NSR-10_Titulo_J.pdf' style='border: none; width: 95%; height: 780px;'></iframe>";
	}
  }