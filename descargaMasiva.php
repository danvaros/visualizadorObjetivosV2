<?php

date_default_timezone_set('America/Mexico_City');
require('lib/pclzip.lib.php');

$datos = $_POST;

$indicadores = $datos['indicadores'];
$tipoSeleccion = $datos['tipoSeleccion'];
$tipoFormato = $datos['tipoFormato'];

$indicadores = split(',',$indicadores);

for ($i=1; $i < count($indicadores); $i++) {
   $otra = $indicadores[$i];
   $foo = split('ind',$otra);
   $opo[] = $foo[1];
}

if($tipoFormato == 'xls' && $tipoSeleccion == 01){
  $codigos = '';
  for ($i=0; $i < count($opo); $i++) {
    //var_dump($opo[$i]);
    //var_dump(codigoIndicador($opo[$i]));
    $codigos .= 'xlscsv/Indicador_'.codigoIndicador($opo[$i]).'.xlsx,';
  }
  $resultado =  trim($codigos, ',');

  $fecha = date('Y-m-d-His');
  $nameFile = 'Agenda2030_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}

if($tipoFormato == 'csv' && $tipoSeleccion == 01){
  $codigos = '';
  for ($i=0; $i < count($opo); $i++) {
    //var_dump($opo[$i]);
    //var_dump(codigoIndicador($opo[$i]));
    $codigos .= 'xlscsv/Indicador_'.codigoIndicador($opo[$i]).'.csv,';
  }
  $resultado =  trim($codigos, ',');

  $fecha = date('Y-m-d-His');
  $nameFile = 'Agenda2030_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}

if($tipoFormato == 'xls' && $tipoSeleccion == 02){
  $codigos = '';
  for ($i=0; $i < count($opo); $i++) {
    //var_dump($opo[$i]);
    //var_dump(codigoIndicador($opo[$i]));
    $nom1 = explode('.',codigoIndicador($opo[$i]));
    $nom2 = '';
    for ($j=0; $j < count($nom1); $j++) {
      $nom2 .= $nom1[$j].'_';
    }

    $nom3 = trim($nom2,'_');

    $codigos .= 'xlscsv/Metadato_'.$nom3.'.xlsx,';
  }
  $resultado =  trim($codigos, ',');

  $fecha = date('Y-m-d-His');
  $nameFile = 'Agenda2030_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}

if($tipoFormato == 'csv' && $tipoSeleccion == 02){
  $codigos = '';
  for ($i=0; $i < count($opo); $i++) {
    //var_dump($opo[$i]);
    //var_dump(codigoIndicador($opo[$i]));
    $nom1 = explode('.',codigoIndicador($opo[$i]));
    $nom2 = '';
    for ($j=0; $j < count($nom1); $j++) {
      $nom2 .= $nom1[$j].'_';
    }

    $nom3 = trim($nom2,'_');

    $codigos .= 'xlscsv/Metadato_'.$nom3.'.csv,';
  }
  $resultado =  trim($codigos, ',');

  $fecha = date('Y-m-d-His');
  $nameFile = 'Agenda2030_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}

if($tipoFormato == 'xls' && $tipoSeleccion == 03){
  $codigos = '';
  for ($i=0; $i < count($opo); $i++) {
    //var_dump($opo[$i]);
    //var_dump(codigoIndicador($opo[$i]));
    for ($j=0; $j < count(datoscalculo($opo[$i])); $j++) {
      $f = $j + 1;
      $codigos .= 'xlscsv/DatosCalculo_T'.$f.'_'.codigoIndicador($opo[$i]).'.xlsx,';
    }
  }
  $resultado =  trim($codigos, ',');

  $fecha = date('Y-m-d-His');
  $nameFile = 'Agenda2030_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}

if($tipoFormato == 'csv' && $tipoSeleccion == 03){
  $codigos = '';
  for ($i=0; $i < count($opo); $i++) {
    //var_dump($opo[$i]);
    //var_dump(codigoIndicador($opo[$i]));
    for ($j=0; $j < count(datoscalculo($opo[$i])); $j++) {
      $f = $j + 1;
      $codigos .= 'xlscsv/DatosCalculo_T'.$f.'_'.codigoIndicador($opo[$i]).'.csv,';
    }
  }
  $resultado =  trim($codigos, ',');

  $fecha = date('Y-m-d-His');
  $nameFile = 'Agenda2030_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}


function codigoIndicador($indicador){
  // create curl resource
        $ch = curl_init();

        $data = array (
            "PCveInd" => $indicador,
            "PIdioma" => "ES"
          );

          // Setup cURL
          $ch = curl_init('https://ods.org.mx/API/AtrIndicador/PorClave');
          curl_setopt_array($ch, array(
              CURLOPT_POST => TRUE,
              CURLOPT_RETURNTRANSFER => TRUE,
              CURLOPT_HTTPHEADER => array(
                  'Content-Type: application/json'
              ),
              CURLOPT_POSTFIELDS => json_encode($data)
          ));

          // Send the request
          $response = curl_exec($ch);

          // Check for errors
          if($response === FALSE){
              die(curl_error($ch));
          }

          // Decode the response
          $responseData = json_decode($response, TRUE);

          return $responseData['Codigo_des'];
}

function datoscalculo($indicador){
  // create curl resource
        $ch = curl_init();

        $data = array (
            "PCveInd" => $indicador,
            "POpcion" => "Cl",
            "PIdioma" => "ES"
          );

          // Setup cURL
          $ch = curl_init('https://ods.org.mx/API/AtrIndicador/PorDesglose');
          curl_setopt_array($ch, array(
              CURLOPT_POST => TRUE,
              CURLOPT_RETURNTRANSFER => TRUE,
              CURLOPT_HTTPHEADER => array(
                  'Content-Type: application/json'
              ),
              CURLOPT_POSTFIELDS => json_encode($data)
          ));

          // Send the request
          $response = curl_exec($ch);

          // Check for errors
          if($response === FALSE){
              die(curl_error($ch));
          }

          // Decode the response
          $responseData = json_decode($response, TRUE);

          $foo = $responseData['Serie'];

          $bar = array();
          for ($i=0; $i < count($foo); $i++) {
            if($foo[$i]['Tipo_ats'] == 'I'){
              $bar[] = $foo[$i]['DescripSer_des'];
            }
          }
          //var_dump($bar);
          return $bar;

}


function nombreIndicador($indicador){
  // create curl resource
        $ch = curl_init();

        $data = array (
            "PCveInd" => $indicador,
            "PIdioma" => "ES"
          );

          // Setup cURL
          $ch = curl_init('https://ods.org.mx/API/AtrIndicador/PorClave');
          curl_setopt_array($ch, array(
              CURLOPT_POST => TRUE,
              CURLOPT_RETURNTRANSFER => TRUE,
              CURLOPT_HTTPHEADER => array(
                  'Content-Type: application/json'
              ),
              CURLOPT_POSTFIELDS => json_encode($data)
          ));

          // Send the request
          $response = curl_exec($ch);

          // Check for errors
          if($response === FALSE){
              die(curl_error($ch));
          }

          // Decode the response
          $responseData = json_decode($response, TRUE);

          return $responseData['Codigo_des'] . " " . $responseData['DescripInd_des'];
}

function creaDoc($indicador,$tipoDato, $formato){
  // create curl resource
        $ch = curl_init();

        $data = array (
            "PCveInd" => $indicador,
            "PIdioma" => "ES",
            "PAnoIni" => 0,
            "PAnoFin" => 0,
            "POrden" => "DESC"
          );

          //$data_string = json_encode($data);
          //var_dump(json_encode($data));
          // Setup cURL
          $ch = curl_init('https://ods.org.mx/API/Valores/PorClave');
          curl_setopt_array($ch, array(
              CURLOPT_POST => TRUE,
              CURLOPT_RETURNTRANSFER => TRUE,
              CURLOPT_HTTPHEADER => array(
                  'Content-Type: application/json'
              ),
              CURLOPT_POSTFIELDS => json_encode($data)
          ));

          // Send the request
          $response = curl_exec($ch);

          // Check for errors
          if($response === FALSE){
              die(curl_error($ch));
          }

          // Decode the response
          $responseData = json_decode($response, TRUE);

          var_dump($responseData);

          // Print the date from the response
          // echo $responseData['published'];
}

function leer_contenido_completo($url){
   $fichero_url = fopen ($url, "r");
   $texto = "";
   while ($trozo = fgets($fichero_url, 1024)){
      $texto .= $trozo;
   }
   return $texto;
}

?>
