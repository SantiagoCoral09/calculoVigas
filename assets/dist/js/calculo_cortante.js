

function limpiar_cortante() {
    document.getElementById("bh").textContent = '';
    document.getElementById("inputVu").innerHTML = '';
    document.getElementById("datos_cortante").innerHTML = '';
    document.getElementById("resultado_cortante").innerHTML = '';
    document.getElementById('tabla_resultado_cortante').style.display = 'none';
    document.getElementById('chequeo_acero').style.display = 'none';
    document.getElementById('formulas_cortante').style.display = 'none';


}

function separacionLongitudinal(d, diametro) {
    let s1 = d / 4;
    let s2 = 6 * diametro;
    let sMin = Math.min(s1, s2, 150);
    let s = Math.floor(sMin / 10) * 10;
    return s;
}

function aceroRefuerzoMinimo(fc, b, s, fy) {
    let a1 = (0.062 * Math.sqrt(fc) * b * s) / fy;
    let a2 = (0.35 * b * s) / fy;
    let av_min = Math.max(a1, a2);
    return av_min;
}

function aceroSuministradoCortante(cantidadVarillas, areaEstribo) {
    let av_suministrado = cantidadVarillas * areaEstribo;
    return av_suministrado;
}

function resistenciaVigaCortante(av_suministrado, fy, d, s) {
    let OVn = (0.75 * av_suministrado * fy * d) / s;
    OVn = OVn / 1000;
    return OVn;
}

function avMinMenoravSum(av_min, av_sum) {
    if (av_min < av_sum) {
        return true;
    }
    else return false;
}
function vNmayorVu(vN, vU) {
    if (vN > vU) {
        return true;
    }
    else return false;
}
function calcular_cortante() {
    document.getElementById("bh").textContent = '';
    document.getElementById("datos_cortante").textContent = '';
    document.getElementById("inputVu").textContent = '';
    document.getElementById('chequeo_acero').style.display = 'none';
    document.getElementById('formulas_cortante').style.display = 'none';
    let msgResistencia ='';


    //Necesitamos los valores de:
    let recubrimiento, b, h, numeroVarilla, diametro, area, NoVarillaLongSup, diametroLongSup, areaLongSup, NoVarillaLongInf, diametroLongInf, areaLongInf, NoVarillaEstribo, diametroEstribo, areaEstribo, Fc, Fy, Vu;
    b = Number(document.getElementById("b").value); //
    h = Number(document.getElementById("h").value); //
    Fc = Number(document.getElementById("fc").value); //
    Fc1 = Number(document.getElementById("fc1").value); //
    Fy = Number(document.getElementById("fy").value); //
    // ag = Number(document.getElementById("ag").value);
    recubrimiento = Number(document.getElementById("recubrimiento").value); //
    numeroVarilla = Number(document.getElementById("numeroVarilla").value); //
    diametro = Number(document.getElementById("diametro").value); //
    area = Number(document.getElementById("area").value); //
    NoVarillaEstribo = (document.getElementById("numeroVarillaEstribo").value); //
    diametroEstribo = Number(document.getElementById("diametro_estribo").value); //
    Vu = Number(document.getElementById("Vu").value);
    if (Fc == '') {
        Fc=Fc1;
        console.log("Valor de FC: ",Fc);
        document.getElementById("fc").value = Fc;
     }
    let NoVarillaSup = (document.getElementById("nvarilla_superior").value); //
    let indiceSup = numerosVarilla.indexOf(NoVarillaSup);
    let diametroVarSup = Number(diametrosVarillas[indiceSup]);
    let areaVarSup = Number(areasVarillas[indiceSup]);
    let NoVarillaInf = (document.getElementById("nvarilla_inferior").value); //
    let indiceInf = numerosVarilla.indexOf(NoVarillaInf);
    let diametroVarInf = Number(diametrosVarillas[indiceInf]);
    let areaVarInf = Number(areasVarillas[indiceInf]);
    console.log("Varilla No" + NoVarillaSup + "area " + diametroVarSup);
    console.log("Datos ingresados=> ", b, h, Fc, Fy, recubrimiento, NoVarillaSup, diametroVarSup, areaVarSup, indiceSup, NoVarillaInf, diametroVarInf, areaVarInf, indiceInf);


    if (b == '' || h == '') {
        console.log("Hay campos vacíos");
        document.getElementById("bh").innerHTML = '<h3 class="text-danger">Debe ingresar base y altura</h3>';
        document.getElementById("datos_cortante").textContent = '(*) Complete los campos vacíos (Base y Altura)';
    }
    else if (b < 200) {
        console.log('NOTA: No puede ser menor a 200mm');
        document.getElementById("datos_cortante").textContent = "(*) NOTA: Tener en cuenta el valor de la base";
        document.getElementById("bh").innerHTML = '<h3 class="text-danger">La base de la viga No puede ser menor a 200mm</h3>';
    }
    else if (h < 0) {
        console.log('NOTA: No puede ser negativo');
        document.getElementById("datos_cortante").textContent = "(*) NOTA: Tener en cuenta el valor de la altura";
        document.getElementById("bh").innerHTML = '<h3 class="text-danger">Los valores no pueden ser negativos</h3>';
    }
    else if (Vu == '') {
        console.log('NOTA: No puede ser vacío');
        document.getElementById("datos_cortante").textContent = "(*) NOTA: Tener en cuenta el valor de Vu";
        document.getElementById("inputVu").innerHTML = '<h3 class="text-danger">El valor no puede estar vacío</h3>';
    }
    else if (Vu < 0) {
        console.log('NOTA: No puede ser negativo');
        document.getElementById("datos_cortante").textContent = "(*) NOTA: Tener en cuenta el valor de Vu";
        document.getElementById("inputVu").innerHTML = '<h3 class="text-danger">El valor no puede ser negativo</h3>';
    } else {

        //Obtener valoRes de una etiqueta html con id
        console.log("Valor de la tabla assumsup" + document.getElementById("asSumSup").innerHTML);

        // b = 250;
        // h = 450;
        // recubrimiento = 40;
        diametroLongSup = diametroVarSup;
        diametroLongInf = diametroVarInf;
        // diametroEstribo = 9.5;
        // Fc = 28;
        // Fy = 420;
        let dSup = distancia(h, recubrimiento, diametroLongSup, diametroEstribo);
        let dInf = distancia(h, recubrimiento, diametroLongInf, diametroEstribo);
        console.log("distancia en sup => " + dSup);
        console.log("distancia en inf => " + dInf);
        let d;
        let diametroLong;
        let nvar_menor = Math.min(NoVarillaSup, NoVarillaInf);
        if (diametroLongSup > diametroLongInf) {
            diametroLong = diametroLongInf;
            d = dInf;
        }
        else {
            diametroLong = diametroLongSup;
            d = dSup;
        }
        document.getElementById("no_menor_varilla").innerHTML = `${nvar_menor}`;
        document.getElementById("diametro_menor_varilla").innerHTML = `${diametroLong}`;

        console.log("diametro => " + diametroLong);
        console.log("distancia d => " + d);

        let separacion_longitudinal = separacionLongitudinal(d, diametroLong);//s
        console.log("separacion_longitudinal => " + separacion_longitudinal);
        document.getElementById('sep_long').innerHTML = `${separacion_longitudinal}mm`;


        let acero_refuerzo_minimo = aceroRefuerzoMinimo(Fc, b, separacion_longitudinal, Fy);//av_min
        console.log("acero_refuerzo_minimo => " + acero_refuerzo_minimo);
        let msgAcero='';

        let cantidad_varillas = 2;
        areaEstribo = 71;
        let acero_suministrado = aceroSuministradoCortante(cantidad_varillas, areaEstribo);//av_suministrado
        console.log("acero_suministrado => " + acero_suministrado);
        
        if (acero_refuerzo_minimo >= acero_suministrado) {
            separacion_longitudinal = 50;
            acero_refuerzo_minimo = aceroRefuerzoMinimo(Fc, b, separacion_longitudinal, Fy);
            console.log("No cumple, entonces acero_refuerzo_minimo => " + acero_refuerzo_minimo);
            acero_suministrado = aceroSuministradoCortante(cantidad_varillas, areaEstribo);//av_suministrado
            console.log("acero_suministrado => " + acero_suministrado);
            msgAcero = `Para este caso <b class="red">no se cumple</b> con el acero de refuerzo mínimo ${acero_refuerzo_minimo.toFixed(2)}mm<sup>2</sup> >= ${acero_suministrado}mm<sup>2</sup>, por lo que se disminuye la separación longitudinal como mínimo hasta 50mm y se volvió a calcular. Preferiblemente ingrese otros valores`;
            if (acero_refuerzo_minimo >= acero_suministrado) {
                console.log("Aun No cumple acero minimo");
            }
            else {
                console.log("Ya cumple acero minimo");
            }
        }else{
            msgAcero = `Para este caso <b class="green">si se cumple</b> con el acero de refuerzo mínimo. ${acero_refuerzo_minimo.toFixed(2)}mm<sup>2</sup> < ${acero_suministrado}mm<sup>2</sup>`;

        }
        document.getElementById('condicion_acero').innerHTML = msgAcero;
        document.getElementById('av_min').innerHTML = `${acero_refuerzo_minimo.toFixed(2)}mm<sup>2</sup>`;



        let resistenciaOVn = resistenciaVigaCortante(acero_suministrado, Fy, d, separacion_longitudinal);
        console.log("resistenciaOVn => " + resistenciaOVn);

        document.getElementById('cortante_fin').innerHTML = `${resistenciaOVn.toFixed(2)}kN`;

        
        // Vu = 81.49;
        if (resistenciaOVn <= Vu) {
            msgResistencia = `Para este caso <b class="red">no se cumple</b> que la resistencia Vn>Vu( ${resistenciaOVn.toFixed(2)}kN <= ${Vu}kN ). Por lo tanto, se disminuye la separación longitudinal como mínimo hasta 50mm y se volvió a calcular. Preferiblemente ingrese otros valores.`;
            
            ///////////////////////Hacer otra funcion mejorrrr//////////////
            separacion_longitudinal = 50;
            acero_refuerzo_minimo = aceroRefuerzoMinimo(Fc, b, separacion_longitudinal, Fy);
            console.log("No cumple, entonces acero_refuerzo_minimo => " + acero_refuerzo_minimo);
            acero_suministrado = aceroSuministradoCortante(cantidad_varillas, areaEstribo);//av_suministrado
            console.log("acero_suministrado => " + acero_suministrado);

            if (acero_refuerzo_minimo >= acero_suministrado) {
                msgAcero = `Para este caso <b class="red">no se cumple</b> con el acero de refuerzo mínimo ${acero_refuerzo_minimo.toFixed(2)}mm<sup>2</sup> >= ${acero_suministrado}mm<sup>2</sup>, por lo que se disminuye la separación longitudinal como mínimo hasta 50mm y se volvió a calcular. Preferiblemente ingrese otros valores`;
                
                separacion_longitudinal = 50;
                acero_refuerzo_minimo = aceroRefuerzoMinimo(Fc, b, separacion_longitudinal, Fy);
                console.log("Para resistencia No cumple, entonces acero_refuerzo_minimo => " + acero_refuerzo_minimo);
                acero_suministrado = aceroSuministradoCortante(cantidad_varillas, areaEstribo);//av_suministrado
                console.log("acero_suministrado => " + acero_suministrado);

                if (acero_refuerzo_minimo >= acero_suministrado) {
                    console.log("Aun No cumple acero minimo");
                }
                else {
                    console.log("Ya cumple acero minimo");
                }
            }
            resistenciaOVn = resistenciaVigaCortante(acero_suministrado, Fy, d, separacion_longitudinal);
            console.log("y la resistenciaOVn => " + resistenciaOVn);
            
            if (resistenciaOVn <= Vu) {
                console.log("Aun No cumple resistencia");
            }
            else {
                console.log("Ya cumple resistencia");
            }

        }else{
            msgResistencia = `Para este caso <b class="green">si se cumple</b> que la resistencia Vn>Vu. ${resistenciaOVn.toFixed(2)}kN > ${Vu}kN`;
        }
        document.getElementById('tabla_resultado_cortante').style.display = 'block';
        document.getElementById('chequeo_acero').style.display = 'block';
        document.getElementById('formulas_cortante').style.display = 'block';

        
        document.getElementById("resultado_cortante").innerHTML = `<h1>Resumen de los valores calculados</h1><table class="peque">
        <thead>
           <tr>
              <th scope="col">Dato</th>
              <th scope="col">Valor</th>
              <th scope="col">Unidades</th>
           </tr>
        </thead>
        <tbody>
           <tr>
              <td>d</td>
              <td>${d.toFixed(2)}</td>
              <td>mm</td>
           </tr>
           <tr>
              <td>Separación longitudinal</td>
              <td>${separacion_longitudinal}</td>
              <td>mm</td>
           </tr>
           <tr>
              <td>Acero de refuerzo mínimo</td>
              <td>${acero_refuerzo_minimo.toFixed(2)}</td>
              <td>mm<sup>2</sup></td>
           </tr>
           <tr>
              <td>Acero suministrado</td>
              <td>${acero_suministrado}</td>
              <td>mm<sup>2</sup></td>
           </tr>
           <tr>
              <td>Cortante Nominal</td>
              <td>${resistenciaOVn.toFixed(2)}</td>
              <td>kN</td>
           </tr>
        </tbody>
     </table>`;
        document.getElementById('condicion_resistencia').innerHTML = msgResistencia;
    }
}


