// estas globales se utilizara para generar el nuevo select
var arreglo_cla =  [];
var arreglo_agru =  [];
var arreglo_datos =  [];
var arreglo_datos_hombre = [];
var arreglo_datos_mujeres = [];
var anios_cob = [];

// son las nuevas variables para las series
var arreglo_cla_insumos =  [];
var arreglo_agru_insumos =  [];
var arreglo_datos_insumos =  [];
var arreglo_datos_hombre_insumos = [];
var arreglo_datos_mujeres_insumos = [];
var anios_cob_insumos = [];

//funcion para quitar repetidos
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cobertura(data){
	console.log(data);
	arreglo_cla 	=  [];
	arreglo_agru 	=  [];
	arreglo_datos 	=  [];
	anios_cob 		= [];

	var Cobertura = data.Series[0].Coberturas;
	var clave_ser = data.Series[0].Clave_ser;

	// sacamos todos los años en caso de ser nacional solo se toma EUM
	anios_cob.push('Entidad');
	for (var i = 0; i < Cobertura[0].Clasificaciones.length; i++) {
		anios_cob.push(Cobertura[0].Clasificaciones[i].ValorDato.AADato_ser + '-01-01');
	}

	var Clasificaciones = Cobertura[0].Clasificaciones;

	for (var i = 0; i < Clasificaciones.length; i++) {
		arreglo_cla.push(Clasificaciones[i].Descrip_cla);
		arreglo_agru.push(Clasificaciones[i].ClaveAgrupa_ac);
	}

	//limpiamos el arreglo
	arreglo_cla = arreglo_cla.unique();
	arreglo_agru = arreglo_agru.unique();
	anios_cob = anios_cob.unique();

	for (var i = 0; i < arreglo_agru.length; i++) {
		$.ajax({
		  type: 'POST',
		  url: PathAPI + "Valores/PorCobCla",
		  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru[i]},
		  success: function( data2, textStatus, jqxhr ) {

		  		var cober_inter = data2.Series[0].Coberturas;
		  		var arreglo_datos_tem = [];
		  		for (var i = 0; i < cober_inter.length; i++) {
		  			var temporal = [];
		  			temporal.push(cober_inter[i].Descrip_cg);
		  			for (var j = 0; j < cober_inter[i].Clasificaciones.length; j++) {
		  				//varios problemas
		  				var dato_formato = cober_inter[i].Clasificaciones[j].ValorDato.Dato_Formato;
              if(dato_formato == ''){
                dato_formato = cober_inter[i].Clasificaciones[j].ValorDato.NoDatos.Codigo_nd;//'ND';
              }
		  				temporal.push(dato_formato);
		  			}
		  			arreglo_datos_tem.push(temporal)
		  		}
		  		arreglo_datos.push(arreglo_datos_tem)
		  },
		  async:false
		});
	}
	//impresion de resultado para cuando haga falta
	//console.log(arreglo_datos);
}//fin de la función

function clasificaciones(data,i){
	var clasi =  [];
	var Clasificaciones = data.Series[i].Coberturas[0].Clasificaciones;

	for (var i = 0; i < Clasificaciones.length; i++) {
		clasi.push(Clasificaciones[i].Descrip_cla);
	}
	clasi = clasi.unique();
	return clasi;
}

// function clasificaciones(data,i){
// 	var clasiT =  [];
//   var clasiH = [];
//   var clasiM = [];
// 	var Clasificaciones = data.Series[i].Coberturas[0].Clasificaciones;
//
// 	for (var i = 0; i < Clasificaciones.length; i++) {
// //console.log('Log del ClaveAgrupa_ac');
// //console.log(Clasificaciones[i].ClaveAgrupa_ac.indexOf("1300100"));
//     // Para Total
//     if (Clasificaciones[i].ClaveAgrupa_ac.indexOf("1300100") != -1){
//       //Guarda Total
//       clasiT.push(Clasificaciones[i].Descrip_cla);
//       console.log('Total');
//       console.log(Clasificaciones[i].Descrip_cla);
//     }else if (Clasificaciones[i].ClaveAgrupa_ac.indexOf("1300200") != -1) {
//       // Guarda Hombre
//       clasiH.push(Clasificaciones[i].Descrip_cla);
//       console.log('Hombre');
//       console.log(Clasificaciones[i].Descrip_cla);
//     }else if (Clasificaciones[i].ClaveAgrupa_ac.indexOf("1300300") != -1) {
//       //Guarda Mujer
//       clasiM.push(Clasificaciones[i].Descrip_cla);
//       console.log('Mujer');
//       console.log(Clasificaciones[i].Descrip_cla);
//     }
// 	}
// 	// clasiT = clasiT.unique();
//   // clasiH = clasiH.unique();
//   // clasiM = clasiM.unique();
//
//
//   console.log(",,,,,,,,,,,,,,,,,,CLASI............");
//   console.log(clasiT);
//   console.log(clasiH);
//   console.log(clasiM);
// 	return clasiT, clasiH, clasiM;
// }

function agrupaciones(data,i){
	var claso =  [];
	var Agrupaciones = data.Series[i].Coberturas[0].Clasificaciones[0].ClaveAgrupa_ac;

	for (var i = 0; i < Agrupaciones.length; i++) {
		claso.push(Agrupaciones[i].Descrip_cla);
	}
	claso = claso.unique();
	return claso;
}

function cobertura_series(data,i){
	var	arreglo_cla2 =  [];
	var	arreglo_agru2 =  [];
	var	arreglo_datos2 =  [];
	var	anios_cob2 = [];

	var Cobertura = data.Series[i].Coberturas;
	var clave_ser = data.Series[i].Clave_ser;

	// sacamos todos los años en caso de ser nacional solo se toma EUM
	anios_cob2.push('Entidad');
	for (var i = 0; i < Cobertura[0].Clasificaciones.length; i++) {
		anios_cob2.push(Cobertura[0].Clasificaciones[i].ValorDato.AADato_ser + '-01-01');
	}

	var Clasificaciones = Cobertura[0].Clasificaciones;

	for (var i = 0; i < Clasificaciones.length; i++) {
		arreglo_cla2.push(Clasificaciones[i].Descrip_cla);
		arreglo_agru2.push(Clasificaciones[i].ClaveAgrupa_ac);
	}

	//limpiamos el arreglo
	arreglo_cla2 = arreglo_cla.unique();
	arreglo_agru2 = arreglo_agru.unique();
	anios_cob2 = anios_cob.unique();

	for (var i = 0; i < arreglo_agru2.length; i++) {
		$.ajax({
		  type: 'POST',
		  url: PathAPI + "Valores/PorCobCla",
		  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru2[i]},
		  success: function( data2, textStatus, jqxhr ) {

		  		var cober_inter = data2.Series[0].Coberturas;
		  		var arreglo_datos_tem2 = [];
		  		for (var i = 0; i < cober_inter.length; i++) {
		  			var temporal2 = [];
		  			temporal2.push(cober_inter[i].Descrip_cg);
		  			for (var j = 0; j < cober_inter[i].Clasificaciones.length; j++) {
		  				var dato_formato = cober_inter[i].Clasificaciones[j].ValorDato.Dato_Formato;
              if(dato_formato == ''){
                dato_formato = cober_inter[i].Clasificaciones[j].ValorDato.NoDatos.Codigo_nd;//'ND';
              }
		  				temporal2.push(dato_formato);
		  			}
		  			arreglo_datos_tem2.push(temporal2)
		  		}
		  		arreglo_datos2.push(arreglo_datos_tem2)
		  },
		  async:false
		});
	}
	return arreglo_datos2;
}//fin de la función

function cobertura_101(data){

	arreglo_cla 	=  [];
	arreglo_agru 	=  [];
	arreglo_datos 	=  [];
	anios_cob 		=  [];

	var Cobertura = data.Series[0].Coberturas;
	var clave_ser = data.Series[0].Clave_ser;

	// sacamos todos los años en caso de ser nacional solo se toma EUM
	anios_cob.push('Entidad');
	for (var i = 0; i < Cobertura[0].Clasificaciones.length; i++) {
		anios_cob.push(Cobertura[0].Clasificaciones[i].ValorDato.AADato_ser + '-01-01');
	}

	var Clasificaciones = Cobertura[0].Clasificaciones;

	for (var i = 0; i < Clasificaciones.length; i++) {
		arreglo_cla.push(Clasificaciones[i].Descrip_cla);
		arreglo_agru.push(Clasificaciones[i].ClaveAgrupa_ac);
	}

	//limpiamos el arreglo
	arreglo_cla = arreglo_cla.unique();
	arreglo_agru = arreglo_agru.unique();
	anios_cob = anios_cob.unique();

	for (var i = 0; i < arreglo_agru.length; i++) {
		if(i < 5){
			$.ajax({
			  type: 'POST',
			  url: PathAPI + "Valores/PorCobCla",
			  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru[i]},
			  success: function( data2, textStatus, jqxhr ) {
			  	console.log(data2);
			  		var cober_inter = data2.Series[0].Coberturas;
			  		var arreglo_datos_tem = [];
			  		for (var j = 0; j < cober_inter.length; j++) {
			  			console.log(cober_inter[j]);
			  			var temporal = [];
			  			temporal.push(cober_inter[j].Descrip_cg);
			  			for (var k = 0; k < cober_inter[j].Clasificaciones.length; k++) {
			  				//varios problemas
			  				var dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.Dato_Formato;
                if(dato_formato == ''){
                  dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.NoDatos.Codigo_nd;//'ND';
                }
			  				temporal.push(dato_formato);
			  			}
			  			arreglo_datos_tem.push(temporal)
			  		}
			  		arreglo_datos.push(arreglo_datos_tem)
			  },
			  async:false
			});
		}else if(i > 4 && i < 10){
			$.ajax({
			  type: 'POST',
			  url: PathAPI + "Valores/PorCobCla",
			  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru[i]},
			  success: function( data2, textStatus, jqxhr ) {
			  	console.log(data2);
			  		var cober_inter = data2.Series[0].Coberturas;
			  		var arreglo_datos_tem = [];
			  		for (var j = 0; j < cober_inter.length; j++) {
			  			console.log(cober_inter[j]);
			  			var temporal = [];
			  			temporal.push(cober_inter[j].Descrip_cg);
			  			for (var k = 0; k < cober_inter[j].Clasificaciones.length; k++) {
			  				//varios problemas
			  				var dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.Dato_Formato;
                if(dato_formato == ''){
                  dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.NoDatos.Codigo_nd;//'ND';
                }
			  				temporal.push(dato_formato);
			  			}
			  			arreglo_datos_tem.push(temporal)
			  		}
			  		arreglo_datos_hombre.push(arreglo_datos_tem)
			  },
			  async:false
			});
		}else{
			$.ajax({
			  type: 'POST',
			  url: PathAPI + "Valores/PorCobCla",
			  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru[i]},
			  success: function( data2, textStatus, jqxhr ) {
			  	console.log(data2);
			  		var cober_inter = data2.Series[0].Coberturas;
			  		var arreglo_datos_tem = [];
			  		for (var j = 0; j < cober_inter.length; j++) {
			  			console.log(cober_inter[j]);
			  			var temporal = [];
			  			temporal.push(cober_inter[j].Descrip_cg);
			  			for (var k = 0; k < cober_inter[j].Clasificaciones.length; k++) {
			  				//varios problemas
			  				var dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.Dato_Formato;
                if(dato_formato == ''){
                  dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.NoDatos.Codigo_nd;//'ND';
                }
			  				temporal.push(dato_formato);
			  			}
			  			arreglo_datos_tem.push(temporal)
			  		}
			  		arreglo_datos_mujeres.push(arreglo_datos_tem)
			  },
			  async:false
			});
		}

	}

	console.log(arreglo_datos);
	console.log(arreglo_datos_hombre);
	console.log(arreglo_datos_mujeres);
}




function cobertura_101_insumos(data,serie){

	arreglo_cla_insumos 	=  [];
	arreglo_agru_insumos 	=  [];
	arreglo_datos_insumos 	=  [];
	anios_cob_insumos 		=  [];

	var Cobertura = data.Series[serie].Coberturas;
	var clave_ser = data.Series[serie].Clave_ser;

	// sacamos todos los años en caso de ser nacional solo se toma EUM
	anios_cob_insumos .push('Entidad');
	for (var i = 0; i < Cobertura[0].Clasificaciones.length; i++) {
		anios_cob_insumos .push(Cobertura[0].Clasificaciones[i].ValorDato.AADato_ser + '-01-01');
	}

	var Clasificaciones = Cobertura[0].Clasificaciones;

	for (var i = 0; i < Clasificaciones.length; i++) {
		arreglo_cla_insumos.push(Clasificaciones[i].Descrip_cla);
		arreglo_agru_insumos.push(Clasificaciones[i].ClaveAgrupa_ac);
	}

	//limpiamos el arreglo
	arreglo_cla_insumos = arreglo_cla_insumos.unique();
	arreglo_agru_insumos = arreglo_agru_insumos.unique();
	anios_cob_insumos  = anios_cob_insumos .unique();

	for (var i = 0; i < arreglo_agru_insumos.length; i++) {
		if(i < 5){
			$.ajax({
			  type: 'POST',
			  url: PathAPI + "Valores/PorCobCla",
			  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru_insumos[i]},
			  success: function( data2, textStatus, jqxhr ) {
			  	console.log(data2);
			  		var cober_inter = data2.Series[0].Coberturas;
			  		var arreglo_datos_tem = [];
			  		for (var j = 0; j < cober_inter.length; j++) {
			  			console.log(cober_inter[j]);
			  			var temporal = [];
			  			temporal.push(cober_inter[j].Descrip_cg);
			  			for (var k = 0; k < cober_inter[j].Clasificaciones.length; k++) {
			  				//varios problemas
			  				var dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.Dato_Formato;
                if(dato_formato == ''){
                  dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.NoDatos.Codigo_nd;//'ND';
                }
			  				temporal.push(dato_formato);
			  			}
			  			arreglo_datos_tem.push(temporal)
			  		}
			  		arreglo_datos_insumos.push(arreglo_datos_tem)
			  },
			  async:false
			});
		}else if(i > 4 && i < 10){
			$.ajax({
			  type: 'POST',
			  url: PathAPI + "Valores/PorCobCla",
			  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru_insumos[i]},
			  success: function( data2, textStatus, jqxhr ) {
			  	console.log(data2);
			  		var cober_inter = data2.Series[0].Coberturas;
			  		var arreglo_datos_tem = [];
			  		for (var j = 0; j < cober_inter.length; j++) {
			  			console.log(cober_inter[j]);
			  			var temporal = [];
			  			temporal.push(cober_inter[j].Descrip_cg);
			  			for (var k = 0; k < cober_inter[j].Clasificaciones.length; k++) {
			  				//varios problemas
			  				var dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.Dato_Formato;
                if(dato_formato == ''){
                  dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.NoDatos.Codigo_nd;//'ND';
                }
			  				temporal.push(dato_formato);
			  			}
			  			arreglo_datos_tem.push(temporal)
			  		}
			  		arreglo_datos_hombre_insumos.push(arreglo_datos_tem)
			  },
			  async:false
			});
		}else{
			$.ajax({
			  type: 'POST',
			  url: PathAPI + "Valores/PorCobCla",
			  data: {'PCveInd': data.ClaveInd_ser,'PAnoIni':'0', 'PAnoFin':'0', 'PCveSer': clave_ser, 'POrden':'DESC','PCveCob':'99', 'PIdioma':'ES','PCveAgrupaCla' : arreglo_agru_insumos[i]},
			  success: function( data2, textStatus, jqxhr ) {
			  	console.log(data2);
			  		var cober_inter = data2.Series[0].Coberturas;
			  		var arreglo_datos_tem = [];
			  		for (var j = 0; j < cober_inter.length; j++) {
			  			console.log(cober_inter[j]);
			  			var temporal = [];
			  			temporal.push(cober_inter[j].Descrip_cg);
			  			for (var k = 0; k < cober_inter[j].Clasificaciones.length; k++) {
			  				//varios problemas
			  				var dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.Dato_Formato;
                if(dato_formato == ''){
                  dato_formato = cober_inter[j].Clasificaciones[k].ValorDato.NoDatos.Codigo_nd;//'ND';
                }
			  				temporal.push(dato_formato);
			  			}
			  			arreglo_datos_tem.push(temporal)
			  		}
			  		arreglo_datos_mujeres_insumos.push(arreglo_datos_tem)
			  },
			  async:false
			});
		}
	}

	console.log(arreglo_datos_insumos);
	console.log(arreglo_datos_hombre_insumos);
	console.log(arreglo_datos_mujeres_insumos);
}
