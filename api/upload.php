<?php
header('Access-Control-Allow-Origin: *');
$target_dir = "uploads/";
$temp = explode(".", $_FILES["file"]["name"]);
$newfilename = round(microtime(true)) . '.' . end($temp);
$target_file = $target_dir . $newfilename;
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["file"]["tmp_name"]);
  if($check !== false) {
  echo json_encode(array("message"=>"File is an image - " . $check["mime"] . ".","status_code"=>400));
    $uploadOk = 1;
  } else {
  echo json_encode(array("message"=>"File is not an image.","status_code"=>400));
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
	echo json_encode(array("message"=>"Sorry, file already exists.","status_code"=>400));
	$uploadOk = 0;
}

// Check file size
if ($_FILES["file"]["size"] > 50000000) {
	echo json_encode(array("message"=>"Sorry, your file is too large.","status_code"=>400));
    $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
	echo json_encode(array("message"=>"Sorry, only JPG, JPEG, PNG & GIF files are allowed.","status_code"=>400));
	$uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
	//echo json_encode(array("message"=>"Sorry, your file was not uploaded.","status_code"=>400));
// if everything is ok, try to upload file
} else {
$temp = explode(".", $_FILES["file"]["name"]);
$newfilename = round(microtime(true)) . '.' . end($temp);
  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
	echo json_encode(array("message"=>"The file has been uploaded.","status_code"=>200,"result"=>$newfilename));
  } else {
  echo json_encode(array("message"=>"Sorry, there was an error uploading your file.","status_code"=>400));
  }
}
?>