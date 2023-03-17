<?php
//source - https://www.w3resource.com/javascript/form/email-validation.php
//testing - https://regex101.com/

/**
 * @param string $email - string written by client
 * @return boolean $is_valid - return true/false depends on string entered
*/

function email_validation(string $email){
    $regex = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/";
    $is_valid = preg_match($regex, $email);
    return $is_valid;
}


/**
 * @param string $username - string written by client
 * @return boolean $is_valid - return true/false depends on string entered
*/

 function username_validation(string $username){
    $regex = "/^[a-zA-Z0-9]{4,}$/";
    $is_valid = preg_match($regex, $username);
    return $is_valid;
 }