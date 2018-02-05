<?php
// Check for empty fields
/*if(empty($_POST['name'])      ||
   empty($_POST['firstname'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['arrival'])   ||
   empty($_POST['departure'])       ||
   empty($_POST['room'])     ||
   empty($_POST['numberRoom'])     ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }*/
	
$name = $_POST['name'];
$firstname = $_POST['firstname'];
$phone = $_POST['phone'];
$arrival = $_POST['arrival'];
$departure = $_POST['departure'];
$email_address = $_POST['email'];
$room = $_POST['room'];
$numberRoom = $_POST['numberRoom'];
	
// Create the email and send the message
$to = 'ondzoungabruce@hotmail.fr'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Reservation chambre RHM Form:  $name";
$email_body = "Vous avez reçu une demande de réservation de la part d'un client.\n\n"."Voici les détails:\n\Nom: $name \n\n Prenom: $firstname\n\nEmail: $email_address\n\nPhone: $phone\n\n\n\n Type de chambre: $room\n\n QUantité: $numberRoom\n\n Date d'arrivé: $arrival\n\n Date de départ: $departure";
$headers = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>