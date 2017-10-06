// $(document).ready(function(){
//   $.ajax({
//     type: 'POST',
//     url: "http://agenda2030.mx/datos/api/Valores/PorClave",
//     data: {'PCveInd': 210,'PAnoIni':'0', 'PAnoFin':'0', 'POrden':'DESC', 'PIdioma':'ES'},
//     success: function( data, textStatus, jqxhr ) {
//       CoClanidada(data);
//     },
//     async:false
//   });
// });

//ultimo indicador
//210
//funcion para quitar repetidos
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

//tabla para cobertura series
function tablaCoS(data){
  var tabuladoCoS =  '<table class="striped tablaArmada"><thead><tr>';
  var cabezera =  false;
  console.log(data);
  for (var i = 0; i < data.Coberturas.length; i++) {

    //tomamos las cabezeras, años del primer dato
    if(!cabezera){
      tabuladoCoS += '<th> Entidad Federativa </th>';
      for (var j = 0; j < data.Coberturas[i].ValorDato.length; j++) {
        if(data.Coberturas[i].ValorDato[j].Leyenda_ser == '' || data.Coberturas[i].ValorDato[j].Leyenda_ser == null){
          tabuladoCoS += '<th>' + data.Coberturas[i].ValorDato[j].AADato_ser + '</th>';
        }else{
          tabuladoCoS += '<th>' + data.Coberturas[i].ValorDato[j].Leyenda_ser + '</th>';
        }

      }//fin for j
      cabezera = true;
    }

    tabuladoCoS += '</tr></thead><tr><td>' +  '<span style="display:none;">'+data.Coberturas[i].ClaveCobGeo_cg+ '</span>' + data.Coberturas[i].Descrip_cg +'</td>';
    for (var j = 0; j < data.Coberturas[i].ValorDato.length; j++) {
      if(data.Coberturas[i].ValorDato[j].Dato_Formato == ""){
        tabuladoCoS += '<td style="text-align:right;"> '+ data.Coberturas[i].ValorDato[j].NoDatos.Codigo_nd +' </td>';
      }else{
        tabuladoCoS += '<td style="text-align:right;">' + data.Coberturas[i].ValorDato[j].Dato_Formato + '</td>';
      }
    }//fin for j
    tabuladoCoS += '</tr>';
  }//fin for i
    tabuladoCoS += '</table>';

    //$('#tabla').html(tabuladoCoS);
    return tabuladoCoS;
}//fin funcion

function tablaCoCl(data){
  var tabuladoCoCl  =  '';
  var cabezera      =  false;
  var years         =  [];

  for (var i = 0; i < data.Coberturas.length; i++) {
    if(!cabezera){
      var total_columnas = 0;
      //tabuladoCoCl  +=  '<tr><th rowspan="2"> Entidades federativas </th>';
      tabuladoCoCl  +=  '<tr>';
      for (var j = 0; j < data.Coberturas[i].Clasificaciones.length; j++) {
        years.push(data.Coberturas[i].Clasificaciones[j].ValorDato.AADato_ser);

        tabuladoCoCl  +=  '<th> ' + data.Coberturas[i].Clasificaciones[j].Descrip_cla + '</th>';

        total_columnas++;
      }//fin for j

      tabuladoCoCl  +=  '</tr></thead>';
      years = years.unique();
      cabezera = true;
      var subTabulado = '<table class="tablaArmada striped "><thead><tr><th rowspan="2"> Entidad Federativa</th>';
      var sizeYear =  total_columnas/years.length;
      for (var k = 0; k < years.length; k++) {
        subTabulado +=  '<th colspan="'+ sizeYear +'">' + years[k] +'</th>'
      }//fin for k
      subTabulado += '</tr>';

      tabuladoCoCl =   subTabulado +' '+ tabuladoCoCl;
    }//fin if condicion cabezera

    tabuladoCoCl   +=  '<tr ><td>' +  '<span style="display:none;">'+data.Coberturas[i].ClaveCobGeo_cg+ '</span>' + data.Coberturas[i].Descrip_cg +'</td>';
    for (var j = 0; j < data.Coberturas[i].Clasificaciones.length; j++) {
      if(data.Coberturas[i].Clasificaciones[j].ValorDato.Dato_Formato == ""){
        tabuladoCoCl   +=  '<td style="text-align:right;"> '+ data.Coberturas[i].Clasificaciones[j].ValorDato.NoDatos.Codigo_nd +' </td>';
      }else{
        tabuladoCoCl   +=  '<td style="text-align:right;">'+ data.Coberturas[i].Clasificaciones[j].ValorDato.Dato_Formato +'</td>';
      }
    }//fin for j
      tabuladoCoCl   += '</tr>';
  }//fin for i
    tabuladoCoCl   += '</table>';
    //$('#tabla').html(tabuladoCoCl);
    return tabuladoCoCl;
}//fin de la funsion

function AClanidada(data){
  var labelYear = '';
  var tabuladoAnidado =  '';
  var subTabuladoAnidado =  '<table class="tablaArmada2 centered striped "><thead>';
  var primera = true;
  var cabezera =  false;
  var labels   = [];

  for (var i = 0; i < data.Coberturas[0].Clasificaciones.length; i++) {
    labels.push(data.Coberturas[0].Clasificaciones[i].Descrip_cla);

    if(labelYear == data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser){
        tabuladoAnidado += '<td style="text-align:right;">' + data.Coberturas[0].Clasificaciones[i].ValorDato.Dato_Formato + '</td>';
    }else if(primera){
      primera=false;
      tabuladoAnidado += '<tr><td style="text-align:right;">'+ data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser +'</td><td style="text-align:right;">'+data.Coberturas[0].Clasificaciones[i].ValorDato.Dato_Formato+'</td>';
      labelYear = data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser;
    }
    else{
      tabuladoAnidado += '</tr><tr><td>'+ data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser +'</td><td style="text-align:right;">'+data.Coberturas[0].Clasificaciones[i].ValorDato.Dato_Formato+'</td>';
      labelYear = data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser;
    }
  }//fin for i
  tabuladoAnidado +=  '</tr></table>';
  labels =  labels.unique();
  subTabuladoAnidado += '<tr><td rowspan="2">Periodo</td><td colspan="'+ labels.length +'">Total</td><td colspan="'+ labels.length +'">Hombres</td><td colspan="'+ labels.length +'">Mujeres</td></tr>'
  subTabuladoAnidado += '<tr>';
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < labels.length; j++) {
        subTabuladoAnidado += '<td style="text-align:right;">'+labels[j]+'</td>';
    }
  }
  subTabuladoAnidado += '</tr></thead>';
  tabuladoAnidado = subTabuladoAnidado + tabuladoAnidado;
  //$('#tabla').html(tabuladoAnidado);
  return tabuladoAnidado;
}

function tablaACl(data){
  var labelYear = '';
  var tabuladoAnidado =  '';
  var subTabuladoAnidado =  '<table class="striped tablaArmada"><thead>';
  var primera = true;
  var cabezera =  false;
  var labels   = [];

  for (var i = 0; i < data.Coberturas[0].Clasificaciones.length; i++) {

    labels.push(data.Coberturas[0].Clasificaciones[i].Descrip_cla);

    if(labelYear == data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser){
        tabuladoAnidado += '<td style="text-align:right;">' + data.Coberturas[0].Clasificaciones[i].ValorDato.Dato_Formato + '</td>';
    }else if(primera){
      primera=false;
      tabuladoAnidado += '<tr><td>'+ data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser +'</td><td style="text-align:right;">'+data.Coberturas[0].Clasificaciones[i].ValorDato.Dato_Formato+'</td>';
      labelYear = data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser;
    }
    else{
      tabuladoAnidado += '</tr><tr><td>'+ data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser +'</td><td style="text-align:right;">'+data.Coberturas[0].Clasificaciones[i].ValorDato.Dato_Formato+'</td>';
      labelYear = data.Coberturas[0].Clasificaciones[i].ValorDato.AADato_ser;
    }
  }//fin for i
  tabuladoAnidado +=  '</tr></table>';

  labels =  labels.unique();

  subTabuladoAnidado += '<tr><td>Periodo</td>';

    for (var j = 0; j < labels.length; j++) {
        subTabuladoAnidado += '<td style="text-align:right;">'+labels[j]+'</td>';
    }

  subTabuladoAnidado += '</tr></thead>';
  tabuladoAnidado = subTabuladoAnidado + tabuladoAnidado;
  //$('#tabla').html(tabuladoAnidado);
  return tabuladoAnidado;
}

function tablaAS(data){
  var tabuladoAS =  '<table class="tablaArmada centered striped "><thead><tr><th>Periodo</th><th>'+ data.Descrip_ser +'</th></tr></thead>';
  for (var i = 0; i < data.Coberturas.length; i++) {
    for (var j = 0; j < data.Coberturas[i].ValorDato.length; j++) {
      var terna = (data.Coberturas[i].ValorDato[j].Leyenda_ser == null || data.Coberturas[i].ValorDato[j].Leyenda_ser == '') ? data.Coberturas[i].ValorDato[j].AADato_ser : data.Coberturas[i].ValorDato[j].Leyenda_ser;

      if(data.Coberturas[i].ValorDato[j].Dato_Formato == '' || data.Coberturas[i].ValorDato[j].Dato_Formato == null){
        tabuladoAS += '<tr><td>'+ terna +'</td><td style="text-align:right;"> NA </td></tr>';
      }else{
        tabuladoAS += '<tr><td>'+ terna +'</td><td style="text-align:right;">' + data.Coberturas[i].ValorDato[j].Dato_Formato +'</td></tr>';
      }
    }//fin for J
  }//fin for i
  tabuladoAS += '</table>';
  //$('#tabla').html(tabuladoAS);
  return tabuladoAS;
}

function tablaClA(data){
  var tabuladoClA =  '<table class="tablaArmada striped"><thead><tr><th>'+ data.Descrip_ser +'</th><th>'+ data.Coberturas[0].Clasificaciones[0].ValorDato.AADato_ser+'</th></tr></thead>';
  for (var i = 0; i < data.Coberturas.length; i++) {
    for (var j = 0; j < data.Coberturas[i].Clasificaciones.length; j++) {
      if(data.Coberturas[i].Clasificaciones[j].ValorDato.Dato_Formato == "" || data.Coberturas[i].Clasificaciones[j].ValorDato.Dato_Formato == null){
        tabuladoClA += '<tr><td style="text-align:right;">'+ data.Coberturas[i].Clasificaciones[j].Descrip_cla   +'</td><td style="text-align:right;"> NA </td></tr>';
      }else{
        tabuladoClA += '<tr><td style="text-align:right;">'+ data.Coberturas[i].Clasificaciones[j].Descrip_cla   +'</td><td style="text-align:right;">' + data.Coberturas[i].Clasificaciones[j].ValorDato.Dato_Formato +'</td></tr>';
      }
    }//fin for J
  }//fin for i
  tabuladoClA += '</table>';
  // $('#tabla').html(tabuladoClA);
  return tabuladoClA;
}

function CoClanidada(data){
  var tabulado =  '';
  var subTabuladoAnidado =  '<table class="tablaArmada striped"><thead>';
  var cabezera =  false;
  var clasificaciones = [];
  var years = [];
  var clasificaciones_diferentes;

  for (var i = 0; i < data.Coberturas.length; i++) {
    if(!cabezera){
      for (var j = 0; j < data.Coberturas[i].Clasificaciones.length; j++) {
        years.push(data.Coberturas[i].Clasificaciones[j].ValorDato.AADato_ser);
        clasificaciones.push(data.Coberturas[i].Clasificaciones[j].Descrip_cla);
      }
      years = years.unique();
      clasificaciones_diferentes = clasificaciones.unique().length;

      cabezera = true;
    }

    tabulado += '<tr><td>'+  '<span style="display:none;">'+data.Coberturas[i].ClaveCobGeo_cg+ '</span>' + data.Coberturas[i].Descrip_cg + '</td>';
    for (var j = 0; j < data.Coberturas[i].Clasificaciones.length; j++) {
      if(data.Coberturas[i].Clasificaciones[j].ValorDato.Dato_Formato == ""){
        console.log(data.Coberturas[i].Clasificaciones[j].ValorDato.NoDatos.Codigo_nd);
          tabulado += '<td style="text-align:right;"> '+ data.Coberturas[i].Clasificaciones[j].ValorDato.NoDatos.Codigo_nd +' </td>';
      }else{
        tabulado += '<td style="text-align:right;">' + data.Coberturas[i].Clasificaciones[j].ValorDato.Dato_Formato + '</td>';
      }
    }
    tabulado += '</tr>' ;
  }//fin for i
  tabulado += '</table>';
  var total = ((clasificaciones.length) / clasificaciones_diferentes ) / 3;
  var a = clasificaciones.length / years.length;

  subTabuladoAnidado +=  '<tr><th rowspan="3">Entidad Federativa</th>';

  for (var i = 0; i < years.length; i++) {
    subTabuladoAnidado += '<th colspan="'+ a +'">'+ years[i]+'</th>';
  }

  subTabuladoAnidado +=  '</tr><tr>';

  for (var i = 0; i < total; i++) {
      subTabuladoAnidado +=  '<th colspan="'+clasificaciones_diferentes+'">Total</th><th colspan="'+clasificaciones_diferentes+'">Hombres</th><th colspan="'+clasificaciones_diferentes+'">Mujeres</th>';
  }
  subTabuladoAnidado +=  '</tr><tr>';
  for (var i = 0; i < clasificaciones.length; i++) {
    subTabuladoAnidado +=  '<th>'+ clasificaciones [i]+'</th>';
  }

  subTabuladoAnidado +=  '</tr>';
  tabulado =  subTabuladoAnidado+'</thead>'+ tabulado;
  //$('#tabla').html(tabulado);
  return tabulado;
}
