
  var titulo_des_graf=" ";
  var inicio = 0;
  var estados = [];
  var lista_insumos = [];
  var insumos_general = [];
  var insumos_cobertura = [];
  var insumo_cober_clasifica = [];
  var insumo_cober_clasifica_tipo = [];
  var cobertura_notas = false;

  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = getParameterByName("indicador");
  var obj = getParameterByName("objetivo");
  var objetivo = getParameterByName("obj");
  var meta = getParameterByName("meta");
  var codigoDg = getParameterByName("codigo");
  var PCveInd = vars;
  var Codigo_ind = '';
  var Descrip_ind = '';
  var tituloObjetivo = '';
  var titulo ;
  var pie ;
  var Algoritmo_ft = '';

  var data_local = '';
  var tabulado;
  var tipoTabulado;
  var armaTabulado;
  var clasif;

function listadoTablas(PCveInd){
  $('#loader').delay(2000).fadeOut("slow");
  $.ajax({
    type: 'POST',
    url: PathAPI + "Valores/PorClave",
    data: {'PCveInd': PCveInd,'PAnoIni':'0', 'PAnoFin':'0', 'POrden':'DESC', 'PIdioma':'ES'},
    success: function( data, textStatus, jqxhr ) {

      tipoTabulado = data.TipoCua_atr;

      cason = data.ClaveAgrupaClas_atr;

      tabulado = get_tabulado(tipoTabulado,data.Series[0]);

      //tabulado = tablaCoS(data);
      Codigo_ind  = data.Codigo_ind;
      Descrip_ind = data.Descrip_ind;
      //colorObjetivo(obj);

      // separamos para ver que funcion es la que debemos usar
      if(data.Series[0].Coberturas[0].ValorDato != 0){
        valorDato(data);
        valorDatoInsumos(data);
      }else{
        if(PCveInd == 101)
        {
          //alert('es el eindicador especial');
          cobertura_101(data);
          data_local = data;
          $('#row_filtros_serie_101').show();
        }else{
         //console.log(data);
          cobertura(data);
        }

          estados = arma_tabla(0);
          coberturaInsumos(data);
          //console.log(estados);
          //poner_filtros();
          //poner_filtros_serie();
          $('#row_filtros_serie').show();
          cobertura_notas = true;

      }
      var codigo_indicador = data.Codigo_ind;
      var descripcion = data.Descrip_ind;

      $('.Codigo_ind').html(Codigo_ind);
      $('.Descrip_ind').html(Descrip_ind);

      titulos(PCveInd);
      $('#tabla_nacional').hide();

        console.log(tabulado);

        armaTabulado = armaTabulado + tabulado;
      // $('#loader').delay(2000).fadeOut("slow");
    },
    error: function() {
            //alert('Error occured');
        },
    async:false
  });
  $('.tabla_completa').html(armaTabulado);
}


  $.ajax({
    type: 'POST',
    url: PathAPI + "AtrIndicador/PorDesglose",
    data: {"PCveInd": PCveInd, "POpcion": "Cl", "PIdioma": "ES"},
    success: function( data, textStatus, jqxhr ) {
    //data.Series[1] = data1.Series[0];
      clasif = data.AgrupaClas.TotalNivAgrupa_cla;
      console.log('pspspsps');
      console.log(clasif);
    },
    error: function() {
            //alert('Error occured');
        },
    async:false
  });

  $.ajax({
    type: 'POST',
    // url: "https://operativos.inegi.org.mx/datos/api/Tematica/PorClave",
    url: PathAPI + "Tematica/PorClave",
    data: {'PClave':objetivo , 'PIdioma':'ES'},
    success: function( data, textStatus, jqxhr ) {

      nombreObj = data.Abrevia_des;

      for (var i = 0; i < data.Meta.length; i++) {
        if( data.Meta[i].Clave_arb ==  meta){
          Codigo_meta   = data.Meta[i].Codigo_des;
          Descrip_meta = data.Meta[i].Descrip_des;
        }
      }

      Codigo_ind 	=	data.Codigo_ind;

      colorObjetivo(obj);
      iconoObjetivo(obj);

      $('.tituloObjetivo').html(obj+' '+nombreObj);
      $('.Codigo_meta').html(Codigo_meta);
      $('.Descrip_meta').html(Descrip_meta);

    },
    async:true
  });

if(PCveInd == 118){
  $.ajax({
    type: 'POST',
    url: PathAPI + "Valores/PorCobCla",
    data: {"PCveInd":"118","PAnoIni":"0","PAnoFin":"0","PCveSer":"594","PCveCob":"99","PCveAgrupaCla": "0","POrden":"DESC", "PIdioma":"ES"},
    success: function( data, textStatus, jqxhr ) {

      $.ajax({
        type: 'POST',
        url: PathAPI + "Valores/PorCobCla",
        data: {"PCveInd":"118","PAnoIni":"0","PAnoFin":"0","PCveSer":"595","PCveCob":"99","PCveAgrupaCla": "0","POrden":"DESC", "PIdioma":"ES"},
        success: function( data1, textStatus, jqxhr ) {
          data.Series[1] = data1.Series[0];
        },
        error: function() {
                //alert('Error occured');
            },
        async:false
      });

      $.ajax({
        type: 'POST',
        url: PathAPI + "Valores/PorCobCla",
        data: {"PCveInd":"118","PAnoIni":"0","PAnoFin":"0","PCveSer":"596","PCveCob":"99","PCveAgrupaCla": "0","POrden":"DESC", "PIdioma":"ES"},
        success: function( data2, textStatus, jqxhr ) {
          data.Series[2] = data2.Series[0];
        },
        error: function() {
                //alert('Error occured');
            },
        async:false
      });

      Codigo_ind  = data.Codigo_ind;
      Descrip_ind = data.Descrip_ind;
      colorObjetivo(obj);

      // separamos para ver que funcion es la que debemos usar
      if(data.Series[0].Coberturas[0].ValorDato != 0){
        valorDato(data);
        valorDatoInsumos(data);
      }else{

         //console.log(data);
          cobertura(data);

          estados = arma_tabla(0);
          coberturaInsumos(data);
          //console.log(estados);
          poner_filtros();
          poner_filtros_serie();
          $('#row_filtros_serie').show();
          cobertura_notas = true;

      }
      var codigo_indicador = data.Codigo_ind;
      var descripcion = data.Descrip_ind;

      $('.Codigo_ind').html(Codigo_ind);
      $('.Descrip_ind').html(Descrip_ind);

      titulos(PCveInd);
      $('#tabla_nacional').hide();


      tipoTabulado = data.TipoCua_atr;
      cason = data.ClaveAgrupaClas_atr;

      switch(tipoTabulado){
        case 'CoS':
          tabulado = tablaCoS(data);
        break;
        case 'CoCl':
          if(clasif > 1){
            tabulado = CoClanidada(data);
          }else{
            tabulado = tablaCoCl(data);
          }
        break;
        case 'ACl':
        if(clasif > 1){
          tabulado = tablaACl(data);
        }else{
          tabulado = AClanidada(data);
        }
        break;
        case 'AS':
          tabulado = tablaAS(data);
          //alert('si entra');
        break;
        case 'ClA':
          tabulado = tablaClA(data);
        break;
      }

      $('#loader').delay(2000).fadeOut("slow");
    },
    error: function() {
            //alert('Error occured');
        },
    async:false
  });
}
else
{

  $.ajax({
    type: 'POST',
    url: PathAPI + "Valores/PorClave",
    data: {'PCveInd': PCveInd,'PAnoIni':'0', 'PAnoFin':'0', 'POrden':'DESC', 'PIdioma':'ES'},
    success: function( data, textStatus, jqxhr ) {

      tipoTabulado = data.TipoCua_atr;

      cason = data.ClaveAgrupaClas_atr;

      switch(tipoTabulado){
        case 'CoS':
          tabulado = tablaCoS(data);
        break;
        case 'CoCl':
          if(clasif > 1){
            tabulado = CoClanidada(data);
          }else{
            tabulado = tablaCoCl(data);
          }
        break;
        case 'ACl':
          if(clasif > 1){
            tabulado = AClanidada(data);
          }else{
            tabulado = tablaACl(data);
          }
        break;
        case 'AS':
          tabulado = tablaAS(data);
          //alert('si entra');
        break;
        case 'ClA':
          tabulado = tablaClA(data);
        break;
      }

      //tabulado = tablaCoS(data);
      Codigo_ind  = data.Codigo_ind;
      Descrip_ind = data.Descrip_ind;
      colorObjetivo(obj);

      // separamos para ver que funcion es la que debemos usar
      if(data.Series[0].Coberturas[0].ValorDato != 0){
        valorDato(data);
        valorDatoInsumos(data);
      }else{
        if(PCveInd == 101)
        {
          //alert('es el eindicador especial');
          cobertura_101(data);
          data_local = data;
          $('#row_filtros_serie_101').show();
        }else{
         //console.log(data);
          cobertura(data);
        }

          estados = arma_tabla(0);
          coberturaInsumos(data);
          //console.log(estados);
          poner_filtros();
          poner_filtros_serie();
          $('#row_filtros_serie').show();
          cobertura_notas = true;

      }
      var codigo_indicador = data.Codigo_ind;
      var descripcion = data.Descrip_ind;

      $('.Codigo_ind').html(Codigo_ind);
      $('.Descrip_ind').html(Descrip_ind);
      // if(PCveInd == 101 || PCveInd == 2){
      //   $('#link-datos-panel').hide();
      // }
      titulos(PCveInd);
      $('#tabla_nacional').hide();
      // if(PCveInd == 236 || PCveInd == 311 || PCveInd == 312 || PCveInd == 48){
      //   $('#tabla_nacional').show();
      //   $('#mapas_hide').remove();
      //   $('#botonera_nacional').remove();
      // }
      // if(PCveInd ==  333)
      // {
      //   $('#map').hide();
      //   $('#conten_maps').append('<div id="map333"></div>');
      //   mapa_333();
      // }

      // if(PCveInd ==  333 /*|| PCveInd == 276*/){
      //   $('#map').remove();
      //   $('#footmap').remove();
      //   $('#grafs').remove();
      //   $('#indicador-grafica').remove();
      //
      //   $('.ocultar').hide();
      //   //datos a mostrar
      //   $('#serie-panel2').hide();
      //   $('#indicador-panel').show();
      //
      // }

      $('#loader').delay(2000).fadeOut("slow");
    },
    error: function() {
            //alert('Error occured');
        },
    async:false
  });
}

function get_tabulado(tTabulado, serie){
    var t;
    switch(tTabulado){
      case 'CoS':
        t = tablaCoS(serie);
      break;
      case 'CoCl':
        if(clasif > 1){
          t = CoClanidada(serie);
        }else{
          t = tablaCoCl(serie);
        }
      break;
      case 'ACl':
        if(clasif > 1){
          t = AClanidada(serie);
        }else{
          t = tablaACl(serie);
        }
      break;
      case 'AS':
        t = tablaAS(serie);
      break;
      case 'ClA':
        t = tablaClA(serie);
      break;
    }
    return t;
}



  $(document).ready(function()
  {
    $('.tabla_completa').html(tabulado);

    var nColumnas = $(".tablaArmada tr:last td").length;
    var nFilas = $(".tabla_completa tr").length;

    var arre = [];
    for (var i = 0; i < nColumnas - 1; i++) {
      arre.push(i);
    }

    if(nColumnas > 12){
      $('.tabla_completa').css('height', '700px');
      $('.tablaArmada').DataTable( {
             scrollY:        "510px",
             scrollX:        true,
             scrollCollapse: true,
             "autoWidth":    false,
             paging:         false,
             responsive:      false,
             searching: false,
             aoColumnDefs: [
               { 'bSortable': false,
                 'aTargets': arre }
             ],
             fixedColumns:   {
                 leftColumns: 1
             }
         } );

      $('.tablaArmada thead tr th:first').addClass('empuja_a_la_izquierda');
    }else{
      var alto =  (nFilas+2) * 47;
      $('.tabla_completa').css('height', alto + 'px');
    }

    titulos(PCveInd);
    //llamada cuando cambia el select de los filtros estatales
    $('#filtros_es').on('change',function(){
      $('#loader').show();
      estados = arma_tabla($(this).val());
      actualiza_grafica();
      $('#'+anio_mas_actual).trigger( "click" );
      $('#loader').delay(2000).fadeOut("slow");
    });

    //llamada cuando cambia el select de los filtros nacionales
    $('#filtros_na').on('change',function(){
      $('#loader').show();
      estados = arma_tabla($(this).val());

      actualiza_grafica_na();

      $('#loader').delay(2000).fadeOut("slow");
    });

    $('#insumo_change').on('change',function(){
      put_tabla_insumo($(this).val());
    });

    $('#insumo_change_cob').on('change',function(){
      put_filtros_insumo_cob($(this).val());
      $('#insumos_cont').html('');
      $('#insumos_contDat').html('');

      if(PCveInd == 101){
        put_filtros_insumo_cob1($(this).val());
      }
    });

    $('#este').on('change', function(){
      if(PCveInd == 101){
        put_tabla_insumo_cob_insumo($(this).val());
      }else{
        put_tabla_insumo_cob($(this).val());
      }

    });
    // $('#este2').on('change', function(){
    //   put_tabla_insumo_cob1($(this).val());
    // });

    $('#filtros_serie').on('change', function(){
      //console.log('-------------------- validemos ---------------');
      //console.log(arreglo_datos);
      var filtro = $(this).val();
      var tipo_101 =  $('#filtros_serie_101').val();
      if(PCveInd == 101){
        put_tabla_serie_cob_101(filtro,tipo_101);
        poner_filtros();
      }else{
        put_tabla_serie_cob($(this).val());
        poner_filtros();
      }

    });

    $('#filtros_serie_101').on('change', function(){
      var filtro2 = $('#filtros_serie').val();
      var tipo_1011 =  $('#filtros_serie_101').val();
      if(PCveInd == 101){
        put_tabla_serie_cob_101(filtro2,tipo_1011);
        poner_filtros();
      }else{
        put_tabla_serie_cob($(this).val());
        poner_filtros();
      }
    });

    $('#este2').on('change', function(){
      //console.log('------------------------ analisis de datos que se enstan mostrando --------------');
      cobertura_101_insumos(data_local,$('#insumo_change_cob').val());
    });

  });//fin document ready

  function arma_tabla_insumo(arreglo_datos,num_cobertura){
    var cobertura_tabla = [];

    cobertura_tabla.push(anios_cob);
    for (var i = 0; i < arreglo_datos[num_cobertura].length; i++) {
        cobertura_tabla.push(arreglo_datos[num_cobertura][i]);
    }
    return cobertura_tabla;
  }


 function put_tabla_serie_cob_101(filtro,tipo_101){

    var datos_doble = '<div class="cuadro_titulo"> ' + titulo +
                      '</div>' +
                      '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_1">'+
                      '<table class="bordered" id="miTabla" class="miTabla">';
    //console.log('-------------------- validemos ---------------');

    if(tipo_101 == 0){
      var tabla_armada = arma_tabla_insumo(arreglo_datos,filtro);
    }else if(tipo_101 == 1){
      var tabla_armada = arma_tabla_insumo(arreglo_datos_hombre,filtro);
    }else if(tipo_101 == 2){
      var tabla_armada = arma_tabla_insumo(arreglo_datos_mujeres,filtro);
    }

    console.log(tabla_armada);

      for (var i = 0; i < tabla_armada.length; i++) {
               if(i == 0){
                datos_doble +=  '<thead><tr>';
              }
               else if(i == 1){
                 datos_doble +=  '<tbody><tr>';
               }
               else {
                  datos_doble +=  '<tr>';
               }

               for (var j = tabla_armada[0].length -1 ; j > 0 ; j--) {
                if(i == 0 && j == tabla_armada[0].length -1){
                  datos_doble +=  '  <th  class="headcol">'+ tabla_armada[i][0] +'</th><th>'+ tabla_armada[i][j] .split('-')[0]+'</th>';
                }
                else if( i == 0 && j == tabla_armada[0].length -1 ){
                  datos_doble += '<th class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</th>';
                }
                else if( i == 0 ){
                  datos_doble += '<th>'+ tabla_armada[i][j].split('-')[0] +'</th>';
                }
                else if(j == tabla_armada[0].length -1 ) {
                  var varia = '<td class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] +'</td>';
                  datos_doble += varia;
                }
                else if(j == tabla_armada[0].length -2){
                    datos_doble +=  '  <td class="laque">'+ tabla_armada[i][j] +'</td>';
                }
                else{
                  datos_doble +=  '  <td>'+ tabla_armada[i][j] +'</td>';
                }
               }

               if(i == 0){
                 datos_doble +=  '</tr></thead>';
               }else{
                 datos_doble +=  '</tr>';
               }
             }

            datos_doble +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
            ' <div class="pie_cuadro2">'+ pie +
             '</div></div>';

    //sin pie y cabezera de la pagina
    $('#serie_panel_tablas').html(datos_doble);
    var arre = [];
    for (var i = 0; i < tabla_armada.length[0] - 1; i++) {
      arre.push(i)
    }

    if(arre.length > 17){
      $('#miTabla').DataTable( {
                    scrollY:        "600px",
                    scrollX:        true,
                    scrollCollapse: true,
                    paging:         false,
                    aoColumnDefs: [
                      { 'bSortable': false,
                        'aTargets': arre }
                    ],
                    fixedColumns:   {
                        leftColumns: 1
                    }
                } );
    }
  }

 function put_tabla_serie_cob(filtro){
    var datos_doble = '<div class="cuadro_titulo"> ' + titulo +
                      '</div>' +
                      '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_1">'+
                      '<table class="bordered" id="miTabla" class="miTabla">';
    //console.log('-------------------- validemos ---------------');
    //console.log(arreglo_datos);
    var tabla_armada = arma_tabla_insumo(arreglo_datos,filtro);

      for (var i = 0; i < tabla_armada.length; i++) {
               if(i == 0){
                datos_doble +=  '<thead><tr>';
              }
               else if(i == 1){
                 datos_doble +=  '<tbody><tr>';
               }
               else {
                  datos_doble +=  '<tr>';
               }

               for (var j = tabla_armada[0].length -1 ; j > 0 ; j--) {
                if(i == 0 && j == tabla_armada[0].length -1){
                  //datos_doble +=  '  <th  class="headcol">'+ tabla_armada[i][0] +'</th><th>'+ tabla_armada[i][j] .split('-')[0]+'</th>';
                  datos_doble +=  '  <td  class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] .split('-')[0]+'</td>';
                }
                else if( i == 0 && j == tabla_armada[0].length -1 ){
                  //datos_doble += '<th class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</th>';
                  datos_doble += '<td class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</td>';
                }
                else if( i == 0 ){
                  //datos_doble += '<th>'+ tabla_armada[i][j].split('-')[0] +'</th>';
                  datos_doble += '<td>'+ tabla_armada[i][j].split('-')[0] +'</td>';
                }
                else if(j == tabla_armada[0].length -1 ) {
                  var varia = '<td class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] +'</td>';
                  datos_doble += varia;
                }
                else if(j == tabla_armada[0].length -2){
                    datos_doble +=  '  <td class="laque">'+ tabla_armada[i][j] +'</td>';
                }
                else{
                  datos_doble +=  '  <td>'+ tabla_armada[i][j]  +'</td>';
                }
               }

               if(i == 0){
                 datos_doble +=  '</tr></thead>';
               }else{
                 datos_doble +=  '</tr>';
               }
             }

            datos_doble +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
            ' <div class="pie_cuadro2">'+ pie +
             '</div></div>';

    //sin pie y cabezera de la pagina
    $('#serie_panel_tablas').html(datos_doble);
    var arre = [];
    for (var i = 0; i < tabla_armada.length[0] - 1; i++) {
      arre.push(i)
    }

    if(arre.length > 17){
      $('#miTabla').DataTable( {
                    scrollY:        "600px",
                    scrollX:        true,
                    scrollCollapse: true,
                    paging:         false,
                    aoColumnDefs: [
                      { 'bSortable': false,
                        'aTargets': arre }
                    ],
                    fixedColumns:   {
                        leftColumns: 1
                    }
                } );
    }
  }

  function put_tabla_insumo_cob_insumo(filtro){
    generar_titulos_cob();

    if($('#este2').val() == 0){
      var tabla_armada = arma_tabla_insumo(arreglo_datos_insumos,filtro);
    }else if($('#este2').val() == 1){
      var tabla_armada = arma_tabla_insumo(arreglo_datos_hombre_insumos,filtro);
    }else{
      var tabla_armada = arma_tabla_insumo(arreglo_datos_mujeres_insumos,filtro);
    }

    var datos_doble = '<div class="cuadro_titulo"> ' + titulo_insumo +
                      '</div>' +
                      '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_1">'+
                      '<table class="bordered" id="miTabla" class="miTabla">';

                      var datos_dobleDat = '<div class="cuadro_titulo"> ' + titulo +
                                        '</div>' +
                                        '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_1">'+
                                        '<table class="bordered" id="miTablaDat" class="miTablaDat">';


    //onsole.log('--------------- tabla armada ----------');
    //console.log(tabla_armada);



      for (var i = 0; i < tabla_armada.length; i++) {
               if(i == 0){
                datos_doble +=  '<thead><tr>';
                datos_dobleDat +=  '<thead><tr>';
              }
               else if(i == 1){
                 datos_doble +=  '<tbody><tr>';
                 datos_dobleDat +=  '<tbody><tr>';
               }
               else {
                  datos_doble +=  '<tr>';
                  datos_dobleDat +=  '<tr>';
               }

               for (var j = tabla_armada[0].length -1 ; j > 0 ; j--) {
                if(i == 0 && j == tabla_armada[0].length -1){
                  //datos_doble +=  '  <th  class="headcol">'+ tabla_armada[i][0] +'</th><th>'+ tabla_armada[i][j] .split('-')[0]+'</th>';
                  datos_doble +=  '  <td  class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] .split('-')[0]+'</td>';
                  datos_dobleDat +=  '  <td  class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] .split('-')[0]+'</td>';
                }
                else if( i == 0 && j == tabla_armada[0].length -1 ){
                  //datos_doble += '<th class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</th>';
                  datos_doble += '<td class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</td>';
                  datos_dobleDat += '<td class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</td>';
                }
                else if( i == 0 ){
                  //datos_doble += '<th>'+ tabla_armada[i][j].split('-')[0] +'</th>';
                  datos_doble += '<td>'+ tabla_armada[i][j].split('-')[0] +'</td>';
                  datos_dobleDat += '<td>'+ tabla_armada[i][j].split('-')[0] +'</td>';
                }
                else if(j == tabla_armada[0].length -1 ) {
                  var varia = '<td class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] +'</td>';
                  datos_doble += varia;
                  datos_dobleDat += varia;
                }
                else if(j == tabla_armada[0].length -2){
                    datos_doble +=  '  <td class="laque">'+ tabla_armada[i][j] +'</td>';
                    datos_dobleDat +=  '  <td class="laque">'+ tabla_armada[i][j] +'</td>';
                }
                else{
                  datos_doble +=  '  <td>'+ tabla_armada[i][j] +'</td>';
                  datos_dobleDat +=  '  <td>'+ tabla_armada[i][j] +'</td>';
                }
               }



               if(i == 0){
                 datos_doble +=  '</tr></thead>';
                 datos_dobleDat +=  '</tr></thead>';
               }else{
                 datos_doble +=  '</tr>';
                 datos_dobleDat +=  '</tr>';
               }
             }



            datos_doble +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
            ' <div class="pie_cuadro2">'+ pie_insumo +
             '</div></div>';

             datos_dobleDat +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
             ' <div class="pie_cuadro2">'+ pie +
              '</div></div>';

    //sin pie y cabezera de la pagina
    $('#insumos_cont').html(datos_doble);
    $('#insumos_contDat').html(datos_dobleDat);
    var arre = [];
    for (var i = 0; i < tabla_armada.length[0] - 1; i++) {
      arre.push(i)
    }

    if(arre.length > 17){
      $('#miTabla').DataTable( {
                    scrollY:        "600px",
                    scrollX:        true,
                    scrollCollapse: true,
                    paging:         false,
                    aoColumnDefs: [
                      { 'bSortable': false,
                        'aTargets': arre }
                    ],
                    fixedColumns:   {
                        leftColumns: 1
                    }
                } );
    }

    //agregamos titulo del insumo seleccionado
    $('#titulo_cabezeras').html(lista_insumos[$('#insumo_change_cob').val()]);
    $('#descrip_uni').html('');
  }


  function put_tabla_insumo_cob(filtro){
    generar_titulos_cob();
    var datos_doble = '<div class="cuadro_titulo"> ' + titulo_insumo +
                      '</div>' +
                      '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_1">'+
                      '<table class="bordered" id="miTabla" class="miTabla">';

                      var datos_dobleDat = '<div class="cuadro_titulo"> ' + titulo +
                                        '</div>' +
                                        '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_1">'+
                                        '<table class="bordered" id="miTablaDat" class="miTablaDat">';
    //console.log('--------------- insu cobertura ----------');
    //console.log(insumos_cobertura[$('#insumo_change_cob').val()]);
    //console.log(insumos_cobertura[$('#insumo_change_cob').val()][filtro]);
    var tabla_armada = arma_tabla_insumo(insumos_cobertura[$('#insumo_change_cob').val()],filtro);
    //console.log('--------------- tabla armada ----------');
    //console.log(tabla_armada);

      for (var i = 0; i < tabla_armada.length; i++) {
               if(i == 0){
                datos_doble +=  '<thead><tr>';
                datos_dobleDat +=  '<thead><tr>';
              }
               else if(i == 1){
                 datos_doble +=  '<tbody><tr>';
                 datos_dobleDat +=  '<tbody><tr>';
               }
               else {
                  datos_doble +=  '<tr>';
                  datos_dobleDat +=  '<tr>';
               }

               for (var j = tabla_armada[0].length -1 ; j > 0 ; j--) {
                if(i == 0 && j == tabla_armada[0].length -1){
                  //datos_doble +=  '  <th  class="headcol">'+ tabla_armada[i][0] +'</th><th>'+ tabla_armada[i][j] .split('-')[0]+'</th>';
                  datos_doble +=  '  <td  class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] .split('-')[0]+'</td>';
                  datos_dobleDat +=  '  <td  class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] .split('-')[0]+'</td>';
                }
                else if( i == 0 && j == tabla_armada[0].length -1 ){
                  //datos_doble += '<th class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</th>';
                  datos_doble += '<td class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</td>';
                  datos_dobleDat += '<td class"padding-200">'+ tabla_armada[i][j].split('-')[0] +'</td>';
                }
                else if( i == 0 ){
                  //datos_doble += '<th>'+ tabla_armada[i][j].split('-')[0] +'</th>';
                  datos_doble += '<td>'+ tabla_armada[i][j].split('-')[0] +'</td>';
                  datos_dobleDat += '<td>'+ tabla_armada[i][j].split('-')[0] +'</td>';
                }
                else if(j == tabla_armada[0].length -1 ) {
                  var varia = '<td class="headcol">'+ tabla_armada[i][0] +'</td><td>'+ tabla_armada[i][j] +'</td>';
                  datos_doble += varia;
                  datos_dobleDat += varia;
                }
                else if(j == tabla_armada[0].length -2){
                    datos_doble +=  '  <td class="laque">'+ tabla_armada[i][j] +'</td>';
                    datos_dobleDat +=  '  <td class="laque">'+ tabla_armada[i][j]  +'</td>';
                }
                else{
                  datos_doble +=  '  <td>'+ tabla_armada[i][j] +'</td>';
                  datos_dobleDat +=  '  <td>'+ tabla_armada[i][j] +'</td>';
                }
               }



               if(i == 0){
                 datos_doble +=  '</tr></thead>';
                 datos_dobleDat +=  '</tr></thead>';
               }else{
                 datos_doble +=  '</tr>';
                 datos_dobleDat +=  '</tr>';
               }
             }



            datos_doble +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
            ' <div class="pie_cuadro2">'+ pie_insumo +
             '</div></div>';

             datos_dobleDat +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
             ' <div class="pie_cuadro2">'+ pie +
              '</div></div>';




    // $.each(tabla_armada, function(idx, value){
    //   if(idx == 0){
    //     datos_doble += '<thead>';
    //   }else if(idx == 1){
    //     datos_doble += '<tbody>';
    //   }
    //   datos_doble += '<tr>';
    //   $.each(value, function(idx2, value2){
    //     if(idx == 0 && idx2 == (value.length -1)){
    //       datos_doble += '<th >'+ value2.split('-')[0]; +'</th>';
    //     }
    //     else if(idx == 0){
    //       datos_doble += '<th>'+ value2.split('-')[0] +'</th>';
    //     }
    //     else if(idx2 == (value.length -1)){
    //       datos_doble += '<td >'+ numberWithCommas(value2) +'</td>';
    //     }
    //     else{
    //       datos_doble += '<td>'+ numberWithCommas(value2) +'</td>';
    //     }
    //   });
    //   datos_doble += '</tr>';
    //   if(idx == 0){
    //     datos_doble += '</thead>';
    //   }
    // });

    // datos_doble +=  '</tbody></table></div><p class="nota" style="color:#8694a8;"><div class="pie_cuadro2">'+ pie +
    //                 '</div></div>';

    //sin pie y cabezera de la pagina
    $('#insumos_cont').html(datos_doble);
    $('#insumos_contDat').html(datos_dobleDat);
    var arre = [];
    for (var i = 0; i < tabla_armada.length[0] - 1; i++) {
      arre.push(i)
    }

    if(arre.length > 17){
      $('#miTabla').DataTable( {
                    scrollY:        "600px",
                    scrollX:        true,
                    scrollCollapse: true,
                    paging:         false,
                    aoColumnDefs: [
                      { 'bSortable': false,
                        'aTargets': arre }
                    ],
                    fixedColumns:   {
                        leftColumns: 1
                    }
                } );
    }

    //agregamos titulo del insumo seleccionado
    $('#titulo_cabezeras').html(lista_insumos[$('#insumo_change_cob').val()]);
    $('#descrip_uni').html('');
  }

  function put_filtros_insumo_cob(insumo){
    $('#este').show();

    var insumo_filtro = '<option value="-1"> Selecciona una Filtro </option>';

    $.each(insumo_cober_clasifica[insumo], function(idx, value){
      insumo_filtro += '<option value="'+idx+'">'+value+'</option>';
    });

    $('#este').html(insumo_filtro);
  }


  function put_filtros_insumo_cob1(insumo){
    $('#este2').show();

    var tipo_gen = '<option value="-1"> Selecciona una género </option>';

  //$.each(insumo_cober_clasifica[insumo], function(idx, value){
      tipo_gen += '<option value="0">Total</option><option value="1">Hombre</option><option value="2">Mujer</option>';
  //});

    $('#este2').html(tipo_gen);
  }


  function put_tabla_insumo(insumo){
    generar_titulos();
    var datos_doble = '<div class="cuadro_titulo"> ' + titulo_insumo +
                      '</div>' +
                      '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_1">'+
                      '<table class="bordered" id="miTabla" class="miTabla">';

                      var datos_dobleDat = '<div class="cuadro_titulo"> ' + titulo +
                                        '</div>' +
                                        '<div style=" width: auto; height: auto; overflow: auto;" id="datos_calculo_122">'+
                                        '<table class="bordered" id="miTablaDat" class="miTablaDat">';


      for (var i = 0; i < insumos_general[insumo].length; i++) {
               if(i == 0){
                datos_doble +=  '<thead><tr>';
                datos_dobleDat +=  '<thead><tr>';
              }
               else if(i == 1){
                 datos_doble +=  '<tbody><tr>';
                 datos_dobleDat +=  '<tbody><tr>';
               }
               else {
                  datos_doble +=  '<tr>';
                  datos_dobleDat +=  '<tr>';
               }

               for (var j = insumos_general[insumo][0].length -1 ; j > 0 ; j--) {
                if(i == 0 && j == insumos_general[insumo][0].length -1){
                  //datos_doble +=  '  <th  class="headcol">'+ insumos_general[insumo][i][0] +'</th><th>'+ insumos_general[insumo][i][j] .split('-')[0]+'</th>';
                  datos_doble +=  '  <td  class="headcol">'+ insumos_general[insumo][i][0] +'</td><td>'+ insumos_general[insumo][i][j] .split('-')[0]+'</td>';
                  datos_dobleDat +=  '  <td  class="headcol">'+ insumos_general[insumo][i][0] +'</td><td>'+ insumos_general[insumo][i][j] .split('-')[0]+'</td>';
                }
                else if( i == 0 && j == insumos_general[insumo][0].length -1 ){
                  //datos_doble += '<th class"padding-200">'+ insumos_general[insumo][i][j].split('-')[0] +'</th>';
                  datos_doble += '<td class"padding-200">'+ insumos_general[insumo][i][j].split('-')[0] +'</td>';
                  datos_dobleDat += '<td class"padding-200">'+ insumos_general[insumo][i][j].split('-')[0] +'</td>';
                }
                else if( i == 0 ){
                  //datos_doble += '<th>'+ insumos_general[insumo][i][j].split('-')[0] +'</th>';
                  datos_doble += '<td>'+ insumos_general[insumo][i][j].split('-')[0] +'</td>';
                  datos_dobleDat += '<td>'+ insumos_general[insumo][i][j].split('-')[0] +'</td>';
                }
                else if(j == insumos_general[insumo][0].length -1 ) {
                  //(Math.round(insumos_general[insumo][i][j] + "e+2")  + "e-2")
                  //var varia = '<td class="headcol">'+ insumos_general[insumo][i][0] +'</td><td>'+ (Math.ceil(insumos_general[insumo][i][j] * 100) / 100) +'</td>';
                  var varia = '<td class="headcol">'+ insumos_general[insumo][i][0] +'</td><td>'+ insumos_general[insumo][i][j] +'</td>';
                  datos_doble += varia;
                  datos_dobleDat += varia;
                }
                else if(j == insumos_general[insumo][0].length -2){
                    datos_doble +=  '  <td class="laque dos">'+ insumos_general[insumo][i][j]  +'</td>';
                    datos_dobleDat +=  '  <td class="laque dos">'+ insumos_general[insumo][i][j] +'</td>';
                }
                else{
                  datos_doble +=  '  <td>'+ insumos_general[insumo][i][j]  +'</td>';
                  datos_dobleDat +=  '  <td>'+insumos_general[insumo][i][j] +'</td>';
                }
               }

               if(i == 0){
                 datos_doble +=  '</tr></thead>';
                 datos_dobleDat +=  '</tr></thead>';
               }else{
                 datos_doble +=  '</tr>';
                 datos_dobleDat +=  '</tr>';
               }
             }



            datos_doble +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
            ' <div class="pie_cuadro2">'+ pie_insumo +
             '</div></div>';

             datos_dobleDat +=  '</tbody></table></div><p class="nota" style="color:#8694a8;">'+
             ' <div class="pie_cuadro2">'+ pie +
              '</div></div>';



    // $.each(insumos_general[insumo], function(idx, value){
    //   if(idx == 0){
    //     datos_doble += '<thead>';
    //   }else if(idx == 1){
    //     datos_doble += '<tbody>';
    //   }
    //   datos_doble += '<tr>';
    //   $.each(value, function(idx2, value2){
    //     if(idx == 0 && idx2 == (value.length -1)){
    //       datos_doble += '<th>'+ value2.split('-')[0] +'</th>';
    //     }
    //     else if(idx == 0){
    //       datos_doble += '<th>'+ value2.split('-')[0] +'</th>';
    //     }
    //     else if(idx2 == (value.length -1)){
    //       datos_doble += '<td>'+ numberWithCommas(value2)+'</td>';
    //     }
    //     else{
    //       datos_doble += '<td>'+ numberWithCommas(value2) +'</td>';
    //     }
    //   });
    //   datos_doble += '</tr>';
    //   if(idx == 0){
    //     datos_doble += '</thead>';
    //   }
    // });

    // datos_doble +=  '</tbody></table></div><p class="nota" style="color:#8694a8;"><div class="pie_cuadro2">'+ pie +
    //                 '</div></div>';

    //sin pie y cabezera de la pagina
    $('#insumos_cont').html(datos_doble);
    $('#insumos_contDat').html(datos_dobleDat);
    var arre = [];
    for (var i = 0; i < insumos_general[insumo][0].length - 1; i++) {
      arre.push(i)
    }

    if(arre.length > 17){
      $('#miTabla').DataTable( {
                    scrollY:        "600px",
                    scrollX:        true,
                    scrollCollapse: true,
                    paging:         false,
                    aoColumnDefs: [
                      { 'bSortable': false,
                        'aTargets': arre }
                    ],
                    fixedColumns:   {
                        leftColumns: 1
                    }
                } );
    }
    //agregamos titulo del insumo seleccionado
    $('#titulo_cabezeras').html(lista_insumos[$('#insumo_change').val()]);
    $('#descrip_uni').html('');
  }

  function valorDatoInsumos(data){
    //console.log("comparacion1");
    lista_insumos = [];
    var temporal = [];
    var individual = [];

    for (var i = 0; i < data.Series.length; i++) {
      var temporal = [];
      individual = [];
      if(data.Series[i].Tipo_ser == "I"){

        lista_insumos.push(data.Series[i].Descrip_ser);
        temporal.push('Entidad');

        for (var j = 0; j < data.Series[i].Coberturas[0].ValorDato.length; j++) {
          temporal.push(data.Series[i].Coberturas[0].ValorDato[j].AADato_ser+'-01-01');
        }
        individual.push(temporal);

        for (var j = 0; j < data.Series[i].Coberturas.length; j++) {
          temporal = [];
          categories2 = [];

          categories2.push(data.Series[i].Coberturas[j].Abrevia_cg);
          temporal.push(data.Series[i].Coberturas[j].Descrip_cg);
          for (var k = 0; k < data.Series[i].Coberturas[j].ValorDato.length; k++) {
            //var dato_formato = data.Series[i].Coberturas[j].ValorDato[k].Dato_Formato.replace(",", "");
            if(data.Series[i].Coberturas[j].ValorDato[k].Dato_Formato != ''){

              var flot = parseFloat(data.Series[i].Coberturas[j].ValorDato[k].Dato_Formato)

               var dato_formato2 = Math.round(flot * 10) / 10;

               var dato_formato = +dato_formato2.toFixed(1);
            }else{
             var dato_formato =  'ND' ;
             /*data.Series[i].Coberturas[j].ValorDato[k].NoDatos.Codigo_nd;*/
            }

            //var dato_formato = (data.Series[i].Coberturas[j].ValorDato[k].Dato_Formato === '') ? data.Series[i].Coberturas[j].ValorDato[k].NoDatos.Codigo_nd : data.Series[i].Coberturas[j].ValorDato[k].Dato_Formato.replace(",", "");
            temporal.push(dato_formato);
          }
          individual.push(temporal);
        }
        insumos_general.push(individual);
      }
    }

    //Armamos el select para que tenga todas las series que pueden existir
    var select='<div class="input-field col s12" style="margin-bottom:20px;"><select id="insumo_change" class="select_datos" style="display:block !important; background-color: #f2f2f2;">';

    select += '<option value="-1"> Selecciona una opción </option>';
    $.each(lista_insumos, function(idx, value){
      select += '<option value="'+idx+'">'+value+'</option>';
    });

    select += '</select></div><div class="col s12" id="insumos_cont"></div><div class="col s12" id="insumos_contDat" style="display:none;"></div>';

    //sin pie y cabezera de la pagina
    $('#datos-panel').html(select);
  }

  function coberturaInsumos(data){
    lista_insumos = [];

    for (var i = 0; i < data.Series.length; i++) {
      if(data.Series[i].Tipo_ser == "I"){
        lista_insumos.push(data.Series[i].Descrip_ser);
        insumos_cobertura.push(cobertura_series(data,i));
        insumo_cober_clasifica.push(clasificaciones(data,i));
        //insumo_cober_clasifica_tipo.push();
      }
    }

    //Armamos el select para que tenga todas las series que pueden existir
    var select='<div class="input-field col s12" style="margin-bottom:20px;"><select id="insumo_change_cob" class="select_datos" style="display:block !important; background-color: #f2f2f2;">';

    select += '<option value="0"> Selecciona una opción </option>';
    $.each(lista_insumos, function(idx, value){
      select += '<option value="'+(idx+1)+'">'+value+'</option>';
    });

    select += '</select></div><div class="col s12" id="tipo_gen"><select id="este2" style="margin-bottom :15px; display:none !important; background-color: #f2f2f2;"></select></div><div class="col s12" id="insumo_filtro"><select id="este" style="display:none !important; background-color: #f2f2f2;"></select></div><div class="col s12" id="insumos_cont"></div>';

    //sin pie y cabezera de la pagina
    $('#datos-panel').html(select);
  }

  function actualiza_grafica(){
    $('.numero').html(arrray_anios[0]);
    datosGrafica(arrray_anios[0]);
  }//fin de la función

  function actualiza_grafica_na(){
    chart2 = c3.generate({
    bindto: '#chart2',
    size: {
          height: 400
        },
      data: {
          x: 'Entidad',
          columns: estados,
      },
      legend: {
      show: false
      },
    padding: {
          left: 40,
          right: 30
      },
      point: {
      show: true
    },
    color: {
          pattern:['#f00']
      },

      axis : {
          x : {
              type : 'timeseries',
              tick: {
                  format: function (x) { return x.getFullYear(); }
                //format: '%Y' // format string is also available for timeseries data
              },
              y : {
                  tick: {
                      format: d3.format(".0f")
                  },
                  padding: {top: 35, bottom: 0}
              }
          }
      },tooltip: {
          grouped: false, // Default true
            format: {
              title: function (d) { return d.name; },
              value: function (value, ratio, id) {
                (function ($) {
                  if (id != "Estados Unidos Mexicanos") {
                      $( "#chart2 svg g.c3-chart-line g.c3-circles circle" ).css('fill','#ccc');
                      $( "#chart2 svg g.c3-chart-line path.c3-line" ).css('stroke','#ccc');

                      $( "svg g.c3-chart-line g.c3-circles-" +id.replace(/ /g,'-') + " circle" ).css('fill','#00aeef');
                      $( "svg g.c3-chart-line path.c3-line-" +id.replace(/ /g,'-') ).css('stroke','#00aeef');

                      $( "svg g.c3-chart-line g.c3-circles-Promedio-nacional circle" ).css('fill','#f00');
                      $( "svg g.c3-chart-line path.c3-line-Promedio-nacional" ).css('stroke','#f00');
                      $( "svg g.c3-chart-line g.c3-circles-Estados-Unidos-Mexicanos circle" ).css('fill','#f00');
                      $( "svg g.c3-chart-line path.c3-line-Estados-Unidos-Mexicanos" ).css('stroke','#f00');
                  }
                  else {
                    $( "#chart2 svg g.c3-chart-line g.c3-circles circle" ).css('fill','#ccc');
                    $( "#chart2 svg g.c3-chart-line path.c3-line" ).css('stroke','#ccc');

                    $( "svg g.c3-chart-line g.c3-circles-Promedio-nacional circle" ).css('fill','#f00');
                    $( "svg g.c3-chart-line path.c3-line-Promedio-nacional" ).css('stroke','#f00');

                    $( "svg g.c3-chart-line g.c3-circles-Estados-Unidos-Mexicanos circle" ).css('fill','#f00');
                    $( "svg g.c3-chart-line path.c3-line-Estados-Unidos-Mexicanos" ).css('stroke','#f00');
                  }
                }(jQuery));
                  return commaSeparateNumber(Math.round(value*10)/10);
              }
          }
      },
    });
  }//fin de la función

  function poner_filtros(){
    $("#filtros_es").html('');
    for (var i = 0; i < arreglo_cla.length; i++) {
      $("#filtros_es").append('<option value="'+i+'">'+arreglo_cla[i]+'</option>');
    }
    //$('#row_filtros').show();
    //$('select').material_select();
  }

  function poner_filtros_na(){
    $("#filtros_na").html('');
    for (var i = 0; i < arreglo_cla.length; i++) {
      $("#filtros_na").append('<option value="'+i+'">'+arreglo_cla[i]+'</option>');
    }
    //$('.cob_sel_nac').show();
    //$('select').material_select();
  }

  function poner_filtros_serie(){
    $("#filtros_serie").html('');
    for (var i = 0; i < arreglo_cla.length; i++) {
      $("#filtros_serie").append('<option value="'+i+'" >'+arreglo_cla[i]+'</option>');
    }
    //$('.cob_sel_nac').show();
    //$('select').material_select();
  }

  function valorDato(data){
    //console.log("comparacion2");
    //console.log(data);
    var temporal = [];
    //console.log('******************** des');
    //console.log(data.Descrip_ind);
    Descrip_ind = data.Descrip_ind;


    temporal.push('Entidad');
    for (var j = 0; j < data.Series[0].Coberturas[0].ValorDato.length; j++) {
      temporal.push(data.Series[0].Coberturas[0].ValorDato[j].AADato_ser+'-01-01');
    }
    estados.push(temporal);
    //console.log('TemporalTemporalTemporalTemporalTemporalTemporalTemporalTemporalTemporalTemporal');
//console.log(temporal);
    for (var i = 0; i < data.Series[0].Coberturas.length; i++) {
      var temporal = [];
      var categories2 = [];
      categories2.push(data.Series[0].Coberturas[i].Abrevia_cg);
      temporal.push(data.Series[0].Coberturas[i].Descrip_cg);
      for (var j = 0; j < data.Series[0].Coberturas[i].ValorDato.length; j++) {
        var dato_formato;
        // console.log('-------------------- comparamos --------------------');
        // console.log(data.Series[0].Coberturas[i].ValorDato[j].Dato_Formato);
        if(data.Series[0].Coberturas[i].ValorDato[j].Dato_Formato != '')
        {

          dato_formato = data.Series[0].Coberturas[i].ValorDato[j].Dato_Formato;
          //data.Series[0].Coberturas[i].ValorDato[j].NoDatos.Codigo_nd;
        }
        else {
             dato_formato = 'ND';
        }
        temporal.push(dato_formato);
      }
      estados.push(temporal);
    }
  }

  function arma_tabla(num_cobertura){
    var cobertura_tabla = [];

    //console.log(arreglo_datos[num_cobertura]);
    //console.log(arreglo_datos);
    cobertura_tabla.push(anios_cob);
    for (var i = 0; i < arreglo_datos[num_cobertura].length; i++) {
        cobertura_tabla.push(arreglo_datos[num_cobertura][i]);
    }
    console.log('ñlñlñlñlñlñlñlñlññlñlñlñlñlñlñlñlñ');
    console.log(arreglo_datos);
    console.log(cobertura_tabla);
    return cobertura_tabla;
  }

  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  $(document).ready(function()
  {

    titulos(PCveInd);

    $('#filtros_es').on('change',function(){
      $('#loader').show();
      estados = arma_tabla($(this).val());
      //console.log('------------------------- estados tabala select-----------------');
      //console.log(estados);
      actualiza_grafica();

      $('#'+anio_mas_actual).trigger( "click" );

      $('#loader').delay(2000).fadeOut("slow");
    });

    $('#filtros_na').on('change',function(){
      $('#loader').show();
      estados = arma_tabla($(this).val());
      //console.log('------------------------- estados tabala select-----------------');
      //console.log(estados);
      actualiza_grafica_na();

      $('#loader').delay(2000).fadeOut("slow");
    });
  });

  var titulo;
  var titulo_insumo;
  var pie;
  var pie_insumo;
  var atributos_general;

  function generar_titulos_cob(){
      var serie_insumo =  $('#insumo_change_cob').val();
      serie_insumo++;
      //console.log(serie_insumo);
      //console.log(atributos);
      //console.log(atributos.Serie[2]);
      //console.log(atributos.Serie[serie_insumo].NotaSer_not);

        titulo_insumo = '<h4 id="titulo_cabezeras">'+atributos.DescripInd_des+'</h4>' +
                        '<li class="divider"></li> '+
                        '<p>' + ((atributos.DescripSer_des != null || atributos.DescripSer_des != "") ? ''  : '<strong>Serie: </strong>' + atributos.DescripSer_des) +'</p>';
                        '<p> '+ atributos.CobTemporal_ser +' </p>' +
                        '<span id="descrip_uni"> '+ atributos.Descrip_uni +'</span>';

        pie_insumo =  ' <div> '+ ((atributos.Serie[serie_insumo].NotaSer_not != null) ? '<strong>Nota serie:</strong>' + atributos.Serie[serie_insumo].NotaSer_not : "") +'</div>'+
                      ' <div> '+ ((atributos.Serie[serie_insumo].DescripSer_fue != null) ? '<strong>Fuente:</strong>' + atributos.Serie[serie_insumo].DescripSer_fue : "") +'</div>'+
                      ' <div> '+ ((atributos.Serie[serie_insumo].DescripSer_uni != null) ? '<strong>Unidad de medida:</strong>' + atributos.Serie[serie_insumo].DescripSer_uni : "") +'</div>';
  }

  function generar_titulos(){
      var serie_insumo =  $('#insumo_change').val();
      serie_insumo++;
      //console.log(serie_insumo);
      //console.log(atributos);
      //console.log(atributos.Serie[2]);
      //console.log(atributos.Serie[serie_insumo].NotaSer_not);

        titulo_insumo = '<h4 id="titulo_cabezeras">'+atributos.DescripInd_des+'</h4>' +
                        '<li class="divider"></li> '+
                        '<p>' + ((atributos.DescripSer_des != null || atributos.DescripSer_des != "") ? ''  : '<strong>Serie: </strong>' + atributos.DescripSer_des) +'</p>';
                        '<p> '+ atributos.CobTemporal_ser +' </p>' +
                        '<span id="descrip_uni"> '+ atributos.Descrip_uni +'</span>';

        pie_insumo =  ' <div> '+ ((atributos.Serie[serie_insumo].NotaSer_not != null) ? '<strong>Nota serie:</strong>' + atributos.Serie[serie_insumo].NotaSer_not : "") +'</div>'+
                      ' <div> '+ ((atributos.Serie[serie_insumo].DescripSer_fue != null) ? '<strong>Fuente:</strong>' + atributos.Serie[serie_insumo].DescripSer_fue : "") +'</div>'+
                      ' <div> '+ ((atributos.Serie[serie_insumo].DescripSer_uni != null) ? '<strong>Unidad de medida:</strong>' + atributos.Serie[serie_insumo].DescripSer_uni : "") +'</div>';



  }


  function titulos(indicador){
        var serie_insumo =  $('insumo_change').val();
        atributos_general = getAtributos(indicador);
        atributos = atributos_general;


      if(PCveInd == 1 || PCveInd == 2 || PCveInd == 105 || PCveInd == 208 || PCveInd == 212 || PCveInd == 213 || PCveInd == 224 || PCveInd == 101){
           titulo   =  '<h4 id="titulo_cabezeras">'+ atributos.DescripInd_des  +'</h4>' +
                        '<li class="divider"></li> ' +
                        '<p> '+ atributos.CobTemporal_ser +' </p>' +
                        '<span id="descrip_uni"> '+ atributos.Descrip_uni +'</span>' +
                        '<p id="no_va_serie"><strong>Total<strong></p>';

                         pie  = ' <div> '+ ((atributos.Descrip_not != null || atributos.Descrip_not != "") ? ''  : '<strong>Nota:</strong>' + atributos.Descrip_not)+
                  '<div><strong>Fuente: </strong> '+ atributos.Descrip_fue +' </div>'+
                  ' <div> '+ ((atributos.FecAct_atr != null) ? '<strong>Fecha de actualización: </strong>' + atributos.FecAct_atr : "") +'</div>'+
                  ' <div><strong>Fecha de próxima actualización: </strong> '+ atributos.FecProxAct_cal +'</div>'+
                  ' </div>';
      }
      else if(cobertura_notas){
        titulo   =  '<h4 id="titulo_cabezeras">'+ atributos.DescripInd_des  +'</h4>' +
                        '<li class="divider"></li> ' +
                        '<p> '+ atributos.CobTemporal_ser +' </p>' +
                        '<span id="descrip_uni"> '+ atributos.Descrip_uni +'</span>' +
                        '<p id="no_va_serie"><strong>Esta vista presenta los datos totales del indicador. Para conocer más detalles visita la sección de serie histórica.<strong></p>';


        pie  = ' <div> '+ ((atributos.Descrip_not != null || atributos.Descrip_not != "") ? ''  : '<strong>Nota:</strong>' + atributos.Descrip_not)+
                  '<div><strong>Fuente: </strong> '+ atributos.Descrip_fue +' </div>'+
                  ' <div> '+ ((atributos.FecAct_atr != null) ? '<strong>Fecha de actualización: </strong>' + atributos.FecAct_atr : "") +'</div>'+
                  ' <div><strong>Fecha de próxima actualización: </strong> '+ atributos.FecProxAct_cal +'</div>'+
                  ' </div>';
      }else{
        titulo   =  '<h4 id="titulo_cabezeras">'+ atributos.DescripInd_des  +'</h4>' +
                        '<li class="divider"></li> ' +
                        '<p> '+ atributos.CobTemporal_ser +' </p>' +
                        '<span id="descrip_uni"> '+ atributos.Descrip_uni +'</span>';

        pie  = ' <div> '+ ((atributos.Descrip_not != null || atributos.Descrip_not != "") ? ''  : '<strong>Nota: </strong>' + atributos.Descrip_not)+
                  '<div><strong>Fuente: </strong> '+ atributos.Descrip_fue +' </div>'+
                  ' <div> '+ ((atributos.FecAct_atr != null) ? '<strong>Fecha de actualización: </strong>' + atributos.FecAct_atr : "") +'</div>'+
                  ' <div><strong>Fecha de próxima actualización: </strong> '+ atributos.FecProxAct_cal +'</div>'+
                  ' </div>';
      }


        $('.pie_cuadro2').html(pie);
        $('.cuadro_titulo').html(titulo);
        titulo_des_graf = atributos.DescripInd_des;

        put_datos(atributos.DescripInd_des, atributos.Descrip_ins);
  }

  function iconoObjetivo(objetivo){
    switch(objetivo){
      case "1.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-01.png">');
        //return '<img class="ico_obj" src="img/ods-01.png">';
      break;
      case "2.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-02.png">');
        //return '<img class="ico_obj" src="img/ods-02.png">';
      break;
      case "3.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-03.png">');
        //return '<img class="ico_obj" src="img/ods-03.png">';
      break;
      case "4.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-04.png">');
        //return '<img class="ico_obj" src="img/ods-04.png">';
      break;
      case "5.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-05.png">');
        //return '<img class="ico_obj" src="img/ods-05.png">';
      break;
      case "6.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-06.png">');
        //return '<img class="ico_obj" src="img/ods-06.png">';
      break;
      case "7.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-07.png">');
        //return '<img class="ico_obj" src="img/ods-07.png">';
      break;
      case "8.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-08.png">');
        //return '<img class="ico_obj" src="img/ods-08.png">';
      break;
      case "9.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-09.png">');
        //return '<img class="ico_obj" src="img/ods-09.png">';
      break;
      case "10.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-10.png">');
        //return '<img class="ico_obj" src="img/ods-10.png">';
      break;
      case "11.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-11.png">');
        //return '<img class="ico_obj" src="img/ods-11.png">';
      break;
      case "12.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-12.png">');
        //return '<img class="ico_obj" src="img/ods-12.png">';
      break;
      case "13.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-13.png">');
        //return '<img class="ico_obj" src="img/ods-13.png">';
      break;
      case "14.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-14.png">');
        //return '<img class="ico_obj" src="img/ods-14.png">';
      break;
      case "15.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-15.png">');
        //return '<img class="ico_obj" src="img/ods-15.png">';
      break;
      case "16.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-16.png">');
        //return '<img class="ico_obj" src="img/ods-16.png">';
      break;
      case "17.":
        $('.iconoObjetivo').html('<img class="ico_obj1" src="img/ods-17.png">');
        //return '<img class="ico_obj" src="img/ods-17.png">';
      break;

    }
  }

  function colorObjetivo(objetivo){
    switch(objetivo){
      case "1.":
        $('.headerObje').addClass('id_1');
        $('#sti').addClass('id_1');
        $('.indicadores-taps').removeClass('id_1');
        $('.indicadores-taps-active').addClass('id_1');
        // $('.indicadores-taps-active').css('background-color', '#D90A38 !important');
      break;
      case "2.":
        $('.headerObje').addClass('id_2');
        $('#sti').addClass('id_2');
        $('.indicadores-taps').removeClass('id_2');
        $('.indicadores-taps-active').addClass('id_2');
        // $('.indicadores-taps-active').css('background-color','#D8AE2B !important');
      break;
      case "3.":
        $('.headerObje').addClass('id_3');
        $('#sti').addClass('id_3');
        $('.indicadores-taps').removeClass('id_3');
        $('.indicadores-taps-active').addClass('id_3');
        // $('.indicadores-taps-active').css('background-color','#299E32 !important');
      break;
      case "4.":
        $('.headerObje').addClass('id_4');
        $('#sti').addClass('id_4');
        $('.indicadores-taps').removeClass('id_4');
        $('.indicadores-taps-active').addClass('id_4');
        // $('.indicadores-taps-active').css('background-color','#BD052D !important');
      break;
      case "5.":
        $('.headerObje').addClass('id_5');
        $('#sti').addClass('id_5');
        $('.indicadores-taps').removeClass('id_5');
        $('.indicadores-taps-active').addClass('id_5');
        // $('.indicadores-taps-active').css('background-color','#E23429 !important');
      break;
      case "6.":
        $('.headerObje').addClass('id_6');
        $('#sti').addClass('id_6');
        $('.indicadores-taps').removeClass('id_6');
        $('.indicadores-taps-active').addClass('id_6');
        // $('.indicadores-taps-active').css('background-color','#56BCE3 !important');
      break;
      case "7.":
        $('.headerObje').addClass('id_7');
        $('#sti').addClass('id_7');
        $('.indicadores-taps').removeClass('id_7');
        $('.indicadores-taps-active').addClass('id_7');
        // $('.indicadores-taps-active').css('background-color','#F2CB02 !important');
      break;
      case "8.":
        $('.headerObje').addClass('id_8');
        $('#sti').addClass('id_8');
        $('.indicadores-taps').removeClass('id_8');
        $('.indicadores-taps-active').addClass('id_8');
        // $('.indicadores-taps-active').css('background-color','#9D063D !important');
      break;
      case "9.":
        $('.headerObje').addClass('id_9');
        $('#sti').addClass('id_9');
        $('.indicadores-taps').removeClass('id_9');
        $('.indicadores-taps-active').addClass('id_9');
        // $('.indicadores-taps-active').css('background-color','#E86A26 !important');
      break;
      case "10.":
        $('.headerObje').addClass('id_10');
        $('#sti').addClass('id_10');
        $('.indicadores-taps').removeClass('id_10');
        $('.indicadores-taps-active').addClass('id_10');
        // $('.indicadores-taps-active').css('background-color','#D4015E !important');
      break;
      case "11.":
        $('.headerObje').addClass('id_11');
        $('#sti').addClass('id_11');
        $('.indicadores-taps').removeClass('id_11');
        $('.indicadores-taps-active').addClass('id_11');
        // $('.indicadores-taps-active').css('background-color','#F0A612 !important');
      break;
      case "12.":
        $('.headerObje').addClass('id_12');
        $('#sti').addClass('id_12');
        $('.indicadores-taps').removeClass('id_12');
        $('.indicadores-taps-active').addClass('id_12');
        // $('.indicadores-taps-active').css('background-color','#B99319 !important');
      break;
      case "13.":
        $('.headerObje').addClass('id_13');
        $('#sti').addClass('id_13');
        $('.indicadores-taps').removeClass('id_13');
        $('.indicadores-taps-active').addClass('id_13');
        // $('.indicadores-taps-active').css('background-color','#2D7D3B !important');
      break;
      case "14.":
        $('.headerObje').addClass('id_14');
        $('#sti').addClass('id_14');
        $('.indicadores-taps').removeClass('id_14');
        $('.indicadores-taps-active').addClass('id_14');
        // $('.indicadores-taps-active').css('background-color','#4B95CF !important');
      break;
      case "15.":
        $('.headerObje').addClass('id_15');
        $('#sti').addClass('id_15');
        $('.indicadores-taps').removeClass('id_15');
        $('.indicadores-taps-active').addClass('id_15');
        // $('.indicadores-taps-active').css('background-color','#37B72F !important');
      break;
      case "16.":
        $('.headerObje').addClass('id_16');
        $('#sti').addClass('id_16');
        $('.indicadores-taps').removeClass('id_16');
        $('.indicadores-taps-active').addClass('id_16');
        // $('.indicadores-taps-active').css('background-color','#336198 !important');
      break;
      case "17.":
        $('.headerObje').addClass('id_17');
        $('#sti').addClass('id_17');
        $('.indicadores-taps').removeClass('id_17');
        $('.indicadores-taps-active').addClass('id_17');
        // $('.indicadores-taps-active').css('background-color','#2B3E63 !important');
      break;

    }
  }

  function put_datos(indicador, institucion){
      // $('#da_indicador').html(indicador);
      $('#da_institucion').html(institucion);
  }

  function mapa_333()
  {
    function busqueda_estado(cadena)
    {
      for(var i=0;i<estados.length;i++)
      {
        if(estados[i][0] == cadena)
        {
          //console.log("valorNull",cadena,estados[i][1],estados[i][1]=="ND");
          if(estados[i][1]=="ND")
          {
            return -1;
          }
          else
          {
            return parseFloat(estados[i][1]);
          }
        }
      }
    }

    function busqueda_indice(cadena) {
      for (var i = 0; i < estados.length; i++) {
        if (estados[i][0] == cadena) {
          return parseFloat(i);
        }
      }
    }

    function busqueda_mexico() {
      var arrray=[];
      for (var i = 0; i < estados.length; i++) {
        if (estados[i][0] == "Estados Unidos Mexicanos") {
          for(var j=0;j< estados[i].length;j++)
          {
            arrray.push(estados[i][j])
          }
        }
      }
      return arrray;
    }

    function busqueda_estado_posicion(cadena,posicion)
    {
      for(var i=0;i<estados.length;i++)
      {
        if(estados[i][0] == cadena)
        {
          //console.log("aca el error",cadena,estados[i][posicion]);
          if(estados[i][posicion] == "ND")
          {
            return -1;
          }
          else
          {
            return parseFloat(estados[i][posicion]);
          }
        }
      }
    }

    function busqueda_anio(cadena)
    {
      for(var i=0;i<estados[0].length;i++)
      {
        if(estados[0][i] == cadena)
        {
          //console.log(estados[0][i]);
          return i;
        }
      }
    }

    var img;
    var data_url;
    var locked=false;
    var map = L.map('map333' ,
    {
        scrollWheelZoom: false,
        maxZoom: 14,
    minZomm:5,
    }).setView([24.8, -100], 5);


  L.tileLayer('http://{s}.google.com/vt/?hl=es&x={x}&y={y}&z={z}&s={s}&apistyle=s.t%3A5|p.l%3A53%2Cs.t%3A1314|p.v%3Aoff%2Cp.s%3A-100%2Cs.t%3A3|p.v%3Aon%2Cs.t%3A2|p.v%3Aoff%2Cs.t%3A4|p.v%3Aoff%2Cs.t%3A3|s.e%3Ag.f|p.w%3A1|p.l%3A100%2Cs.t%3A18|p.v%3Aoff%2Cs.t%3A49|s.e%3Ag.s|p.v%3Aon|p.s%3A-19|p.l%3A24%2Cs.t%3A50|s.e%3Ag.s|p.v%3Aon|p.l%3A15&style=47,37', {
  subdomains:['mt0', 'mt1', 'mt2', 'mt3'],
      maxZoom: 14,
      minZomm:5,
      attribution: '&copy <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
      id: 'mapbox.light',
    }).addTo(map);

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )
    {
    map.dragging.disable();
  }



    var info = L.control();
    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'infos hide');
      this.update();
      return this._div;
    };




    info.update = function (props) {
     $('.infos').removeClass('hide');
     $('.info2').removeClass('hide');
     if(props != undefined)
     {
        this._div.innerHTML='<div><h5 style="font-weight:bold">' + props.nom_ent +'</h5><br><div style="height:30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="font-size: 20px;color: #00aeef;">' + busqueda_estado(props.nom_ent).toFixed(1)/*props.density*/ + '</b><b>(año)</b><p style="position: relative; top:-31px; left: 13%;" class="crop">'+titulo_des_graf+'</p></div></div><div class="info"></div>';

      // gen(estados[props.cve]);
      //console.log("---->estados a ver",estados[busqueda_indice(props.nom_ent)]);
      gen(estados[busqueda_indice(props.nom_ent)]);
      $(".crop").dotdotdot();
     }
    };
    info.addTo(map);

    function getColoR(d) {
      return d >= 100 ? '#004b67' :
             d > 50  ? '#007dab' :
             d > 20  ? '#01baff' :
                       '#eff3ff';
    }

    function style(feature) {
    var res=String(getColoR(busqueda_estado(feature.properties.nom_ent))).split(",");
    //console.log(res,'hhhh',"c"+res[1]);
      return {
        weight: 0.5,
        opacity: 1,
        color: '#000',
        dashArray: '1',
        fillOpacity: 1,
        fillColor: getColoR(busqueda_estado(feature.properties.nom_ent)),
         className: "c"+res[1]
      };
    }
    function highlightFeature(e) {
     if(locked == false)
     {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#ccc',
          dashArray: '',
          fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
        info.update(layer.feature.properties);
     }
    }
    var geojson;
    function resetHighlight(e) {

       geojson.resetStyle(e.target);
     info.update();
    }
    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }
    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        mousedown: function(e)
        {
    if (locked == true) {
      locked = false;
      (function ($) {
               $(".info2").css("border","none");
               $(".infos").css("border","none");
               }(jQuery));
    }
    else {
      locked = true;
      (function ($) {
              $(".info2").css("border-bottom","5px solid rgb(107, 174, 214)");
              $(".info2").css("border-left","5px solid rgb(107, 174, 214)");
              $(".info2").css("border-right","5px solid rgb(107, 174, 214)");
              $(".infos").css("border-top","5px solid rgb(107, 174, 214)");
              $(".infos").css("border-left","5px solid rgb(107, 174, 214)");
              $(".infos").css("border-right","5px solid rgb(107, 174, 214)");
               }(jQuery));
    }
   },
      });
    }

    function highlightFromLegend(e)
      {
    (function ($) {
      $("svg path."+e).addClass("highlighted");
      var r=$("svg path."+e);
      for(var i=0;i<r.length;i++)
      {
        r[i].classList.add("highlighted");
      }
    }(jQuery));
  }

  function clearHighlight() {
    (function ($) {

      $("path").removeClass("highlighted");
      var r=$("path");
      for(var i=0;i<r.length;i++)
      {
        r[i].classList.remove("highlighted");
      }
    }(jQuery));
  }

  var values = [];
  var values2 = [];
  for (var i = 0; i < statesData.features.length; i++)
  {
    //console.log(statesData.features[i].properties.nom_ent);
    if (statesData.features[i].properties.nom_ent == null) continue;
    values.push(busqueda_estado(statesData.features[i].properties.nom_ent));
  }

  //console.log(values,values2);
  var brea =[-1,0,100];
  // for(var ii=0;ii<alfr.length;ii++)
  // {
  //   if(alfr[ii] != -1)
  //   {
  //     brea.push(alfr[ii]);
  //   }
  // }
  // console.log("breaks0",brea,brew.getBreaks());
  //   geojson = L.geoJson(statesData, {
  //     style: style,
  //     onEachFeature: onEachFeature
  //   }).addTo(map);


    map.attributionControl.addAttribution('');
    var legend = L.control();
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info2 legend hide'),
        grades = brea,//brew.getBreaks(),//[0, 20, 50, 100],
        labels = [],
        from, to;
      for (var i = 0; i < grades.length-1; i++) {
        from = grades[i];
        to = grades[i + 1];
        var res=String(getColoR(from)).split(",");
        //console.log(from,from+1,res,grades);
        labels.push(
          '<div style="float:left; text-align: center;"><i class="leyenda" onmouseover="highlightFromLegend(\'c'+ res[1] +'\')" onmouseout="clearHighlight();" style="width:100%; background:' + getColoR(from) + '"></i><br>' +
          from.toFixed(1) + (to.toFixed(1) ? '&ndash;' + to.toFixed(1) : '+')+'</div>');
      }
      div.innerHTML = labels.join('');
      return div;
    };
    legend.addTo(map);
  }
