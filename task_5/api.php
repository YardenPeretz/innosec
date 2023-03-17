<?php
include '../task_4/validations.php';

// source - written from scratch.

/**
 * REST function will accept client requests, store in db,
 * and response to the client
 * @return json data back to the client.
 */

 function REST(){
    if(!empty($_POST["data"])){
        $data = $_POST["data"];
        $username = $data["username"];
        $email = $data["email"];
    
        if(username_validation($username) && email_validation($email)){
            insert_user_data(db_conn(), $username, $email);
            echo json_encode([
                "username" => $username,
                "email" => $email,
                "status" => "Valid username and password",
                "db" => db_conn()
            ], true);
        }else{
            echo json_encode([
                "status" => "something is wrong with username or email"
            ]);
        }
    }
 }

 /**
  * @return obj $conn
  */

function db_conn(){
    try {
        $conn = new PDO("mysql:host=localhost;dbname=innosec", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
      } catch(PDOException $e) {
        return "failed: " . $e->getMessage();
      }
}

/**
 * Insert user data to `users` table
 * @param object $conn - DB connection object
 * @param string $name - client username
 * @param string $email - client email
 */
function insert_user_data(object $conn, string $name, string $email){
    $query = "INSERT INTO users (name, email) VALUES (?,?)";
    $prep = $conn->prepare($query);
    $prep->execute([$name, $email]);
}

/* Execute REST() */
REST();