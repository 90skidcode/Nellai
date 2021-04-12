<?php

class UpdateProject
{
    
    function Update_coloum($update){
        
        foreach($update as $key => $qty){
            if (is_numeric($qty))
                $table_update_condition .= $key." = '".$qty."' , ";
            else	
                $table_update_condition .= $key." = '".$qty."' , ";
        }
    		
    	$table_update_condition_where = "";
    	if($table_update_condition){
    		$table_update_condition	= rtrim($table_update_condition, ', ');
    	return $table_update_condition_where = $table_update_condition;
    	}
    }
    
    function general_updates($data,$conn,$where_values,$like_values)
    {
        if($data['update_coloum']){
            $update_coloums = $this->Update_coloum($data['update_coloum']);
            $sql="update ".$data['table_name']." set ".$update_coloums."".$where_values;
            if ($conn->query($sql)) {
               $updated_values_count= mysqli_affected_rows($conn);
                echo json_encode(array("message"=>"success","status_code"=>200,"affected_rows"=>$updated_values_count));
            }else{
                echo json_encode(array("message"=>"failed","status_code"=>400));
            }
        }else{
            echo json_encode(array("message"=>"Invalid coloums","status_code"=>400));
        }
    }
    
    
    function delete_request($data,$conn)
    {
        
           // $update_coloums = $this->Update_coloum($data['update_coloum']);
            $sql="UPDATE request_management SET request_status ='".$data['request_status']."',tracking_status='10' WHERE request_code='".$data['request_code']."'";
            
            if ($conn->query($sql)) {
               $updated_values_count= mysqli_affected_rows($conn);
                echo json_encode(array("message"=>"success","status_code"=>200,"affected_rows"=>$updated_values_count));
            }else{
                echo json_encode(array("message"=>"failed","status_code"=>400));
            }
        
    }
    
    
    
    function array_except($array, $keys)
    {
        
        foreach($keys as $key){
            unset($array[$key]);
        }
        return $array;
    }
    
    
    function update_employee($values,$conn)
    {
        
        // Check Grade 
            $check_res_sql = "SELECT employee_grade_id from employee_master WHERE employee_id='".$values['employee_id']."'";
            $result_details = $conn->query($check_res_sql);
            $row_res_available = $result_details->fetch_all(MYSQLI_ASSOC);
            $old_grade =  $row_res_available[0]['employee_grade_id'];
        
        $values['employee_experience'] = json_encode($values['employee_experience']);
            $newArray = $this->array_except($values, ['list_key', 'company_name', 'company_designation']);
   
            $update_coloums = $this->Update_coloum($newArray);

            $sql = "UPDATE employee_master set ".$update_coloums." WHERE employee_id='".$newArray['employee_id']."'";
        
        if ($conn->query($sql)) {
            
            if($old_grade != $values['employee_grade_id'])
            {
            $grade_sql = "select allowance,deductions from employee_grade WHERE employee_grade_id = '".$values['employee_grade_id']."'and status=1";   
            $grade_sql_result= $conn->query($grade_sql); 
            $grade_grade_available = $grade_sql_result->fetch_all(MYSQLI_ASSOC);
            
            
           $ctc_update= "update ctc_master SET allowance='".$grade_grade_available[0]['allowance']."',deductions= '".$grade_grade_available[0]['deductions']."',status = 1 WHERE employee_id='".$values['employee_id']."'";
            
            $result_ctc = $conn->query($ctc_update);
            
            }
        
             
             echo json_encode(array("message"=>"success","status_code"=>200));
        		
    	}else{
    		
    	   echo json_encode(array("message"=>"Failed in master","status_code"=>400));
    	}
        
    }
    
    
    function update_product($values,$conn)
    {
        $master_insert =array();
        $master_insert['product_code'] = $values['product_code'];
        $master_insert['quantity_limit'] = $values['quantity_limit'];
        $master_insert['product_name'] = $values['product_name'];
        $master_insert['ingredient_status'] = $values['ingredient_status'];
        $master_insert['quantity'] = $values['quantity'];
        $master_insert['product_desc'] = $values['product_desc'];
        $master_insert['quantity_type'] = $values['quantity_type'];
        $master_insert['status'] = 1;

        $update_coloums = $this->Update_coloum($master_insert);

      $sql = "UPDATE product_master set ".$update_coloums." WHERE product_code='".$master_insert['product_code']."'"; 
        if ($conn->query($sql)) {
             $i=0;
             
             if($values['ingredient_product_code']){
             $del_sql = "DELETE from ingredient_master WHERE product_code='".$values['product_code']."'";
               $conn->query($del_sql);
               
        	    foreach($values['ingredient_product_code'] as $details)
        	    {
        	        
        	     $ingredient_insert_sql = " INSERT INTO ingredient_master (product_code,ingredient_product_code,ingredient_quantity,ingredient_quantity_type) VALUES ('".$values['product_code']."','".$values['ingredient_product_code'][$i]."','".$values['ingredient_quantity'][$i]."','".$values['ingredient_quantity_type'][$i]."')";
                
                $ingredient_insert_result= $conn->query($ingredient_insert_sql);
        	       
        	    $i++;}
        }
    		
        		
        		 echo json_encode(array("message"=>"success","status_code"=>200));
    	}else{
    		
    	   echo json_encode(array("message"=>"Failed in master","status_code"=>400));
    	}
        
    }
    
    
    function update_tracking($values,$conn)
    {
       $sql = "UPDATE request_management set tracking_status = ".$values['tracking_status']." WHERE request_code='".$values['request_code']."'"; 
       
        if($conn->query($sql)) {
                
            $request_track_insert_sql = " INSERT INTO tracking_master (request_code,tracking_status,employee_id,remarks) VALUES ('".$values['request_code']."','".$values['tracking_status']."','".$values['employee_id']."','".$values['remarks']."')";
                        
            $request_track_insert_result= $conn->query($request_track_insert_sql);
        		
    		if($request_track_insert_result){
    		    echo json_encode(array("message"=>"success","status_code"=>200));
    		}else{
    		    
    		    echo json_encode(array("message"=>"Failed in details","status_code"=>400));
    		}
    	}else{
    		
    	   echo json_encode(array("message"=>"Failed in master","status_code"=>400));
    	}
    }
    
    
     function price_outlet_update($values,$conn)
    {
        
        foreach($values['product_price'] as $key_update => $value_update)
        {
            $sql = "UPDATE product_master set outlet_price ='".$value_update."' WHERE product_code='".$key_update."'"; 
           $request_track_insert_result= $conn->query($sql);
        }
        if($request_track_insert_result){
    	    	    echo json_encode(array("message"=>"success","status_code"=>200));
    	}else{
    		    
    		    echo json_encode(array("message"=>"Failed in details","status_code"=>400));
    	}
    
    }
    
    
    
    
    

}