
<?php
date_default_timezone_set("Asia/Bangkok");
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

if($_SERVER['SERVER_NAME'] == "localhost"){//Demo Ips
define('HOSTNAME','localhost');
define('DB_USERNAME','root');
define('DB_PASSWORD','');
define('DB_NAME', 'glowmedi_nellai');
} else {
define('HOSTNAME','localhost');
define('DB_USERNAME','glowmedi_nellai');
define('DB_PASSWORD','SnxOX9y5V%0!');
define('DB_NAME', 'glowmedi_nellai');
}
$conn = mysqli_connect(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME) or die ("error");
// Check connection
if(mysqli_connect_errno($conn)){
    ?><script>
    var error = "Failed to connect MySQL: " .mysqli_connect_error();
   </script><?php
}	
?>