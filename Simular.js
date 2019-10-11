

                // if (citys == null || citys.length == 0 || fecha_pago == null ||  fecha_pago.length == 0 ||
                //     afiliado == null || afiliado.length == 0 || tipo_carrera === null || tipo_carrera == 0 ||
                //     monto == null || monto.length == 0 || isNaN(monto) || num_cuotas == null || num_cuotas.length == 0 || 
                //     tipo_identificacion == null || tipo_identificacion.length == 0 || identificacion == null || isNaN(identificacion) ||
                //     identificacion.length == 0 || /^\s+$/.test(identificacion) || primer_apellido.length == 0 || /^\s+$/.test(primer_apellido) || 
                //     primer_nombre.length == 0 || /^\s+$/.test(primer_nombre) || validateEmail(email) || validateEmail(email_confirm) ||
                //     telefono.length == 0 || !validarSiNumero(telefono) || ingresos_usuario.length == 0 || 
                //     !validarSiNumero(ingresos_usuario) || acceptTerms.checked == false || email != email_confirm) {
                //     alert("Alguno de los campos no cumple con nuestras politicas");
                // } else {
                //     var arr = {
                //         monto: monto,
                //         num_cuotas: num_cuotas,
                //         fecha_pago: fecha_pago,
                //         id_convenio: 58,
                //         und_neg: 31,
                //         identificacion: identificacion
                //     };
                //     $.ajax({
                //         type: "POST",
                //         url: 'http://piloto.fintra.co:8084/fintracredit/webresources/loans/approximate_fee',
                //         async: false,
                //         dataType: "json",
                //         contentType: 'application/json',
                //         data: JSON.stringify(arr),
                //         success: function (data) {
                //             // console.log(data);                            
                //             document.getElementById("valor_cuota").innerHTML = data.valor_cuota;
                //             document.getElementById("valor_aval").innerHTML = data.valor_aval;
                //             $("#solicitar").prop('disabled', false);
                //             $("#sim").show();
                //         },
                //         error: function () {
                //             console.log("No se ha podido obtener la información");
                //         }
                //     });

                // }