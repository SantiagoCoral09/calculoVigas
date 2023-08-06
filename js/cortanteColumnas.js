

function calcular_cortante_columna() {
    document.getElementById('formulas_cortante').style.display = 'block';
    document.getElementById('cumple_estribos').innerHTML = '';
    document.getElementById('NOcumple_estribos').innerHTML = '';
    document.getElementById('cumple_estribos2').innerHTML = '';
    document.getElementById('NOcumple_estribos2').innerHTML = '';
    let b = Number(document.getElementById("b").value);
    let h = Number(document.getElementById("h").value);
    let Fc = Number(document.getElementById("fc").value);
    let Fc1 = Number(document.getElementById("fc1").value);
    let Fy = Number(document.getElementById("fy").value);
    let diametroVarLong = Number(document.getElementById("diametro").value);
    let areaBarraLong = Number(document.getElementById("area").value);
    let recubrimiento = Number(document.getElementById("recubrimiento").value);
    let diametroBarraEstribo = Number(document.getElementById("diametro_estribo").value);

    if (b == '' || h == '') {
        console.log("Hay campos vacíos");
        document.getElementById("bh").innerHTML = '<h3 class="text-danger">Debe ingresar base y altura</h3>';
        document.getElementById("base").textContent = '(*) Complete los campos vacios';
    }
    else if (b < 200) {
        console.log('NOTA: No puede ser menor a 200mm');
        document.getElementById("base").textContent = "(*) NOTA: Tener en cuenta el valor de la base";
        document.getElementById("bh").innerHTML = '<h3 id="bh" class="text-danger">La base de la columna No puede ser menor a 200mm</h3>';
    }
    else if (h < 0) {
        console.log('NOTA: No puede ser negativo');
        document.getElementById("base").textContent = "(*) NOTA: Tener en cuenta el valor de la altura";
        document.getElementById("bh").innerHTML = '<h3 id="bh" class="text-danger">Los valores no pueden ser negativos</h3>';
    }
    else if (Fc <= 0 && Fc != '') {
        console.log("Hay campos incorrectos");
        document.getElementById("val_fc").innerHTML = '<h3 class="text-danger">La resistencia a la compresión no puede ser negativa o cero</h3>';
        document.getElementById("base").textContent = '(*) Hay campos incorrectos';
    } else {
        if (Fc == '') {
            Fc = Fc1;
            console.log("Valor de FC: ", Fc);
            document.getElementById("fc").value = Fc;
            // console.log("Hay campos vacíos");
            // document.getElementById("val_fc").innerHTML = '<h3 class="text-danger">Se necesita la resistencia a la compresión</h3>';
            // document.getElementById("base").textContent = '(*) Complete los campos vacios';
        }
        let areaBarraEstribo = 71;
        // let cantidadVarillas = 10;
        let Ac = b * h;
        let Asmin = 0.01 * Ac;
        let cantidadVarillas = cantidadBarras(Asmin, areaBarraLong);
        ///calcular separacion
        let sepA = (Math.min(b, h)) / 4;
        let sepB = 6 * diametroVarLong;
        let sepC = 150;
        let sep = Math.min(sepA, sepB, sepC);
        let separacion = Math.round(sep / 10) * 10;
        document.getElementById('sep_varillas').innerHTML = `${separacion}mm`;
        if (separacion < 50) {
            console.log(`S=${separacion} es menor a 50. Se debe cambiar de barra Long`);
            msgResistencia = `Para este caso <b class="red">no se cumple</b> que la separación S (${separacion}mm) > 50mm. Por lo tanto, se recomienda que ingrese otros valores.`;
            document.getElementById('condicion_separacion').innerHTML = msgResistencia;

            document.getElementById('seguir_proceso').style.display = 'none';

        } else {

            console.log(`S=${separacion} es mayor a 50`);
            msgResistencia = `Para este caso <b class="green">sí se cumple</b> que la separación S (${separacion}mm) > 50mm`;
            document.getElementById('condicion_separacion').innerHTML = msgResistencia;
            document.getElementById('seguir_proceso').style.display = 'block';


            ///area confinada
            let base = b - (recubrimiento * 2) - (diametroBarraEstribo * 2);
            let altura = h - (recubrimiento * 2) - (diametroBarraEstribo * 2);
            let ach = base * altura;
            document.getElementById('a_conf').innerHTML = `${base}mm * ${altura}mm = ${ach}mm<sup>2</sup>`;

            //refuerzo minimo (vertical)
            let ash1 = ((0.3 * separacion * b * Fc) / Fy) * (((b * h) / (base * altura)) - 1);
            let ash2 = ((0.09 * separacion * b * Fc) / Fy);
            let ash = Math.max(ash1, ash2);
            let noEstribos = Math.max(2, Math.round(ash / areaBarraEstribo));

            document.getElementById('ref_min').innerHTML = `(${ash1.toFixed(2)}mm<sup>2</sup>; ${ash2.toFixed(2)}mm<sup>2</sup>) = ${ash.toFixed(2)}mm<sup>2</sup>`;
            document.getElementById('noEstribs').innerHTML = `${noEstribos} und`;

            let numeroEstribos;
            if (cantidadVarillas == 4 || cantidadVarillas == 6) {
                numeroEstribos = 2;
            } else if (cantidadVarillas == 8) {
                numeroEstribos = 3;
            } else {
                numeroEstribos = 4;
            }

            if (noEstribos > numeroEstribos) {
                ///se debe disminuir la separacion  hasta 50mm
                document.getElementById('reducir_separacion').style.display = 'block';
                document.getElementById('NOcumple_estribos').innerHTML = `<b class="text-warning">El número de estribos debe ser suficiente. Se debe disminuir la separación hasta 50mm</b>`;
                separacion = 50;
                //refuerzo minimo (vertical)
                ash1 = ((0.3 * separacion * b * Fc) / Fy) * (((b * h) / (base * altura)) - 1);
                ash2 = ((0.09 * separacion * b * Fc) / Fy);
                ash = Math.max(ash1, ash2);
                noEstribos = Math.max(2, Math.round(ash / areaBarraEstribo));
                document.getElementById('ashReduc').innerHTML = `(${ash1.toFixed(2)}mm<sup>2</sup>; ${ash2.toFixed(2)}mm<sup>2</sup>) = ${ash.toFixed(2)}mm<sup>2</sup>`;
                document.getElementById('NoEstribsRed').innerHTML = `${noEstribos} und`;

                if (noEstribos > numeroEstribos) {
                    //se debe cambiar la barra longitudinal
                    document.getElementById('NoEstribsRed').innerHTML = `${noEstribos} und`;
                    document.getElementById('NOcumple_estribos2').innerHTML = `<b class="text-warning">Se recomienda cambiar de barra longitudinal supuesta para tener un número de estribos suficiente.</b>
                `;

                } else {
                    //se muestra resultados
                    document.getElementById('cumple_estribos2').innerHTML = `<b class="green">El Número de estribos es suficiente</b>`;

                }
            } else {
                //se muestra resultados
                document.getElementById('reducir_separacion').style.display = 'none';
                document.getElementById('cumple_estribos').innerHTML = `<b class="green">El Número de estribos es suficiente</b>`;
            }
        }
    }
}