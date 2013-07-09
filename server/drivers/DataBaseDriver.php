<?

/**
 * CREATE TABLE  `demos`.`Messages` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`content` TEXT NOT NULL ,
	`type` TINYINT NOT NULL COMMENT  'base64/text',
	`created_at` TIMESTAMP NOT NULL
	) ENGINE = MYISAM COMMENT =  'This table manages the messages module.';
 */

require("DB.php");

/**
 * This is the fetcher driver to manage the queue messages from the database
 * @author   @manduks
 */

class DataBaseDriver { 
    private $db = '';     
    
    function DataBaseDriver($bd = 'demos', $server = '127.0.0.1', $user = 'root', $pass =  '') { 
        $this->db = new DB($bd,$server,$user,$pass);
    } 
    /**
     * this method inserts a message into the db
     * @param  Message $message the message object
     * @return boolen       true if the operation was succesfull
     */
    function insertMessage($message){       
        $result = $this->db->query("INSERT INTO  Messages (id ,content ,type ,created_at)
                            VALUES (NULL,'$message->content',$message->type,CURRENT_TIMESTAMP);");
        return $result ? true : false;
    }
    /**
     * This method gets a message (first/last), and it will deleted if required
     * @param  boolean $delete      true if want to delete the message, default true
     * @param  boolean $lastMessage the order we want to get the message, by default it returns the last message inserted
     * @return object               the record or message oject
     */
    function getMessage($delete = true, $lastMessage = true){
        $order = $lastMessage ? 'ASC' : 'DESC';
        $record = $this->db->query("SELECT * FROM Messages ORDER BY id {$order} LIMIT 1;");        
        $record = $this->db->fetchNextObject($record);
        if($delete){
            $this->db->query("DELETE FROM Messages WHERE id = '{$record->id}' ");
        }        
        return $record;
    }
} 
?>