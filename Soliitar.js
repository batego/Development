 // if (citys == null || citys.length == 0 || fecha_pago == null || fecha_pago.length == 0 ||
                //     afiliado == null || afiliado.length == 0 || tipo_carrera === null || tipo_carrera == 0 ||
                //     monto == null || monto.length == 0 || isNaN(monto) || num_cuotas == null || num_cuotas.length == 0 ||
                //     tipo_identificacion == null || tipo_identificacion.length == 0 || identificacion == null || isNaN(identificacion) ||
                //     identificacion.length == 0 || /^\s+$/.test(identificacion) || primer_apellido.length == 0 || /^\s+$/.test(primer_apellido) ||
                //     primer_nombre.length == 0 || /^\s+$/.test(primer_nombre) || validateEmail(email) || validateEmail(email_confirm) ||
                //     telefono.length == 0 || !validarSiNumero(telefono) || ingresos_usuario.length == 0 ||
                //     !validarSiNumero(ingresos_usuario) || acceptTerms.checked == false || email != email_confirm) {
                //     alert("Alguno de los campos no cumple con nuestras politicas");
                // } else {

                //     var d = new Date();
                //     var month = d.getMonth() + 1;
                //     var day = d.getDate();
                //     var fecha_credito = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + " " + "00:00:00";

                //     var presol = {
                //         entidad: "EDUCATIVO",
                //         afiliado: afiliado,
                //         monto: monto,
                //         producto: "01",
                //         num_cuotas: num_cuotas,
                //         fecha_pago: fecha_pago,
                //         id_convenio: "58",
                //         fecha_credito: fecha_credito,
                //         tipo_identificacion: tipo_identificacion,
                //         identificacion: identificacion,
                //         fecha_expedicion: fecha_expedicion,
                //         primer_nombre: primer_nombre,
                //         primer_apellido: primer_apellido,
                //         email: email,
                //         ingresos_usuario: ingresos_usuario,
                //         fecha_nacimiento: fecha_nacimiento,
                //         valor_cuota: valor_cuota,//Falta esto
                //         valor_aval: valor_aval,//Falta esto
                //         empresa: "FINTRA",
                //         telefono: telefono,
                //         tipo_cliente: "",
                //         financia_aval: "f",
                //         und_neg: "31",
                //         ciudad: citys,
                //         nit_empresa: "8020220161",
                //         monto_renovacion: "0",
                //         politica: "",
                //         negocio_origen: "",
                //         tipo_carrera: tipo_carrera//,
                //         //asesor: "antojsh"
                //     };
                //     $.ajax({
                //         type: "PUT",
                //         url: 'http://piloto.fintra.co:8084/fintracredit/webresources/loans/edu-pre-approved-2',
                //         async: false,
                //         headers: {
                //             'dataType': 'json',
                //             'contentType': 'application/json',
                //             'Content-Type': 'application/json',
                //             'version': '2.0'
                //         },
                //         data: JSON.stringify(presol),
                //         success: function (data) {
                //             console.log('Msg:', data.data.msg);
                //             alert(data.data.msg + 'Numero de Slicitud: ' + data.data.numero_solicitud);
                //             $("#presolicitud")[0].reset();
                //             $("#sim").hide();

                //         },
                //         error: function () {
                //             console.log("No se ha podido obtener la información");
                //         }
                //     });

                // }