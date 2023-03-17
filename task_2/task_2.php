<?php
// source - written from scratch

class Person {
    public string $name = "";
    public string $email = "";
    public string $age = "";

    /**
     * Init $name, $email, $age hardcoded values.
     */
    
    public function __construct(){
        $this->name = "yarden";
        $this->email = "yarden@gmail.com";
        $this->age = "28";
    }

    /**
     * get_info() - Handles concatenation of Person class props
     * @return string $result - Concatenated string of name + email + age
     */

    public function get_info(){
        $result = 
         $this->name . " " .
         $this->email . " " .
         $this->age;
        return $result;
    }
}

/* Create instance of Person class */
$obj = new Person();
/* Print get_info function results */
echo $obj->get_info();