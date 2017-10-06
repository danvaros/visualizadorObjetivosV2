var estados = [];
var clave_ser = '';
var claveInd_ser = '';
var es_cobertura =  false;

//variables de url compartida
var tipo = getParameterByName("tipo");
var objetivo = getParameterByName("objetivo")+'';
var indicador_sel = getParameterByName("indicador_sel");;

if(indicador_sel == ""){
  console.log('vacio llamada normal');
  getIndicador(26,87);
}else{
  console.log('la otra llamada');
  //getIndicador(indicador,serie);
  getIndicador(26,87);
  setTimeout(function(){ selects_aut(); }, 1000);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getInd(indicador){
  estados = [];

  $.ajax({
    type: 'POST',
    url: PathAPI + "Valores/PorClave",
    data: {'PCveInd':indicador,'PAnoIni':'0', 'PAnoFin':'0', 'POrden':'DESC', 'PIdioma':'ES'},
    success: function( data, textStatus, jqxhr ) {
      console.log('-------------------- valorDato ----------------');
      console.log(data.Series[0].Coberturas[0].ValorDato);
      clave_ser       = data.Series[0].Clave_ser;
      claveInd_ser    = data.ClaveInd_ser;


      if(data.Series[0].Coberturas[0].ValorDato != 0){
        valorDato(data);
      }else{
        cobertura(data);
        estados = arma_tabla(0);
        poner_filtros();
      }
      console.log("------------------------ ya termino las llamadas --------------------");
      compartir();
      $('#loader').delay(2000).fadeOut("slow");
    },
    async:false
  });
}

function valorDato(data){
  var temporal = [];
  temporal.push('Entidad');
  for (var j = 0; j < data.Series[0].Coberturas[0].ValorDato.length; j++) {
    temporal.push(data.Series[0].Coberturas[0].ValorDato[j].AADato_ser+'-01-01');
  }
  estados.push(temporal);

  for (var i = 0; i < data.Series[0].Coberturas.length; i++) {
    var temporal = [];
    temporal.push(data.Series[0].Coberturas[i].Descrip_cg);
    for (var j = 0; j < data.Series[0].Coberturas[i].ValorDato.length; j++) {
      var dato_formato = data.Series[0].Coberturas[i].ValorDato[j].Dato_Formato.replace(",", "");
      temporal.push(dato_formato);
    }
    estados.push(temporal);
  }

  console.log(estados);

  var codigo_indicador = data.Codigo_ind;
  console.log(codigo_indicador);
  var descripcion = data.Descrip_ind;
  console.log(descripcion);
}

function getSerie(indicador)
{
  console.log('---------------------------- datos de envio -------------------------');
  console.log('indicador'+ indicador);

  $.ajax({
  	  type: 'POST',
  	  url: PathAPI + "AtrIndicador/PorClave",
  	  data: {'PCveInd':indicador, 'PIdioma':'ES'},
  	  success: function( data, textStatus, jqxhr )
    {
      console.log("llamada",indicador);
      console.log("Serie:::::",data.Serie[0].ClaveSer_ats);
      getIndicador(indicador,data.Serie[0].ClaveSer_ats);
    },
    error:function( data, textStatus, responseJSON )
    {
      console.log('---------------------------- data -------------------------');
      console.log(data);
      console.log(data.responseJSON.Message);
      if(data.responseJSON.Message == "La clave de indicador NO existe")
      {
        console.log('El indicador no contiene valores\nPor favor selecciona otro');
        $('#loader').delay(2000).fadeOut("slow");
      }
      if(data.responseJSON.Message == "An error has occurred.")
      {
        //alert("Ocurrio un error al solicitar los datos");
        console.log('Ocurrio un error al solicitar los datos');
        $('#loader').delay(2000).fadeOut("slow");
      }
    },
    async:false
  });
}

function getIndicador(indicador,ser){
	estados = [];
  console.log("Indicador",indicador," -> Serie",ser);
	$.ajax({
	  type: 'POST',
	  url: PathAPI + "Valores/PorClaveSerie",
	  data: {'PCveInd':indicador,'PAnoIni':'0', 'PAnoFin':'0', 'POrden':'DESC','PCveSer': ser , 'PIdioma':'ES'},
	  success: function( data, textStatus, jqxhr ) {
	  		//alert( "Exito" );
			console.log(data);
			console.log('------------------------------------- nuevo arreglo  --------------------');
			console.log(data.Series);
			console.log(data.Series[0]);
			console.log(data.Series[0].Coberturas);
			console.log(data.Series[0].Coberturas.length);

      clave_ser       = data.Series[0].Clave_ser;
      claveInd_ser    = data.ClaveInd_ser;

      if(data.Series[0].Coberturas.length  < 32 )
      {
        //alert("La llamada no contiene valores para todos los estados");
        console.log('La llamada no contiene valores para todos los estados');
        $('#loader').delay(2000).fadeOut("slow");
      }
      else
      {
    			var temporal = [];
    			temporal.push('Entidad');
    			for (var j = 0; j < data.Series[0].Coberturas[0].ValorDato.length; j++) {
    			temporal.push(data.Series[0].Coberturas[0].ValorDato[j].AADato_ser+'-01-01');
    			}
    			estados.push(temporal);


    			for (var i = 0; i < data.Series[0].Coberturas.length; i++) {
    				var temporal = [];
    				temporal.push(data.Series[0].Coberturas[i].Descrip_cg);
    				for (var j = 0; j < data.Series[0].Coberturas[i].ValorDato.length; j++) {
    					//temporal.push(data.Series[0].Coberturas[i].ValorDato[j].Dato_ser);
              var dato_formato = data.Series[0].Coberturas[i].ValorDato[j].Dato_Formato.replace(",", "");
              temporal.push(dato_formato);
    				}
    				estados.push(temporal);
    			}

    			console.log(estados);

    			var codigo_indicador = data.Codigo_ind;
    			console.log(codigo_indicador);
    			var descripcion = data.Descrip_ind;
    			console.log(descripcion);

    			//inicio =  1;
    			//setTimeout(function(){$('#preloader').fadeOut('slow',function(){$(this).remove();});},3000);
          console.log("ya termino las llamadas");
          $('#loader').delay(2000).fadeOut("slow");
      }
	  },
	  async:false
	});
}

function arma_tabla(num_cobertura){
  var cobertura_tabla = [];
  console.log('------------------------ probando function  -------------------');
  console.log(anios_cob);
  console.log(arreglo_datos[num_cobertura]);

  cobertura_tabla.push(anios_cob);
  for (var i = 0; i < arreglo_datos[num_cobertura].length; i++) {
      cobertura_tabla.push(arreglo_datos[num_cobertura][i]);
  }

  return cobertura_tabla;
}
