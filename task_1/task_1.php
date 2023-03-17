<?php

/**
 * @source - written from scratch.
 * @param string $word - contains a string.
 * @param string $repeat - num of times loop repeated
 */

function word_repeat(string $word, int $repeat) {
    $str = ""; 
    for($i = 0; $i < $repeat; $i++){
        $str .= $word;
    }
    return $str;
}

/* How to use */
echo word_repeat("hello" , 25);
