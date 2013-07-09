<?
/**
 * the message class 
 * @author   @manduks
 */
class Message { 
    var $type;   //the message type base64 or ascii text
    var $content; //the content of the message

    function Message($content,$type) { 
        $this->type = $type;
        $this->content = $content;
    }      
    
} 
?>