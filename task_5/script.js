"use-strict";
// Html elements
const username = $("#username");
const email = $("#email");
const submit = $("#submit");
const validation_status = $("#validation_status");

/**
 * @endpoint - api.php
 */
$(submit).click(() => {
    const obj = {
       'username' : username.val(),
       'email' : email.val(),
    };

    $.ajax({
        type: "POST",
        url: "./api.php",
        dataType: "JSON",
        data: {"data" : obj},
        success: function(data){
          validation_status.html(data["status"])
        },
        error: function(err){
            console.log(err)
        }
    });
})

