<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);

include("connection.php");
// Check connection
if(! $conn ) {
    die('Could not connect: ' . mysql_error());
}

if($_POST['query'] ){
	$query_type = $_POST['query'];
	$table_key ="";
	$table_value = "";
	$database_name = $_POST['databasename'];
}

if($query_type == 'add'){
	
	foreach($_POST['values'] as $key => $qty){
	   $table_key .= $key.",";
	   $table_value .= "'".$qty."'".",";
	}

	$table_key 		= rtrim($table_key, ',');
	$table_value 	= rtrim($table_value, ',');	
	$sql = "INSERT INTO ".$database_name."  (".$table_key.") VALUES (".$table_value.")";
	//echo $sql;
}


if($query_type == 'update'){
	
	$table_update_value = "";
	$table_update_condition = "";
	
	foreach($_POST['values'] as $key => $qty){
	   $table_update_value .= $key." = "."'".$qty."',";
	}
	
	if($_POST['condition']){
		foreach($_POST['condition'] as $key => $qty){
		   $table_update_condition .= $key." = '".$qty."'";
		}
	}

	$table_update_value 		= rtrim($table_update_value, ',');

	$table_update_condition_where = "";
	if($table_update_condition){
		$table_update_condition	= rtrim($table_update_condition, 'AND ');
		$table_update_condition_where = " WHERE ".$table_update_condition;
	}
	
	$sql = "UPDATE ".$database_name." SET ".$table_update_value.$table_update_condition_where;
    //echo $sql;
}

if($query_type == 'delete'){
	
	$table_update_condition = "";
	
	foreach($_POST['condition'] as $key => $qty){
	   $table_update_condition .= $key." = '".$qty."'";
	}
	
	$sql = "DELETE FROM ".$database_name." WHERE ".$table_update_condition;

}

if($query_type == 'fetch'){
	
	$table_update_column = "";
	$table_update_condition = "";
	
	foreach($_POST['column'] as $key => $qty){
	   $table_update_column .= $key.",";
	}
	
	if($_POST['condition'] && $_POST['condition'] != '{}'){
		foreach($_POST['condition'] as $key => $qty){
			if (is_numeric($qty))
				$table_update_condition .= $key." = '".$qty."' AND ";
			else	
				$table_update_condition .= $key." = '".$qty."' AND ";
		}
	}
	
	if($_POST['like']){
		foreach($_POST['like'] as $key => $qty){
			$table_update_condition .= $key." LIKE '%".$qty."%' AND ";
		}
	}
	
	$table_update_condition_where = "";
	if($table_update_condition){
		$table_update_condition	= rtrim($table_update_condition, 'AND ');
		$table_update_condition_where = " WHERE ".$table_update_condition;
	}
	
	$table_update_column	= rtrim($table_update_column, ',');
	
	$sql = "SELECT ".$table_update_column." FROM ".$database_name.$table_update_condition_where;
	//echo $sql;
	$result = $conn->query($sql);
	
	if ($result->num_rows > 0) {
		$row = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($row);
	}else{
		echo "{}";
	}
}

if($query_type != 'fetch'){
	if ($conn->query($sql) === TRUE) {
		echo json_encode(array("status_code"=>200));
	} else {
		echo json_encode(array("status_code"=>201, "message" =>$conn->error ));
		//echo "Error: " . $sql . "<br>" . $conn->error;
	}
}
mysqli_close($conn);
?>