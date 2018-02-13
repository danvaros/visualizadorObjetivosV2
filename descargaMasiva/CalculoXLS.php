<?php
ini_set('memory_limit', '256M');


function indicadores(){
  // create curl resource
        $ch = curl_init();

        $data = array (
            "PIdioma" => "ES"
          );

          // Setup cURL
          $ch = curl_init('https://ods.org.mx/v2/API/Tematica/Todos');
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

          //var_dump($responseData);
          return $responseData;
}


$bar = indicadores();
$sumaInd = 0;
$ClaveInd_arb = array();

foreach($bar as $meta){
  $indis = $meta['Meta'];
    foreach($indis as $indi){
      $india = $indi['Indicador'];

      //if($india[$i]['DesGeo']['Clave_dg'] != 3 || $india[$i]['DesGeo']['Clave_dg'] != 3){
      //if($india[$i]['ClaveInd_arb'] != 356 || $india[$i]['ClaveInd_arb'] != 357 || $india[$i]['ClaveInd_arb'] != 358 || $india[$i]['ClaveInd_arb'] != 359 || $india[$i]['ClaveInd_arb'] != 360 || $india[$i]['ClaveInd_arb'] != 361 || $india[$i]['ClaveInd_arb'] != 343){
        $indicas = count($india);
        for ($i=0; $i < $indicas; $i++) {
          if($india[$i]['ClaveInd_arb'] == 118 || $india[$i]['ClaveInd_arb'] == 356 || $india[$i]['ClaveInd_arb'] == 357 || $india[$i]['ClaveInd_arb'] == 358 || $india[$i]['ClaveInd_arb'] == 359 || $india[$i]['ClaveInd_arb'] == 360 || $india[$i]['ClaveInd_arb'] == 361 || $india[$i]['ClaveInd_arb'] == 343){

            //$ClaveInd_arb[] = $india[$i]['ClaveInd_arb'];
            //echo ' '.$india[$i]['ClaveInd_arb'].'<br/>';
          }else{
            $ClaveInd_arb[] = $india[$i]['ClaveInd_arb'];
          }
        }
      //}

      //}

    }// Foreach Indicador
}// Foreach Metas

//var_dump($ClaveInd_arb);


function datos($indicador){
  $ch = curl_init();

  $data = array (
      "PCveInd" => $indicador,
      "PAnoIni" => 0,
      "PAnoFin" => 0,
      "POrden" => "DESC",
      "PIdioma" => "ES"
    );

    // Setup cURL
    $ch = curl_init('https://ods.org.mx/v2/API/Valores/PorClave');
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

    //var_dump($responseData);
    return $responseData;
}

function clasificaciones($indicador){
  $ch = curl_init();

  $data = array (
    "PCveInd" => $indicador,
    "POpcion" => "Cl",
    "PIdioma" => "ES"
    );

    // Setup cURL
    $ch = curl_init('https://ods.org.mx/v2/API/AtrIndicador/PorDesglose');
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

    //var_dump($responseData);
    return $responseData;
}

function datosMetadato($indicador){
  $ch = curl_init();

  $data = array (
      "PCveInd" => $indicador,
      "PIdioma" => "ES"
    );

    // Setup cURL
    $ch = curl_init('https://ods.org.mx/v2/API/Metadato/PorClave');
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

    //var_dump($responseData);
    return $responseData;
}

function nombreIndicador($indicador){
  // create curl resource
        $ch = curl_init();

        $data = array (
            "PCveInd" => $indicador,
            "PIdioma" => "ES"
          );

          // Setup cURL
          $ch = curl_init('https://ods.org.mx/v2/API/AtrIndicador/PorClave');
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

function get_tabulado($indicador){

    $class = clasificaciones($indicador);

    $clasif = $class['Serie'][0]['AgrupaClas']['TotalNivAgrupa_cla'];
    //var_dump($clasif);

    $valores = datos($indicador);

    switch($valores['Series'][0]['TipoCua_ats']){
      case 'CoS':
        $t = creaXLSCoS(datos($indicador));
      break;
      case 'CoCl':
        if($clasif > 1){
          $t = creaXLSCoClAnidada(datos($indicador));
        }else{
          $t = creaXlSCoCl(datos($indicador));
        }
      break;
      case 'ACl':
        if($clasif > 1){
          $t = creaXLSAClanidada(datos($indicador));
        }else{
          $t = creaXLSACl(datos($indicador));
        }
      break;
      case 'AS':
        $t = creaXLSAS(datos($indicador));
      break;
      case 'ClA':
        $t = creaXLSClA(datos($indicador));
      break;
    }
    return $t;
}

function get_tabuladoCSV($indicador){

    $class = clasificaciones($indicador);

    $clasif = $class['Serie'][0]['AgrupaClas']['TotalNivAgrupa_cla'];
    //var_dump($clasif);

    $valores = datos($indicador);

    switch($valores['Series'][0]['TipoCua_ats']){
      case 'CoS':
        $t = creaCSVCoS(datos($indicador));
      break;
      case 'CoCl':
        if($clasif > 1){
          $t = creaCSVCoClAnidada(datos($indicador));
        }else{
          $t = creaCSVCoCl(datos($indicador));
        }
      break;
      case 'ACl':
        if($clasif > 1){
          $t = creaCSVAClanidada(datos($indicador));
        }else{
          $t = creaCSVACl(datos($indicador));
        }
      break;
      case 'AS':
        $t = creaCSVAS(datos($indicador));
      break;
      case 'ClA':
        $t = creaCSVClA(datos($indicador));
      break;
    }
    return $t;
}


//get_tabulado(26);


//$indicadorres = array(362,363,364,162,164,324,335,336,337,185,355,344,193,204,205,4,208,210,365,366,367,212,213,224,48,227,228,368,369,236,343,266,269,103,272,276,101,304,307,311,312);

//$indicadorres = array(208,210,365,366,367,212,213,224,48,227,228,368,369,236,343,266,269,103,272,276,101,304,307,311,312);

//$indicadorres = array(343,266,269,103,272,276,101,304,307,311,312);
//csv
//$indicadorres = array(208,210,365,366,367,212,213,224,48,227,228,368,369,236);

//$indicadorres = array(362,363,364,162,164,324,335,336,337,185,355,344,193,204,205,4,208,210,365,366,367,212,213,224,48,227,228,368,369,236,343,266,269,103,272,276,101,304,307,311,312);
//$indicadorres = array(1,340,341,342,2,105,118,345,26,27,23,346,347,348,349,132,333,350,351,352,353,354,140,141,334);


// ----------- Crea todos los XLS de Indicador ---------//

  for ($i=0; $i < count($ClaveInd_arb); $i++) {
    get_tabulado($ClaveInd_arb[$i]);
  }

// ----------- Crea todos los CSV de Indicador ---------//

  // for ($i=0; $i < count($ClaveInd_arb); $i++) {
  //   get_tabuladoCSV($ClaveInd_arb[$i]);
  // }


  // ----------- Crea todos los XLS de Indicador ---------//

    // for ($i=0; $i < count($ClaveInd_arb); $i++) {
    //   get_tabulado($ClaveInd_arb[$i]);
    // }

  // ----------- Crea todos los CSV de Indicador ---------//

    // for ($i=0; $i < count($ClaveInd_arb); $i++) {
    //   get_tabuladoCSV($ClaveInd_arb[$i]);
    // }


// ----------- Crea todos los XLS de Metadatos ---------//

// for ($i=0; $i < count($ClaveInd_arb); $i++) {
//   metadato(datosMetadato($ClaveInd_arb[$i]));
// }

// ----------- Crea todos los CSV de Metadatos ---------//

// for ($i=0; $i < count($ClaveInd_arb); $i++) {
//   metadatoCSV(datosMetadato($ClaveInd_arb[$i]));
// }

function abecedario($posicion){
  $arr = array();
  for($i=65; $i<=90; $i++) {
    $letra = chr($i);
    $arr[] = $letra;
  }
  for($j=65; $j<=90; $j++) {
    $letra2 = chr($j);
    $arr[] = 'A'.$letra2;
  }
  for ($k=65; $k <=90 ; $k++) {
    $letra3 = chr($k);
    $arr[] = 'B'.$letra3;
  }
  for ($l=65; $l <=90 ; $l++) {
    $letra4 = chr($l);
    $arr[] = 'C'.$letra4;
  }
  for ($m=65; $m <=90 ; $m++) {
    $letra5 = chr($m);
    $arr[] = 'D'.$letra5;
  }
  for ($n=65; $n <=90 ; $n++) {
    $letra6 = chr($n);
    $arr[] = 'E'.$letra6;
  }
  for ($o=65; $o <=90 ; $o++) {
    $letra7 = chr($o);
    $arr[] = 'F'.$letra7;
  }
  for ($p=65; $p <=90 ; $p++) {
    $letra8 = chr($p);
    $arr[] = 'G'.$letra8;
  }
  for ($q=65; $q <=90 ; $q++) {
    $letra9 = chr($q);
    $arr[] = 'H'.$letra9;
  }
  for ($r=65; $r <=90 ; $r++) {
    $letra10 = chr($r);
    $arr[] = 'I'.$letra10;
  }
  for ($s=65; $s <=90 ; $s++) {
    $letra11 = chr($s);
    $arr[] = 'J'.$letra11;
  }
  //var_dump($arr);
  return $arr[$posicion];
}

// Todas las funciones crean archivos para Datos par el cálculo
function creaXLSCoS($data){

  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){


      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';
      //include dirname(__FILE__) . 'Classes/PHPExcel/Writer/Excel2007.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
                     ->setLastModifiedBy("Daniel H. Vargas")
                     ->setTitle("Objetivo")
                     ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
                     ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
                     ->setKeywords("agenda2030 descarga masiva xls")
                     ->setCategory("Objetivos de Desarrollo Sostenible");


      //var_dump($serie);
      $objPHPExcel->setActiveSheetIndex(0);

      $objPHPExcel->setActiveSheetIndex(0)
                  ->setCellValue('A1', $serie[$i]['Descrip_ser']);

      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue('A2', 'Entidad Federativa');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.'2', $valores[$k]['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.$celda, $datoAS);

            //$objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }

        $objPHPExcel->getActiveSheet()->mergeCells('A1:'.$b.'1');
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
        echo 'File "DatosCalculo_T'.$i.'_'.$data["Codigo_ind"].'.xlsx" have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaCSVCoS($data){

  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){
      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
                     ->setLastModifiedBy("Daniel H. Vargas")
                     ->setTitle("Objetivo")
                     ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
                     ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
                     ->setKeywords("agenda2030 descarga masiva xls")
                     ->setCategory("Objetivos de Desarrollo Sostenible");

      //var_dump($serie);
      $objPHPExcel->setActiveSheetIndex(0);

      $objPHPExcel->setActiveSheetIndex(0)
                  ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);


      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Entidad Federativa');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $valores[$k]['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);


          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


        $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.csv');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));

        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaXLSCoCl($data){

  $serie = $data['Series'];


              $e = 1;
              $f = 0;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){

      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
      							 ->setLastModifiedBy("Daniel H. Vargas")
      							 ->setTitle("Objetivo")
      							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
      							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
      							 ->setKeywords("agenda2030 descarga masiva xls")
      							 ->setCategory("Objetivos de Desarrollo Sostenible");


       //var_dump($serie);
       $objPHPExcel->setActiveSheetIndex(0);

       $objPHPExcel->setActiveSheetIndex(0)
                   ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
       $objPHPExcel->setActiveSheetIndex(0)
                   ->setCellValue('A2', 'Entidad Federativa');




      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 4;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'3', $valores[$k]['Descrip_cla']);

          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);
          //var_dump($periodon);
          //var_dump($periodo);
          $d = abecedario(count($valores)+count($periodo));
          //var_dump($valorDato);
          $c = abecedario(count($valorDato)+1);


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);



          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

            //$objPHPExcel->getActiveSheet()->mergeCells($a.'2:'.$d.'2'); // Merge para periodo

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }

      $foo = count($valores) / count(array_unique($per));
       var_dump($foo);
       $bar = count($valores) / $foo;
       var_dump($bar);
       //exit();

       for ($m=0; $m < $foo; $m++) {
         $f = $f + $bar;
         $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
         $e = $f+1;
       }

     $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

     $objPHPExcel->getActiveSheet()->mergeCells('A2:A3');// Merge para Entidad Federativa


     // Rename worksheet
     //echo date('H:i:s') , " Rename worksheet" , EOL;
     $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

     // Set active sheet index to the first sheet, so Excel opens this as the first sheet
     $objPHPExcel->setActiveSheetIndex(0);

     // Save Excel 2007 file
     //echo date('H:i:s') , " Write to Excel format" , EOL;
     $callStartTime = microtime(true);

     // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
     PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

     $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
     ob_end_clean();
     //$nomArc = $data['Codigo_ind']
     $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
     // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));

     echo 'Files '.'Indicador_'.$data['Codigo_ind'].'.xlsx'.' have been created in ' , getcwd() , EOL;

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaCSVCoCl($data){

  $serie = $data['Series'];

              $e = 1;
              $f = 0;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){

      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
      							 ->setLastModifiedBy("Daniel H. Vargas")
      							 ->setTitle("Objetivo")
      							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
      							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
      							 ->setKeywords("agenda2030 descarga masiva xls")
      							 ->setCategory("Objetivos de Desarrollo Sostenible");

                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('A2', 'Entidad Federativa');


      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 4;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'3', $valores[$k]['Descrip_cla']);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          // $objPHPExcel->setActiveSheetIndex(0)
          //             ->setCellValue('A2', 'Entidad Federativa');


          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);
          //var_dump($periodon);
          //var_dump($periodo);
          $d = abecedario(count($valores)+count($periodo));
          //var_dump($valorDato);
          $c = abecedario(count($valorDato)+1);


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);



          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);
            //$objPHPExcel->getActiveSheet()->mergeCells($a.'2:'.$d.'2'); // Merge para periodo


            // $foo = count($valores) / $periodo;
            //   //var_dump(count($valorDato));
            // for ($m=1; $m < $foo; $m++) {
            //   $f = $f + $periodon;
            //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
            //   $e = $f+1;
            // }

            //  $foo = count($valores) / count(array_unique($per));
            // //  var_dump($foo);
            // //  var_dump($per);
            // for ($m=1; $m < $foo; $m++) {
            //   $f = $f + $periodon;
            //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
            //   $e = $f+1;
            // }

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }


        //  $foo = count($valores) / count(array_unique($per));
        // //  var_dump($foo);
        // //  var_dump($per);
        // for ($m=1; $m < $foo; $m++) {
        //   $f = $f + $periodon;
        //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
        //   $e = $f+1;
        // }

        $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

        $objPHPExcel->getActiveSheet()->mergeCells('A2:A3');// Merge para Entidad Federativa


        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.csv');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        $callEndTime = microtime(true);
        $callTime = $callEndTime - $callStartTime;

        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
        // Echo memory usage
        //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo memory peak usage
        //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo done
        //echo date('H:i:s') , " Done writing files" , EOL;
        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaXLSCoClAnidada($data){

  $serie = $data['Series'];

              $e = 1;
              $f = 0;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){


        /** Error reporting */
        error_reporting(E_ALL);
        ini_set('display_errors', TRUE);
        ini_set('display_startup_errors', TRUE);
        date_default_timezone_set('America/Mexico_City');

        define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

        /** Include PHPExcel */
        require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

        // Create new PHPExcel object
        //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
        $objPHPExcel = new PHPExcel();

        // Set document properties
        //echo date('H:i:s') , " Set document properties" , EOL;
        $objPHPExcel->getProperties()->setCreator("Agenda2030")
        							 ->setLastModifiedBy("Daniel H. Vargas")
        							 ->setTitle("Objetivo")
        							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
        							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
        							 ->setKeywords("agenda2030 descarga masiva xls")
        							 ->setCategory("Objetivos de Desarrollo Sostenible");


                       //var_dump($serie);
                       $objPHPExcel->setActiveSheetIndex(0);

                       $objPHPExcel->getActiveSheet()
                                   ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
                       $objPHPExcel->getActiveSheet()
                                   ->setCellValue('A2', 'Entidad Federativa');



      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 5;

        $objPHPExcel->getActiveSheet()
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.'4', $valores[$k]['Descrip_cla']);

          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);

          $d = abecedario(count($valores)+count($periodo));
          $c = abecedario(count($valorDato)+1);

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.$celda, $datoAS);
        }
      }


        $foo = count($valores) / count(array_unique($per));
         var_dump($foo);
         $bar = count($valores) / $foo;
         var_dump($bar);
         //exit();

         for ($m=0; $m < $foo; $m++) {
           $f = $f + $bar;
           //$objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
           $e = $f+1;
         }

        //$objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

        //$objPHPExcel->getActiveSheet()->mergeCells('A2:A5');// Merge para Entidad Federativa


        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;

        echo 'Files have been created in ' , getcwd() , EOL;

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaCSVCoClAnidada($data){

  $serie = $data['Series'];

              $e = 1;
              $f = 0;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){


        /** Error reporting */
        error_reporting(E_ALL);
        ini_set('display_errors', TRUE);
        ini_set('display_startup_errors', TRUE);
        date_default_timezone_set('America/Mexico_City');

        define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

        /** Include PHPExcel */
        require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

        // Create new PHPExcel object
        //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
        $objPHPExcel = new PHPExcel();

        // Set document properties
        //echo date('H:i:s') , " Set document properties" , EOL;
        $objPHPExcel->getProperties()->setCreator("Agenda2030")
        							 ->setLastModifiedBy("Daniel H. Vargas")
        							 ->setTitle("Objetivo")
        							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
        							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
        							 ->setKeywords("agenda2030 descarga masiva xls")
        							 ->setCategory("Objetivos de Desarrollo Sostenible");
                       //var_dump($serie);
                       $objPHPExcel->setActiveSheetIndex(0);

                       $objPHPExcel->setActiveSheetIndex(0)
                                   ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
                       $objPHPExcel->setActiveSheetIndex(0)
                                   ->setCellValue('A2', 'Entidad Federativa');


      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 5;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'4', $valores[$k]['Descrip_cla']);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          // $objPHPExcel->setActiveSheetIndex(0)
          //             ->setCellValue('A2', 'Entidad Federativa');


          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);
          //var_dump($periodon);
          //var_dump($periodo);
          $d = abecedario(count($valores)+count($periodo));
          //var_dump($valorDato);
          $c = abecedario(count($valorDato)+1);


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);



          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

            //$objPHPExcel->getActiveSheet()->mergeCells($a.'2:'.$d.'2'); // Merge para periodo


          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }


        $foo = count($valores) / count(array_unique($per));
         var_dump($foo);
         $bar = count($valores) / $foo;
         var_dump($bar);
         //exit();

         for ($m=0; $m < $foo; $m++) {
           $f = $f + $bar;
           $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
           $e = $f+1;
         }

        $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

        $objPHPExcel->getActiveSheet()->mergeCells('A2:A5');// Merge para Entidad Federativa


        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.csv');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        $callEndTime = microtime(true);
        $callTime = $callEndTime - $callStartTime;

        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
        // Echo memory usage
        //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo memory peak usage
        //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo done
        //echo date('H:i:s') , " Done writing files" , EOL;
        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaXLSClA($data){


  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){
      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
      							 ->setLastModifiedBy("Daniel H. Vargas")
      							 ->setTitle("Objetivo")
      							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
      							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
      							 ->setKeywords("agenda2030 descarga masiva xls")
      							 ->setCategory("Objetivos de Desarrollo Sostenible");
                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);


      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $valores[$k]['Descrip_cla']);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Grupo taxonómico');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $nn = $valores[$k]['ValorDato'];
          for ($n=0; $n < count($nn); $n++) {
            # code...
          }
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $valores[$k]['ValorDato']['AADato_ser']);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }

      $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
      // Rename worksheet
      //echo date('H:i:s') , " Rename worksheet" , EOL;
      $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

      // Set active sheet index to the first sheet, so Excel opens this as the first sheet
      $objPHPExcel->setActiveSheetIndex(0);

      // Save Excel 2007 file
      //echo date('H:i:s') , " Write to Excel format" , EOL;
      $callStartTime = microtime(true);

      // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
      PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

      $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
      ob_end_clean();
      //$nomArc = $data['Codigo_ind']
      $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
      // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
      //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
      $callEndTime = microtime(true);
      $callTime = $callEndTime - $callStartTime;

      //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
      //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
      // Echo memory usage
      //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

      // Echo memory peak usage
      //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

      // Echo done
      //echo date('H:i:s') , " Done writing files" , EOL;
      echo 'Files have been created in ' , getcwd() , EOL;
      //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }


}

function creaCSVClA($data){

  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){
      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
      							 ->setLastModifiedBy("Daniel H. Vargas")
      							 ->setTitle("Objetivo")
      							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
      							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
      							 ->setKeywords("agenda2030 descarga masiva xls")
      							 ->setCategory("Objetivos de Desarrollo Sostenible");
                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);


      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $valores[$k]['Descrip_cla']);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Grupo taxonómico');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $nn = $valores[$k]['ValorDato'];
          for ($n=0; $n < count($nn); $n++) {
            # code...
          }
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $valores[$k]['ValorDato']['AADato_ser']);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


        $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        $callEndTime = microtime(true);
        $callTime = $callEndTime - $callStartTime;

        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
        // Echo memory usage
        //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo memory peak usage
        //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo done
        //echo date('H:i:s') , " Done writing files" , EOL;
        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaXLSAS($data){

  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){
      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
      							 ->setLastModifiedBy("Daniel H. Vargas")
      							 ->setTitle("Objetivo")
      							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
      							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
      							 ->setKeywords("agenda2030 descarga masiva xls")
      							 ->setCategory("Objetivos de Desarrollo Sostenible");
                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);


      $coberturas = $serie[$i]['Coberturas'];
      $nomSerie = $serie[$i]['Descrip_ser'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $period = ($valores[$k]['Leyenda_ser'] == null || $valores[$k]['Leyenda_ser'] == '') ? $valores[$k]['AADato_ser'] : $valores[$k]['Leyenda_ser'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $period);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $nomSerie);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);


          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


        $objPHPExcel->getActiveSheet()->mergeCells('A1:B1');
        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        $callEndTime = microtime(true);
        $callTime = $callEndTime - $callStartTime;

        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
        // Echo memory usage
        //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo memory peak usage
        //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo done
        //echo date('H:i:s') , " Done writing files" , EOL;
        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaCSVAS($data){

  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){
      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
      							 ->setLastModifiedBy("Daniel H. Vargas")
      							 ->setTitle("Objetivo")
      							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
      							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
      							 ->setKeywords("agenda2030 descarga masiva xls")
      							 ->setCategory("Objetivos de Desarrollo Sostenible");
                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);



      $coberturas = $serie[$i]['Coberturas'];
      $nomSerie = $serie[$i]['Descrip_ser'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $period = ($valores[$k]['Leyenda_ser'] == null || $valores[$k]['Leyenda_ser'] == '') ? $valores[$k]['AADato_ser'] : $valores[$k]['Leyenda_ser'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $period);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $nomSerie);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }

      $objPHPExcel->getActiveSheet()->mergeCells('A1:B1');
      // Rename worksheet
      //echo date('H:i:s') , " Rename worksheet" , EOL;
      $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

      // Set active sheet index to the first sheet, so Excel opens this as the first sheet
      $objPHPExcel->setActiveSheetIndex(0);

      // Save Excel 2007 file
      //echo date('H:i:s') , " Write to Excel format" , EOL;
      $callStartTime = microtime(true);

      // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
      PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

      $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
      //$nomArc = $data['Codigo_ind']
      $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.csv');
      // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
      //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
      $callEndTime = microtime(true);
      $callTime = $callEndTime - $callStartTime;

      //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
      //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
      // Echo memory usage
      //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

      // Echo memory peak usage
      //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

      // Echo done
      //echo date('H:i:s') , " Done writing files" , EOL;
      echo 'Files have been created in ' , getcwd() , EOL;
      //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }


}

function creaXLSACl($data){


  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){

      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
                     ->setLastModifiedBy("Daniel H. Vargas")
                     ->setTitle("Objetivo")
                     ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
                     ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
                     ->setKeywords("agenda2030 descarga masiva xls")
                     ->setCategory("Objetivos de Desarrollo Sostenible");
                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);



      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        // $objPHPExcel->setActiveSheetIndex(0)
        //             ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $valores[$k]['Descrip_cla']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $celdo = $k + 3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$celdo, $valores[$k]['ValorDato']['AADato_ser']);


          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celdo, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);
          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }

        $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        $callEndTime = microtime(true);
        $callTime = $callEndTime - $callStartTime;

        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
        // Echo memory usage
        //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo memory peak usage
        //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo done
        //echo date('H:i:s') , " Done writing files" , EOL;
        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaCSVACl($data){


  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){
      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
      							 ->setLastModifiedBy("Daniel H. Vargas")
      							 ->setTitle("Objetivo")
      							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
      							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
      							 ->setKeywords("agenda2030 descarga masiva xls")
      							 ->setCategory("Objetivos de Desarrollo Sostenible");
                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);



      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        // $objPHPExcel->setActiveSheetIndex(0)
        //             ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $valores[$k]['Descrip_cla']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $celdo = $k + 3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$celdo, $valores[$k]['ValorDato']['AADato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celdo, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


        $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.csv');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        $callEndTime = microtime(true);
        $callTime = $callEndTime - $callStartTime;

        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
        // Echo memory usage
        //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo memory peak usage
        //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo done
        //echo date('H:i:s') , " Done writing files" , EOL;
        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaXLSAClanidada($data){


  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){
      /** Error reporting */
      error_reporting(E_ALL);
      ini_set('display_errors', TRUE);
      ini_set('display_startup_errors', TRUE);
      date_default_timezone_set('America/Mexico_City');

      define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

      /** Include PHPExcel */
      require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

      // Create new PHPExcel object
      //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
      $objPHPExcel = new PHPExcel();

      // Set document properties
      //echo date('H:i:s') , " Set document properties" , EOL;
      $objPHPExcel->getProperties()->setCreator("Agenda2030")
                     ->setLastModifiedBy("Daniel H. Vargas")
                     ->setTitle("Objetivo")
                     ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
                     ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
                     ->setKeywords("agenda2030 descarga masiva xls")
                     ->setCategory("Objetivos de Desarrollo Sostenible");

                     //var_dump($serie);
                     $objPHPExcel->setActiveSheetIndex(0);

                     $objPHPExcel->setActiveSheetIndex(0)
                                 ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);


      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        // $objPHPExcel->setActiveSheetIndex(0)
        //             ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $valores[$k]['Descrip_cla']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $celdo = $k + 3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$celdo, $valores[$k]['ValorDato']['AADato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celdo, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


        $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
        // Rename worksheet
        //echo date('H:i:s') , " Rename worksheet" , EOL;
        $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Save Excel 2007 file
        //echo date('H:i:s') , " Write to Excel format" , EOL;
        $callStartTime = microtime(true);

        // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
        PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        //$nomArc = $data['Codigo_ind']
        $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.xlsx');
        // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        $callEndTime = microtime(true);
        $callTime = $callEndTime - $callStartTime;

        //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
        //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
        // Echo memory usage
        //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo memory peak usage
        //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

        // Echo done
        //echo date('H:i:s') , " Done writing files" , EOL;
        echo 'Files have been created in ' , getcwd() , EOL;
        //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }

}

function creaCSVAClanidada($data){

  $serie = $data['Series'];

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'I'){


        /** Error reporting */
        error_reporting(E_ALL);
        ini_set('display_errors', TRUE);
        ini_set('display_startup_errors', TRUE);
        date_default_timezone_set('America/Mexico_City');

        define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

        /** Include PHPExcel */
        require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

        // Create new PHPExcel object
        //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
        $objPHPExcel = new PHPExcel();

        // Set document properties
        //echo date('H:i:s') , " Set document properties" , EOL;
        $objPHPExcel->getProperties()->setCreator("Agenda2030")
        							 ->setLastModifiedBy("Daniel H. Vargas")
        							 ->setTitle("Objetivo")
        							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
        							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
        							 ->setKeywords("agenda2030 descarga masiva xls")
        							 ->setCategory("Objetivos de Desarrollo Sostenible");
                       //var_dump($serie);
                       $objPHPExcel->setActiveSheetIndex(0);

                       $objPHPExcel->setActiveSheetIndex(0)
                                   ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);


      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        // $objPHPExcel->setActiveSheetIndex(0)
        //             ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $valores[$k]['Descrip_cla']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $celdo = $k + 3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$celdo, $valores[$k]['ValorDato']['AADato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celdo, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);
          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }
      $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
      // Rename worksheet
      //echo date('H:i:s') , " Rename worksheet" , EOL;
      $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

      // Set active sheet index to the first sheet, so Excel opens this as the first sheet
      $objPHPExcel->setActiveSheetIndex(0);

      // Save Excel 2007 file
      //echo date('H:i:s') , " Write to Excel format" , EOL;
      $callStartTime = microtime(true);

      // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
      PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

      $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
      //$nomArc = $data['Codigo_ind']
      $objWriter->save('xlscsv/DatosCalculo_T'.$i.'_'.$data['Codigo_ind'].'.csv');
      // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
      //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
      $callEndTime = microtime(true);
      $callTime = $callEndTime - $callStartTime;

      //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
      //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
      // Echo memory usage
      //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

      // Echo memory peak usage
      //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

      // Echo done
      //echo date('H:i:s') , " Done writing files" , EOL;
      echo 'Files have been created in ' , getcwd() , EOL;
      //var_dump($data);

    }else if($serie[$i]['Tipo_ser'] == 'R'){
      echo 'Tipo Insumo';
    }
  }


}

?>
