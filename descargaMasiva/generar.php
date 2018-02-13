<?php
  $todo_ya = $_POST["todo_ya"];
  // var_dump($normal, $fondo, 'url('.$normal.')');
  //require_once("dompdf/dompdf_config.inc.php");
  //<div id="copia" style="width:800px; height:500px; background-image: url('.$normal.'), url('.$fondo.'); background-repeat: no-repeat;">Hola !!!</div>
  //<div id="copia" style="width:900px; height:600px; background-image: url('.$todo_ya.'); background-repeat: no-repeat;"></div>'.

  require_once 'dompdf/autoload.inc.php';
  use Dompdf\Dompdf;
  $html =//$this->input->post('tablas');
      '<html><head></head><body><div id="copia" style="width:100%; height:100%; background-image: url('.$todo_ya.'); background-repeat: no-repeat;"></div>'.
      '</body></html>';
  $dompdf = new Dompdf();
  $dompdf->set_paper('letter', 'landscape');
  $dompdf->loadHtml($html);
  $dompdf->render();
  //$dompdf->stream("demo");

  $pdf = $dompdf->output();
  file_put_contents("ODS.pdf", $pdf);
  var_dump($_SERVER['HTTP_HOST']);
  header("Location: http://104.236.211.149/ods/ODS.pdf");
?>
