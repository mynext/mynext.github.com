<?php

/**
 * Define the email witch send the email written by the user
 */ 
define('TO', 'your@email.com'); 

/**
 * Define the from email
 */ 
define('FROM', 'noreply@email.com'); 

/**
 * define the body of the email. You can add some shortcode, with this format: %ID%
 * 
 * ID = the id have you insert on the html markup.
 * 
 * e.g.
 * <input type="text" name="email" />
 *       
 * You can add on BODY, this:
 * email: %email%   
 */ 
define('BODY', 'This email is been sent by %name%, email %email%.<br /><br />%message%');
    
// NO NEED EDIT
function sendemail() 
{
	if ( isset( $_POST['action'] ) AND $_POST['action'] == 'send' ) 
	{
	    $body = BODY;
	    
	    if( !is_string( $_POST['name'] ) OR $_POST['name'] == '' )
	    	return '<p class="error">Insert correct name</p>';
	    
	    if( !is_email( $_POST['email'] ) OR $_POST['email'] == '' ) 
	    	return '<p class="error">Insert correct email</p>';
	    
	    $subject = $_POST['subject'];
	    
	    if( !is_email( $subject ) OR $subject == '' )
	    	$subject = 'Email without subject.';
	    
	    foreach( array_map( 'stripslashes', $_POST ) as $id => $var )
	    {
	    	if( $id == 'message' ) $var = nl2br($var);
			$body = str_replace( "%$id%", $var, $body );	
		}
	    
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$headers .= "From: myplace@here.com\r\n";
	
	    $sendmail = mail(TO, $subject, $body, $headers);
	         
		if ($sendmail) 
			return '<p class="success">Email sent correctly!</p>';
	    else
			return '<p class="error">An error has been encountered. Please try again.</p>';
	} 
}

function is_email($email) 
{
    if (!preg_match("/[a-z0-9][_.a-z0-9-]+@([a-z0-9][0-9a-z-]+.)+([a-z]{2,4})/" , $email))
    {
        return false;
    }
    else
    {
        return true;
    }
}                              

echo sendemail();  

?>
