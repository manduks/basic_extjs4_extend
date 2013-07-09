<?
require("./Message.php");

/**
 * the class to manare the queue
 * @author   @manduks
 */

class Fetcher { 
	private $type;
	private $message;
	private $driver;


	/**
	 * The fetcher constructor to manage the queue of messages
	 * @param string $type   the type of the queue it can be FIFO or LIFO 
	 * @param Driver $driver the driver to manage de storing of the messages, it can be a database or memcache
	 */
    function Fetcher($type='FIFO',$driver) {
    	$this->type = $type;
    	$this->driver = $driver;
    }      

    /**
     * the function to get the message
     * @param  boolean $delete true if we want to delete the message
     * @return Message the messaje object extracted from the list
     */
    function getMessage($delete){
    	$record = $this->driver->getMessage($delete,$this->type == 'FIFO');	
		$message = new Message($record->content, $record->type);
		return $message;	
    }
    /**
     * the method to queue the message
     * @param  Message $message the 
     * @return [type]          [description]
     */
    function queueMessage($message){
    	$record = $this->driver->insertMessage($message);
    }
} 
?>