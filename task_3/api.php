<?php 

// Contains request data
$json = file_get_contents("php://input");
// In case request sent
if(!empty($json)){
    // Convert data to associative array
    $data = json_decode($json, true);
    // If not empty data, read csv file and send data to client.
    if(isset($data) && !empty($data)){
        echo json_encode(parse_csv("test.csv"), true);
    }
}

/** 
 * @param string $path -  Contains csv file path.
 * parse_csv() handles reading csv file and and stored in array
 */

function parse_csv(string $path){
    $csv_file = fopen($path, "r");
    $line = 0;
    $result = [];
    // Iterate over every line of the file
    while (($raw_string = fgets($csv_file)) !== false) {
        $row = str_getcsv($raw_string);
        $result[$line] = $row;
        $line++;
    }
    fclose($csv_file);
    return $result;
}