<?php

$zip = new ZipArchive();

$filename = 'DescargaMasiva.zip';

if($zip->open($filename,ZIPARCHIVE::CREATE)===true) {
        $zip->addFile('archivos/Proporción de la población que vive por debajo del umbral internacional de la pobreza, desglosada por sexo, edad, situación laboral y ubicación geográfica (urbana o rural).xls');
        $zip->addFile('archivos/DescargaMasiva.xls');
        $zip->close();
        //echo 'Creado '.$filename;
}
else {
        echo 'Error creando '.$filename;
}

?>
