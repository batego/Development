function showForm() {
document.getElementById('formhome').style.display = "block";
document.getElementById('formbutton').style.display = "none"; 
}

var $ = jQuery; 

solonumerosIngresos();

solonumerosMonto();


$("#fecha_expedicion").datepicker({
   format: 'yyyy-mm-dd',
    autoclose: true
});

$("#fecha_nacimiento").datepicker({
  format: 'yyyy-mm-dd',
    autoclose: true
});


$("#solicitar").prop('disabled', true);

$.ajax({
  type: "POST",
    url: 'https://prometheus.fintra.co:8443/fintracredit/webresources/loans/cities',
    async: false,
    dataType: "json",
    success: function (data) {
      // console.log("Ciudades:", data);
      $.each(data, function (key, registro) {
        $("#citys").append('<option value=' + registro.codigo + '>' + registro.ciudad + '</option>');
      });
  },
  error: function () {
    console.log("No se ha podido obtener la información");
  }
});

mostrarFechas();

$("#monto").change(function () {
  $("#solicitar").prop('disabled', true);
});

$("#identificacion").change(function () {
    $("#solicitar").prop('disabled', true);
});

$('#citys').change(function () {
  $("#afiliado").html("");
  $('#afiliado').append('<option disabled selected></option>');
  var _ciudad = $(this).val();
  var arr = { ciudad: _ciudad };
  $.ajax({
    type: "POST",
      url: 'https://prometheus.fintra.co:8443/fintracredit/webresources/hdc/list_affiliates',
      async: false,
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify(arr),
      success: function (data) {
        // console.log("list_affiliates:", data.data);                        
        $.each(data.data, function (key, registro) {
          $("#afiliado").append('<option value=' + registro.nit_afiliado + '>' + registro.nombre_afiliado + '</option>');
        });
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });
});


$('#tipo_carrera').change(function () {
  var plazos = buildDues();
  // console.log("plazos:", plazos);
  $("#num_cuotas").html("");
  $('#num_cuotas').append('<option disabled selected></option>');
  $.each(plazos, function (indice, data) {
    $("#num_cuotas").append('<option value=' + data + '>' + data + '</option>');
  });
});



/* Evento que valida al salir del input si cliente existe, si existe inabilita el formulario y 
 * muestra msj informativo, en caso de que no, puede siguir llenando el formulario
 */

$('#identificacion').change(function () {
  var _identificacion = $(this).val();
  if (validarSiNumero(_identificacion)) {
     $("#identificacion").removeClass("is-invalid");
    // console.log('entro a la validacion de cedula');
  $.ajax({
    type: "GET",
      url: 'https://prometheus.fintra.co:8443/fintracredit/webresources/loans/validate_customer/' + _identificacion,
      contentType: 'application/json',
      success: function (data) {
        // console.info("existe:", data.escliente);
        //  alert("Cliente:"+ (data.escliente == "true" ? "Eres cliente, vamos al login" : "No es cliente"));
        if (data.escliente != "true") {
          $("#simular").prop('disabled', true);
          $("#citys").prop('disabled', true);
          $("#fecha_pago").prop('disabled', true);
          $("#afiliado").prop('disabled', true);
          $("#tipo_carrera").prop('disabled', true);
          $("#monto").prop('disabled', true);
          $("#num_cuotas").prop('disabled', true);
          $("#tipo_identificacion").prop('disabled', true);
          // $("#identificacion").prop('disabled',true);
          $("#fecha_expedicion").prop('disabled', true);
          $("#fecha_nacimiento").prop('disabled', true);
          $("#primer_apellido").prop('disabled', true);
          $("#primer_nombre").prop('disabled', true);
          $("#email").prop('disabled', true);
          $("#email_confirm").prop('disabled', true);
          $("#telefono").prop('disabled', true);
          $("#ingresos_usuario").prop('disabled', true);
          $("#acceptTerms").prop('disabled', true);
          // $("#identificacion").focus();
          document.getElementById("identificacion").focus();
          //alert("Vemos que eres un cliente Fintra, inicia sesión");
          $('.cliente').modal('show');
        }
        else {
          $("#simular").prop('disabled', false);
          $("#citys").prop('disabled', false);
          $("#fecha_pago").prop('disabled', false);
          $("#afiliado").prop('disabled', false);
          $("#tipo_carrera").prop('disabled', false);
          $("#monto").prop('disabled', false);
          $("#num_cuotas").prop('disabled', false);
          $("#tipo_identificacion").prop('disabled', false);
          // $("#identificacion").prop('disabled',true);
          $("#fecha_expedicion").prop('disabled', false);
          $("#fecha_nacimiento").prop('disabled', false);
          $("#primer_apellido").prop('disabled', false);
          $("#primer_nombre").prop('disabled', false);
          $("#email").prop('disabled', false);
          $("#email_confirm").prop('disabled', false);
          $("#telefono").prop('disabled', false);
          $("#ingresos_usuario").prop('disabled', false);
          $("#acceptTerms").prop('disabled', false);
          document.getElementById("fecha_expedicion").focus();
        }
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });
  }else{
    $("#identificacion").addClass("is-invalid");
  }
});


function buildDues() {
  // alert($("select[id=tipo_carrera]").val());
  var tipo_carera = $("select[id=tipo_carrera]").val();
  var inicial = 0;
  var final = 0;

  if (tipo_carera == 'PREGRADO') {
    inicial = 6;
    final = 8;
  } else if (tipo_carera == 'POSGRADO') {
    inicial = 6;
    final = 18;
  } else if (tipo_carera == 'CONTINUADA') {
    inicial = 4;
    final = 4;
  }
  return buildArrayDues(inicial, final);
}


function buildArrayDues(initial, final) { 
  let arrayDues = [];

  for (var i = initial; i <= final; i++) {
    arrayDues.push(parseInt(i))
  }
  return arrayDues;
}


function mostrarFechas() {
  var fechas = carcularFecha();
  $.each(fechas, function (indice, color) {
    $("#fecha_pago").append('<option value=' + color + '>' + color + '</option>');
  });
}

function carcularFecha(year, mo, day) {

    var date;
    if (year) {
        date = new Date(year, mo, day);
    } else {
        date = new Date();
    }

    var days = date.getDate();
    var fecha = "0099-01-01";
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();



    if (days >= 1 && days <= 2) {

        if (mes === 12) {

            fecha = (anio + 1) + "-" + "01" + "-02";
            opcion0 = new Option(fecha, fecha, "defauldSelected");
            fecha = (anio + 1) + "-" + "01" + "-12";
            opcion1 = new Option(fecha, fecha);
            fecha = (anio + 1) + "-" + "01" + "-17";
            opcion2 = new Option(fecha, fecha);
            // fecha = (anio + 1) + "-" + "01" + "-22";
            // opcion3 = new Option(fecha, fecha);


        } else {

            fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-02";
            opcion0 = new Option(fecha, fecha, "defauldSelected");
            fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-12";
            opcion1 = new Option(fecha, fecha);
            fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-17";
            opcion2 = new Option(fecha, fecha);
            // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
            // opcion3 = new Option(fecha, fecha);


        }

    }

    if (days > 2 && days <= 12) {

        if (mes === 12) {

            fecha = (anio + 1) + "-" + "01" + "-12";
            opcion0 = new Option(fecha, fecha, "defauldSelected");
            fecha = (anio + 1) + "-" + "01" + "-17";
            opcion1 = new Option(fecha, fecha);
            // fecha = (anio + 1) + "-" + "01" + "-22";
            // opcion2 = new Option(fecha, fecha);
            fecha = (anio + 1) + "-" + "02" + "-02";
            opcion2 = new Option(fecha, fecha);


        } else {

            fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-12";
            opcion0 = new Option(fecha, fecha, "defauldSelected");
            fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-17";
            opcion1 = new Option(fecha, fecha);
            // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
            // opcion2 = new Option(fecha, fecha);
            if (mes === 11) {
                fecha = (anio + 1) + "-" + "01" + "-02";
                opcion2 = new Option(fecha, fecha);
            } else {
                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
                opcion2 = new Option(fecha, fecha);
            }

        }
    }

    if (days > 12 && days <= 17) {

        if (mes === 12) {

            fecha = (anio + 1) + "-" + "01" + "-17";
            opcion0 = new Option(fecha, fecha, "defauldSelected");
            // fecha = (anio + 1) + "-" + "01" + "-22";
            // opcion1 = new Option(fecha, fecha);
            fecha = (anio + 1) + "-" + "02" + "-02";
            opcion1 = new Option(fecha, fecha);
            fecha = (anio + 1) + "-" + "02" + "-12";
            opcion2 = new Option(fecha, fecha);


        } else {
            fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-17";
            opcion0 = new Option(fecha, fecha, "defauldSelected");
            // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
            // opcion1 = new Option(fecha, fecha);

            if (mes === 11) {

                fecha = (anio + 1) + "-" + "01" + "-02";
                opcion1 = new Option(fecha, fecha);
                fecha = (anio + 1) + "-" + "01" + "-12";
                opcion2 = new Option(fecha, fecha);

            } else {

                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
                opcion1 = new Option(fecha, fecha);
                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-12";
                opcion2 = new Option(fecha, fecha);
            }
        }

    }

    if (days > 17 && days <= 22) {

        if (mes === 12) {

            // fecha = (anio + 1) + "-" + "01" + "-22";
            // opcion0 = new Option(fecha, fecha, "defauldSelected");
            fecha = (anio + 1) + "-" + "02" + "-02";
            opcion0 = new Option(fecha, fecha);
            fecha = (anio + 1) + "-" + "02" + "-12";
            opcion1 = new Option(fecha, fecha);
            fecha = (anio + 1) + "-" + "02" + "-17";
            opcion2 = new Option(fecha, fecha);


        } else {

            // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
            // opcion0 = new Option(fecha, fecha, "defauldSelected");

            if (mes === 11) {

                fecha = (anio + 1) + "-" + "01" + "-02";
                opcion0 = new Option(fecha, fecha);
                fecha = (anio + 1) + "-" + "01" + "-12";
                opcion1 = new Option(fecha, fecha);
                fecha = (anio + 1) + "-" + "01" + "-17";
                opcion2 = new Option(fecha, fecha);

            } else {

                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
                opcion0 = new Option(fecha, fecha);
                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-12";
                opcion1 = new Option(fecha, fecha);
                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-17";
                opcion2 = new Option(fecha, fecha);
            }
        }

    }


    if (days > 22 && days <= 31) {

        if (mes === 12) {

            fecha = (anio + 1) + "-" + "02" + "-02";
            opcion0 = new Option(fecha, fecha, "defauldSelected");
            fecha = (anio + 1) + "-" + "02" + "-12";
            opcion1 = new Option(fecha, fecha);
            fecha = (anio + 1) + "-" + "02" + "-17";
            opcion2 = new Option(fecha, fecha);
            // fecha = (anio + 1) + "-" + "02" + "-22";
            // opcion3 = new Option(fecha, fecha);


        } else {

            if (mes === 11) {

                fecha = (anio + 1) + "-" + "01" + "-02";
                opcion0 = new Option(fecha, fecha, "defauldSelected");
                fecha = (anio + 1) + "-" + "01" + "-12";
                opcion1 = new Option(fecha, fecha);
                fecha = (anio + 1) + "-" + "01" + "-17";
                opcion2 = new Option(fecha, fecha);
                // fecha = (anio + 1) + "-" + "01" + "-22";
                // opcion3 = new Option(fecha, fecha);


            } else {

                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
                opcion0 = new Option(fecha, fecha, "defauldSelected");
                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-12";
                opcion1 = new Option(fecha, fecha);
                fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-17";
                opcion2 = new Option(fecha, fecha);
                // fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-22";
                // opcion3 = new Option(fecha, fecha);

            }

        }
    }

    return [opcion0.value, opcion1.value, opcion2.value]
}



/*********
* Simular *
**********/
 $("#simular").click(function (event) {
   event.preventDefault();
   var citys = $("#citys").val();
   var fecha_pago = $("#fecha_pago").val();
   var afiliado = $("#afiliado").val();
   var tipo_carrera = $("#tipo_carrera").val();
   var monto = ($("#monto").val()).replace(/,/g, "");
   var num_cuotas = $("#num_cuotas").val();
   var tipo_identificacion = $("#tipo_identificacion").val();
   var identificacion = $("#identificacion").val();
   var fecha_expedicion = $("#fecha_expedicion").val();
   var fecha_nacimiento = $("#fecha_nacimiento").val();
   var primer_apellido = $("#primer_apellido").val();
   var primer_nombre = $("#primer_nombre").val();
   var email = $("#email").val();
   var email_confirm = $("#email_confirm").val();
   var telefono = $("#telefono").val();
   var ingresos_usuario = ($("#ingresos_usuario").val()).replace(/,/g, "");
   var acceptTerms = document.getElementById('acceptTerms');

   let val1 = fecha_nacimiento.split("-");
   let val2 = fecha_expedicion.split("-");
   let ano1 = val1[0];
   let ano2 = val2[0];
   

   if (citys == null || citys.length == 0) {
     $("#citys").addClass("is-invalid");
   } else if (fecha_pago == null || fecha_pago.length == 0) {
     $("#fecha_pago").addClass("is-invalid");
   } else if (afiliado == null || afiliado.length == 0) {
     $("#afiliado").addClass("is-invalid");
   } else if (tipo_carrera === null || tipo_carrera == 0) {
     $("#tipo_carrera").addClass("is-invalid");
   } else if (monto == null || monto.length == 0) {
     $("#monto").addClass("is-invalid");
   } else if (num_cuotas == null || num_cuotas.length == 0) {
     $("#num_cuotas").addClass("is-invalid");
   } else if (tipo_identificacion == null || tipo_identificacion.length == 0) {
     $("#tipo_identificacion").addClass("is-invalid");
   } else if (identificacion == null || isNaN(identificacion) || identificacion.length == 0 || /^\s+$/.test(identificacion)) {
     $("#identificacion").addClass("is-invalid");
   } else if (primer_apellido.length == 0 || /^\s+$/.test(primer_apellido)) {
     $("#primer_apellido").addClass("is-invalid");
   } else if (primer_nombre.length == 0 || /^\s+$/.test(primer_nombre)) {
     $("#primer_nombre").addClass("is-invalid");
   } else if (validateEmail(email)) {
     $("#email").addClass("is-invalid");
   } else if (validateEmail(email)) {
     $("#email_confirm").addClass("is-invalid");
   } else if (telefono.length == 0 || !validarSiNumero(telefono)) {
     $("#telefono").addClass("is-invalid");
   } else if (ingresos_usuario.length == 0) {
     $("#ingresos_usuario").addClass("is-invalid");
   } else if (acceptTerms.checked == false) {
     $("#not_accept_term").show();
   } else if (email != email_confirm) {
     $("#email").addClass("is-invalid");
     $("#email_confirm").addClass("is-invalid");
   } else if ((ano2 < ano1) || ((ano2 - ano1) < 18)) {
     $("#fecha_expedicion").addClass("is-invalid");
   } else {
     $("select").removeClass("is-invalid");
     $("input").removeClass("is-invalid");
     $("#not_accept_term").hide();
     console.log("Form Correct!");

     var arr = {
       monto: monto,
         num_cuotas: num_cuotas,
         fecha_pago: fecha_pago,
         id_convenio: 58,
         und_neg: 31,
         identificacion: identificacion
     };
     $.ajax({
       type: "POST",
         url: 'https://prometheus.fintra.co:8443/fintracredit/webresources/loans/approximate_fee',
         async: false,
         dataType: "json",
         contentType: 'application/json',
         data: JSON.stringify(arr),
         success: function (data) {
           // console.log(data);                            
           document.getElementById("valor_cuota").innerHTML = data.valor_cuota;
           document.getElementById("valor_aval").innerHTML = data.valor_aval;
           $("#solicitar").prop('disabled', false);
           $("#solicitar").removeClass('solicitar--btn');
		   $("#solicitar ").addClass("simular--btn");
           $("#sim").show();
           $('#sim').css('display','flex');
       },
       error: function () {
         console.log("No se ha podido obtener la información");
       }
     });
   }
});


/*********
* Solicitar *
**********/

$("#solicitar").click(function (event) {
  event.preventDefault();
  var citys = $("#citys").val();
  var fecha_pago = $("#fecha_pago").val();
  var afiliado = $("#afiliado").val();
  var tipo_carrera = $("#tipo_carrera").val();
  var monto = ($("#monto").val()).replace(/,/g, "");;
  var num_cuotas = $("#num_cuotas").val();
  var tipo_identificacion = $("#tipo_identificacion").val();
  var identificacion = $("#identificacion").val();
  var fecha_expedicion = $("#fecha_expedicion").val();
  var fecha_nacimiento = $("#fecha_nacimiento").val();
  var primer_apellido = $("#primer_apellido").val();
  var primer_nombre = $("#primer_nombre").val();
  var email = $("#email").val();
  var email_confirm = $("#email_confirm").val();
  var telefono = $("#telefono").val();
  var ingresos_usuario = ($("#ingresos_usuario").val()).replace(/,/g, "");;
  var acceptTerms = document.getElementById('acceptTerms');
  var valor_cuota = $("#valor_cuota").text();
  var valor_aval = $("#valor_aval").text();
  var codigo_asesor = $("#codigo_asesor").val();

  let val1 = fecha_nacimiento.split("-");
  let val2 = fecha_expedicion.split("-");
  let ano1 = val1[0];
  let ano2 = val2[0];

  //Remove Class: $("p").removeClass("myClass yourClass")
    //Add Class: $("#identificacion").addClass("is-invalid");
  // $("input ").addClass("is-valid");
  // $("select ").addClass("is-valid");
  // $("select ").addClass("is-valid");

  if (citys == null || citys.length == 0) {
    $("#citys").addClass("is-invalid");
  } else if (fecha_pago == null || fecha_pago.length == 0) {
    $("#fecha_pago").addClass("is-invalid");
  } else if (afiliado == null || afiliado.length == 0) {
    $("#afiliado").addClass("is-invalid");
  } else if (tipo_carrera === null || tipo_carrera == 0) {
    $("#tipo_carrera").addClass("is-invalid");
  } else if (monto == null || monto.length == 0) {
    $("#monto").addClass("is-invalid");
  } else if (num_cuotas == null || num_cuotas.length == 0) {
    $("#num_cuotas").addClass("is-invalid");
  } else if (tipo_identificacion == null || tipo_identificacion.length == 0) {
    $("#tipo_identificacion").addClass("is-invalid");
  } else if (identificacion == null || isNaN(identificacion) || identificacion.length == 0 || /^\s+$/.test(identificacion)) {
    $("#identificacion").addClass("is-invalid");
  } else if (fecha_expedicion == null || fecha_expedicion.length == 0) {
    $("#fecha_expedicion").addClass("is-invalid");
  } else if (fecha_nacimiento == null || fecha_nacimiento.length == 0) {
    $("#fecha_nacimiento").addClass("is-invalid");
  } else if (primer_apellido.length == 0 || /^\s+$/.test(primer_apellido)) {
    $("#primer_apellido").addClass("is-invalid");
  } else if (primer_nombre.length == 0 || /^\s+$/.test(primer_nombre)) {
    $("#primer_nombre").addClass("is-invalid");
  } else if (validateEmail(email)) {
    $("#email").addClass("is-invalid");
  } else if (validateEmail(email_confirm)) {
    $("#email_confirm").addClass("is-invalid");
  } else if (email != email_confirm) {
    $("#email").addClass("is-invalid");
    $("#email_confirm").addClass("is-invalid");
  } else if (telefono.length == 0 || !validarSiNumero(telefono)) {
    $("#telefono").addClass("is-invalid");
  } else if (ingresos_usuario.length == 0) {
    $("#ingresos_usuario").addClass("is-invalid");
  } else if (acceptTerms.checked == false) {
    $("#not_accept_term").show();
  } else if (email != email_confirm) {
    $("#email").addClass("is-invalid");
    $("#email_confirm").addClass("is-invalid");
  } else if ((calcularEdad("fecha_nacimiento") < 17 )) {
    $("#fecha_nacimiento").addClass("is-invalid");
  } else if ((ano2 < ano1) || ((ano2 - ano1) < 18)) {
    $("#fecha_expedicion").addClass("is-invalid");
  } else {

    $("select").removeClass("is-invalid");
    $("input").removeClass("is-invalid");
    $("#not_accept_term").hide();
    console.log("Form Correct!");

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var fecha_credito = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + " " + "00:00:00";

    var presol = {
      entidad: "EDUCATIVO",
        afiliado: afiliado,
        monto: monto,
        producto: "01",
        num_cuotas: num_cuotas,
        fecha_pago: fecha_pago,
        id_convenio: "58",
        fecha_credito: fecha_credito,
        tipo_identificacion: tipo_identificacion,
        identificacion: identificacion,
        fecha_expedicion: fecha_expedicion,
        primer_nombre: primer_nombre,
        primer_apellido: primer_apellido,
        email: email,
        ingresos_usuario: ingresos_usuario,
        fecha_nacimiento: fecha_nacimiento,
        valor_cuota: valor_cuota,//Falta esto
        valor_aval: valor_aval,//Falta esto
        empresa: "FINTRA",
        telefono: telefono,
        tipo_cliente: "",
        financia_aval: "f",
        und_neg: "31",
        ciudad: citys,
        nit_empresa: "8020220161",
        monto_renovacion: "0",
        politica: "",
        negocio_origen: "",
        tipo_carrera: tipo_carrera
    };
    
    if(codigo_asesor.length > 0){
      presol['asesor'] = codigo_asesor;
    }
    
    $.ajax({
      type: "PUT",
        url: 'https://prometheus.fintra.co:8443/fintracredit/webresources/loans/edu-pre-approved-2',
        async: false,
        headers: {
          'dataType': 'json',
          'contentType': 'application/json',
          'Content-Type': 'application/json',
          'version': '2.0'
      },
      data: JSON.stringify(presol),
        success: function (data) {
          //console.log('Msg:', data.data.msg);
          if(data.data.estado_sol == 'P'){
              //alert(data.data.msg + 'Numero de Solicitud: ' + data.data.numero_solicitud);
              $("#presolicitud")[0].reset();
              $("#solicitar").removeClass('simular--btn');
              $("#solicitar ").addClass("solicitar--btn");
              $("#solicitar").prop('disabled', true);          
              $("#sim").hide();
              window.location.href = "http://edu.fintra.co/approved";
          }else{
              $("#presolicitud")[0].reset();
          	  window.location.href = "http://edu.fintra.co/not-approved";
              
          }
          
      },
      error: function () {
        console.log("No se ha podido obtener la información");
      }
    });
  }
});


/*********
* Utiles *
**********/

function validarSiNumero(numero) { 
  if (/^([0-9])*$/.test(numero)) {
    return true;
  } else {
    return false
  }
}


function validateEmail(_mail) {
  var exp = /\w+@\w+\.+([a-zA-Z]{2,4})$/;
  if (exp.test(_mail)) {
    return false;
  } else {
    return true;
  }
}

function validateFlied(field) {
var valueInput = $(field).val();
var typeInput = $(field).prop('type') == 'select-one';
var nameInput = $(field).attr("name");

if (typeInput) { //tipo Select
  if (valueInput != null && !valueInput.length == 0) {
    $(field).removeClass("is-invalid");
  } else {
    $(field).addClass("is-invalid");
  }
} else if (!typeInput && (nameInput == "email" || nameInput == "email_confirm")) { //Email 
  if (validateEmail(valueInput) || (($("#email").val()) != ($("#email_confirm").val()))) {
    $(field).addClass("is-invalid");
    $("#email").addClass("is-invalid");
  } else {
    $(field).removeClass("is-invalid");
    $("#email").removeClass("is-invalid");
    $("#email_confirm").removeClass("is-invalid");
  }
} else if (!typeInput && (nameInput == "primer_apellido" || nameInput == "primer_nombre")) {
  if (valueInput.length == 0 || /^\s+$/.test(valueInput)) {
    $(field).addClass("is-invalid");
  } else {
    $(field).removeClass("is-invalid");
  }
} else if ((nameInput == "fecha_nacimiento")) {   //Fecha
  // let nac = $("#fecha_nacimiento").val();
  let edadFn = calcularEdad("fecha_nacimiento");
  if (edadFn < 17) {
    $(field).addClass("is-invalid");
  } else {
    $(field).removeClass("is-invalid");
  }
} else if ((nameInput == "fecha_expedicion")) {   //Fecha()
  let nac = $("#fecha_nacimiento").val();
  let exp = $("#fecha_expedicion").val();
  let val1 = nac.split("-");
  let val2 = exp.split("-");
  let ano1 = val1[0];
  let ano2 = val2[0];
  if (nac != "" || nac != null) {
    if (ano2 < ano1) {
      $(field).addClass("is-invalid");
    } else if ((ano2 - ano1) < 18) {
      $(field).addClass("is-invalid");
    } else {
      $(field).removeClass("is-invalid");
    }
  }
}else if ((nameInput == "telefono" || nameInput == "ingresos_usuario" ) ){
  if (valueInput.length == 0 || /^\s+$/.test(valueInput)){
    $(field).addClass("is-invalid");
  } else {
    $(field).removeClass("is-invalid");
  }
}else if ((nameInput == "monto") ){
  if (valueInput.length == 0 || /^\s+$/.test(valueInput)){
    $(field).addClass("is-invalid");
  } else {
    $(field).removeClass("is-invalid");
  }
}
}

function solonumerosMonto() {
  //solo numeros
  $('#monto').keypress(function (e, x) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });
  //Formato de miles
  $('#monto').keyup(function (e) {
    $(this).val($(this).val().replace(/,/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });
}

function solonumerosIngresos() {
  //solo numeros
  $('#ingresos_usuario').keypress(function (e, x) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });
  //Formato de miles
  $('#ingresos_usuario').keyup(function (e) {
    $(this).val($(this).val().replace(/,/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  });
}

function isValidDate(day, month, year) { //ok
  var dteDate;
  month = month - 1;  
  dteDate = new Date(year, month, day);
  
  return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
}

/**
* Funcion para validar una fecha
* Tiene que recibir:
*  La fecha en formato ingles yyyy-mm-dd
* Devuelve:
*  true-Fecha correcta
*  false-Fecha Incorrecta
*/
function validate_fecha(fecha) { 
  var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");

  if (fecha.search(patron) == 0) {
    var values = fecha.split("-");
    if (isValidDate(values[2], values[1], values[0])) {
      return true;
    }
  }
  return false;
}

/**
* Esta función calcula la edad de una persona y los meses
* La fecha la tiene que tener el formato yyyy-mm-dd que es
* metodo que por defecto lo devuelve el <input type="date">
*/
function calcularEdad(campo) {
  var fecha = document.getElementById(campo).value;
  if (validate_fecha(fecha) == true) {
    // Si la fecha es correcta, calculamos la edad
    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];
    var edad = null;

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
      edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
      edad--;
    }
    if (edad > 1900) {
      edad -= 1900;
    }


    return edad;
  }
}
