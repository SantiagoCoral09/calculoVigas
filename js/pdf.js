window.jsPDF = window.jspdf.jsPDF;
function generarPDF() {
    const doc = new jsPDF('p','mm','letter');

    let table = document.getElementById('tabla_varillas');
    doc.text('Reporte de resultados', 10, 10);
    
    doc.html(table,{
        callback: function (doc) {
            window.open(doc.output('bloburl'),'_blank');
        },
        margin:[30,5,15,30],
        x:0,
        y:0,
        width:150,
        windowWidth:675
    });
}

function generarPDFVigas(){
    const doc = new jsPDF('p','mm','letter');

    let table_superior = document.getElementById('superior');
    let table_medio = document.getElementById('inferior');
    let table_inferior = document.getElementById('resultado_cortante');

    // Agregar estilos CSS al encabezado del documento HTML
    let style = '<style>h1 { font-size: 24px; font-weight: bold; text-align: center; font-family: Arial, Helvetica, sans-serif; color: black;}h2 { font-size: 20px; font-weight: bold; text-align: center;}table { text-align: center; }</style>';

    // Crear un elemento HTML que contenga las tres tablas con títulos y subtítulos
    let content = '<h1>REPORTE DE RESULTADOS: CÁLCULO DE VIGAS</h1><hr><br><br><h1>DISEÑO A FLEXIÓN</h1><div><br><br><h2>Datos fibra superior</h2>';
    content += table_superior.innerHTML;
    content += '</div><div><br><br><br><h2>Datos fibra inferior</h2>';
    content += table_medio.innerHTML;
    content += '</div><br><br><br><br><br><br><br><div><h1>CÁLCULOS CORTANTE</h1><br>';
    content += table_inferior.innerHTML;
    content += '</div>';

    // Agregar contenido HTML con estilos CSS al PDF utilizando el método doc.html()
    doc.html(content+style,{
        callback: function (doc) {
            //doc.output('dataurlnewwindow',{filename:'reporte.pdf'});
            //window.open(doc.output('bloburl'),'_blank');
            doc.save('calculo_vigas.pdf');
        },
        margin:[30,5,30,25],
        x:0,
        y:0,
        width:150,
        windowWidth:675
    });

   
}