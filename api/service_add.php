<?php

class InsertProject
{
    
   
    function insert_employee($values,$conn){
      
    
    $check_res_sql = "SELECT employee_id from employee_master WHERE employee_id='".$values['employee_id']."'";
        $result_details = $conn->query($check_res_sql);
        $row_res_available = $result_details->fetch_all(MYSQLI_ASSOC);

        
        if ($result_details->num_rows > 0) {
            	$row = array();
            	echo json_encode(array("message"=>"Already Exist","status_code"=>200,"result"=>$row));
             exit;
        }
        
        
     $check_emp_sql =  "select employee_id + 1 as employee_id from employee_master ORDER BY employee_master_id DESC limit 1";
     $result_emp_details = $conn->query($check_emp_sql);
        $row_emp_available = $result_emp_details->fetch_all(MYSQLI_ASSOC);
     $employee_id = $row_emp_available[0]['employee_id'];
         
    $experience_json = json_encode($values['employee_experience']);
    // Insert Employee
    $employee_insert_sql = "INSERT INTO employee_master (employee_id,employee_name,employee_dob,employee_address,employee_gender,employee_email,employee_mobile,state,city,country,pincode,aadhar_card,pancard,blood_group,place_of_birth,marital_status,employee_documents,employee_qualification_id,employee_experience,employee_designation_id,employee_grade_id,employee_joining_date,employee_reporting_to,department_id,branch_id,status,created_by
)  VALUES (".$employee_id.",'".$values['employee_name']."','".$values['employee_dob']."','".$values['employee_address']."','".$values['employee_gender']."','".$values['employee_email']."','".$values['employee_mobile']."','".$values['state']."','".$values['city']."','".$values['country']."','".$values['pincode']."','".$values['aadhar_card']."','".$values['pancard']."','".$values['place_of_birth']."','".$values['blood_group']."','".$values['marital_status']."','".$values['employee_documents']."','".$values['employee_qualification_id']."','".$experience_json."','".$values['employee_designation_id']."','".$values['employee_grade_id']."','".$values['employee_joining_date']."','".$values['employee_reporting_to']."','".$values['department_id']."','".$values['branch_id']."','1',".$values['created_by'].")";
    $employee_insert_result= $conn->query($employee_insert_sql); 
    
    
    if($employee_insert_result){
            
      $grade_sql = "select allowance,deductions from employee_grade WHERE employee_grade_id = '".$values['employee_grade_id']."'and status=1";   
        $grade_sql_result= $conn->query($grade_sql); 
        $grade_grade_available = $grade_sql_result->fetch_all(MYSQLI_ASSOC);
       
      $ctc_insert = "insert into ctc_master (employee_id,allowance,deductions,status,created_by) values ('".$employee_id."','".$grade_grade_available[0]['allowance']."','".$grade_grade_available[0]['deductions']."','1',".$values['created_by'].")";
        $result_ctc = $conn->query($ctc_insert);
           
        echo json_encode(array("message"=>"success","status_code"=>200));
        		}else{
        		    echo json_encode(array("message"=>"Failed in details","status_code"=>400));
        		}
     }
     
     
     function insert_products($values,$conn){
         
        $check_res_sql = "SELECT product_code from product_master WHERE product_code='".$values['product_code']."' AND status=1";
        $result_details = $conn->query($check_res_sql);
        $row_res_available = $result_details->fetch_all(MYSQLI_ASSOC);

        if ($result_details->num_rows > 0) {
            $row = array();
            echo json_encode(array("message"=>"Already Exist","status_code"=>200,"result"=>$row));
             exit;
        }
        
         $ingredient_status = (!empty($values['ingredient_product_code'])) ? '1': '0';
        
        
          $product_insert_sql = "INSERT INTO product_master (product_code,quantity_limit,product_name,ingredient_status,quantity,quantity_type,product_desc,status,created_by) VALUES ('".$values['product_code']."','".$values['quantity_limit']."','".$values['product_name']."','".$ingredient_status."','".$values['quantity']."','".$values['quantity_type']."','".$values['product_desc']."','1','".$values['created_by']."')";
       
        $product_insert_result= $conn->query($product_insert_sql); 
         
        if($product_insert_result){
            
            if($ingredient_status != 0)
            {
                
            $i=0;
    	    foreach($values['ingredient_product_code'] as $details)
    	    {
                $ingredient_insert_sql = " INSERT INTO ingredient_master (product_code,ingredient_product_code,ingredient_quantity,ingredient_quantity_type) VALUES ('".$values['product_code']."','".$values['ingredient_product_code'][$i]."','".$values['ingredient_quantity'][$i]."','".$values['ingredient_quantity_type'][$i]."')";
                
                $ingredient_insert_result= $conn->query($ingredient_insert_sql);
                
             $i++;}
             
            }
            echo json_encode(array("message"=>"success","status_code"=>200));
        		}else{
        		    echo json_encode(array("message"=>"Failed in details","status_code"=>400));
        		} 
    }
    
    
    
     function insert_login($values,$conn){
         
        $login_insert_sql = " INSERT INTO login_master (login_username,login_password,status,created_by) VALUES ('".$values['login_username']."','".$values['login_password']."','1','".$values['created_by']."')";
                
        $login_insert_result= $conn->query($login_insert_sql); 
        if($login_insert_result){
        echo json_encode(array("message"=>"success","status_code"=>200));
        		}else{
        		    echo json_encode(array("message"=>"Failed in details","status_code"=>400));
        		}
    }
    
    
    function insert_leave($values,$conn){
         
        $check_leave_sql = "SELECT attandance_master_id as attendence_count FROM attandance_master WHERE `attendence_date` BETWEEN '".$values['start_date']."' AND '".$values['end_date']."' AND employee_id='".$values['employee_id']."'";
        $check_leave_result= $conn->query($check_leave_sql);
         
        if ($check_leave_result->num_rows > 0) {
            	$row = array();
            	echo json_encode(array("message"=>"Already Attendence Marked","status_code"=>200,"result"=>$row));
             exit;
        } 
         
        $login_insert_sql = " INSERT INTO leave_management (employee_id,leave_master_id,no_of_days,start_date,end_date,remarks,status,created_by) VALUES ('".$values['employee_id']."','".$values['leave_master_id']."','".$values['no_of_days']."','".$values['start_date']."','".$values['end_date']."','".$values['remarks']."','1','".$values['created_by']."')";
                
        $login_insert_result= $conn->query($login_insert_sql); 
        if($login_insert_result){
        echo json_encode(array("message"=>"success","status_code"=>200));
        		}else{
        		    echo json_encode(array("message"=>"Failed in details","status_code"=>400));
        		}
    }
     
     
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
    
     
    function insert_salary($values,$conn){
          
          
    $check_res_sql = "SELECT employee_id from salary_master WHERE employee_id='".$values['employee_id']."' AND salary_month ='".$values['salary_month']."' AND salary_year='".$values['salary_year']."'";
            $result_details = $conn->query($check_res_sql);
            $row_res_available = $result_details->fetch_all(MYSQLI_ASSOC);      
          
         
        if ($result_details->num_rows <= 0) {  
             $values['salary_date'] = date("Y-m-d");
       $salary_insert_sql = " INSERT INTO salary_master (employee_id,allowance,deductions,salary_total,salary_month,salary_year,salary_date,remarks,status,created_by) VALUES ('".$values['employee_id']."','".$values['allowance']."','".$values['deductions']."','".$values['salary_total']."','".$values['salary_month']."','".$values['salary_year']."','".$values['salary_date']."','".$values['remarks']."','1','".$values['created_by']."')";
                
        $salary_insert_result= $conn->query($salary_insert_sql); 
        if($salary_insert_result){
        echo json_encode(array("message"=>"success","status_code"=>200));
        		}else{
        		    echo json_encode(array("message"=>"Failed in details","status_code"=>400));
        		}
        }else{
       
        
        $master_insert['allowance'] = $values['allowance'];
        $master_insert['deductions'] = $values['deductions'];
        $master_insert['salary_date'] = $values['salary_date'];
        $master_insert['salary_total'] = $values['salary_total'];
        $master_insert['remarks'] = $values['remarks'];
        $master_insert['status'] = 1;
        
        $update_coloums = $this->Update_coloum($master_insert);
        $sql = "UPDATE salary_master set ".$update_coloums." WHERE employee_id='".$values['employee_id']."' AND salary_month ='".$values['salary_month']."' AND salary_year='".$values['salary_year']."'"; 
            if ($conn->query($sql)) {
                
                echo json_encode(array("message"=>"success","status_code"=>200));
            }else{
                echo json_encode(array("message"=>"Failed in master","status_code"=>400));
            }
            
        }
     }
     
     
     
     function same_request_start($values,$conn){
         
         if(empty($values['request_code']))
        {  
        if($values['request_branch_id_to'] == $values['request_branch_id_from'])
        {
             $request_product_details_check = json_decode($values['request_product_details']);
            foreach($request_product_details_check as $request_product)
            {
                $request_product->product_code;
                $request_product->quantity;
                $check_product_quan_sql =  "SELECT SUM(`stock_quantity_in`) - SUM(`stock_quantity_out`) as result FROM `stock_master_details` WHERE `product_code`='".$request_product->product_code."' AND branch_master_id = '".$values['request_branch_id_to']."'";
            $result_product_check_details = $conn->query($check_product_quan_sql);
            $row_product_available = $result_product_check_details->fetch_all(MYSQLI_ASSOC); 
                
                
                $product_check_count =  $row_product_available[0]['result'];
                
                if($request_product->quantity > $product_check_count)
                {
                    echo json_encode(array("message"=>"Stock not available","status_code"=>400));
                    exit;
                    
                }
            } 
                    $check_emp_sql =  "select request_code + 1 as request_code,bill_no from request_management ORDER BY request_management_id DESC limit 1";
            $result_emp_details = $conn->query($check_emp_sql);
            $row_emp_available = $result_emp_details->fetch_all(MYSQLI_ASSOC);
            
            $request_code =  (!empty($row_emp_available)) ? $row_emp_available[0]['request_code'] :"100" ;
        
             if($row_emp_available[0]['bill_no'])
             {
                //new billno     
                  $explode_billno=  explode('NKT',$row_emp_available[0]['bill_no']);
                  $billinc = $explode_billno[1] + 1;
                  $actualbillno="NKT".$billinc;
                  
            }else{
                 $actualbillno = "NKT10001";
                 }
         
                
            $tracking_status = ($values['department_id'] == 5) ? "5" :"1";
            
            if($values['department_id'] == 5){
                $tracking_status = "5";
            }else if($values['tracking_status'] == 12)
            {$tracking_status = "12";
                
            }else if($values['tracking_status'] == 11){
                $tracking_status = "11";
            }else{
                $tracking_status = "1";
            }
            
        
            //new request add  
            $request_insert_sql = " INSERT INTO request_management (request_code,request_mode,request_branch_id_from,request_branch_id_to,bill_no,tracking_status,request_product_details,employee_id,request_status,remarks,created_by,item_code,item_quantity,department_id,damage_images) VALUES ('".$request_code."','".$values['request_mode']."','".$values['request_branch_id_from']."','".$values['request_branch_id_to']."','".$actualbillno."','".$tracking_status."','".$values['request_product_details']."','".$values['employee_id']."','1','".$values['remarks']."','".$values['employee_id']."','".$values['item_code']."','".$values['item_quantity']."','".$values['department_id']."','".$values['damage_images']."')";
              
            //  exit;      
            $request_insert_result= $conn->query($request_insert_sql); 
        
            if($request_insert_result){
            // new request traking insert 
            
            echo json_encode(array("message"=>"success","status_code"=>200));
            }else{
                echo json_encode(array("message"=>"Failed in details","status_code"=>400));
            }
            
        }else{
             echo json_encode(array("message"=>"Not Same Branch","status_code"=>400));
        }
     
        }else{
            
            $request_product_details_check = json_decode($values['request_product_details']);
              $values['stock_date'] = date("Y-m-d h:i:s");
            foreach($request_product_details_check as $request_product)
            {
                
            $check_product_quan_sql =  "SELECT SUM(`stock_quantity_in`) - SUM(`stock_quantity_out`) as result FROM `stock_master_details` WHERE `product_code`='".$request_product->product_code."' AND branch_master_id = '".$values['request_branch_id_to']."'";
            $result_product_check_details = $conn->query($check_product_quan_sql);
            $row_product_available = $result_product_check_details->fetch_all(MYSQLI_ASSOC); 
                
                
                $product_check_count =  $row_product_available[0]['result'];
                
                if($request_product->quantity > $product_check_count)
                {
                    echo json_encode(array("message"=>"Stock not available","status_code"=>400));
                    exit;
                    
                }
                
                
               $branch_dept= $this->get_department_id($values['request_branch_id_to'],$conn);
               $branch_dept_from= $this->get_department_id($values['request_branch_id_from'],$conn);
                $nkt_bill= $this->get_nkt_bill($values['request_code'],$conn);
                
                $stock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,department_id,stock_date,request_code,product_code,stock_quantity_out,employee_id,status,product_price,from_branch,from_department) VALUES ('".$values['request_branch_id_to']."','".$branch_dept."','".$values['stock_date']."','".$nkt_bill."','".$request_product->product_code."','".$request_product->quantity."','".$values['employee_id']."','1','".$request_product->product_price."','".$values['request_branch_id_from']."','".$branch_dept_from."')";
                    
                     $request_stock_result = $conn->query($stock_master_details_insert_sql); 
            
            }
            
            if(!empty($values['item_code']))
            {
                 $branch_dept= $this->get_department_id($values['request_branch_id_from'],$conn);
                  $branch_dept_from= $this->get_department_id($values['request_branch_id_to'],$conn);
            $nkt_bill= $this->get_nkt_bill($values['request_code'],$conn);      
            $samestock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,department_id,stock_date,request_code,product_code,stock_quantity_in,employee_id,status,from_branch,from_department) VALUES ('".$values['request_branch_id_from']."','".$branch_dept."','".$values['stock_date']."','".$nkt_bill."','".$values['item_code']."','".$values['item_quantity']."','".$values['employee_id']."','1','".$values['request_branch_id_from']."','".$branch_dept_from."')";
                    
                     $samerequest_stock_result = $conn->query($samestock_master_details_insert_sql);
            }     
           // $request_status = (empty($values['request_status'])) ? "1" :"2";
              $update_tracking_sql = "UPDATE request_management SET request_product_details = '".$values['request_product_details']."',  tracking_status='".$values['tracking_status']."',remarks= '".$values['remarks']."' WHERE request_code = '".$values['request_code']."'";
             $update_tracking =  $conn->query($update_tracking_sql);
            
            if($update_tracking){
             echo json_encode(array("message"=>"success","status_code"=>200));
            }else{
                echo json_encode(array("message"=>"Failed in details","status_code"=>400));
            }
            
        }
         
         
     }
     
     
     function get_department_id($branch_id,$conn){
         
         $sql = "SELECT department_master_id from branch_master WHERE branch_master_id = '$branch_id' AND status=1";
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		
    	    return $row[0]['department_master_id'];
    		
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	} 
         
         
     }
     
      function get_nkt_bill($request_code,$conn){
         
         $sql = "SELECT bill_no from request_management WHERE request_code = '$request_code'";
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		
    	    return $row[0]['bill_no'];
    		
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	} 
         
         
     }
     
     
       function request_start($values,$conn){
      
       $branch_dept ="";
       if(empty($values['request_code']))
        { 
        //new request_code
        
        
        if($values['request_branch_id_to'] == $values['request_branch_id_from'])
        {
             $request_product_details_check = json_decode($values['request_product_details']);
            foreach($request_product_details_check as $request_product)
            {
                
                $check_product_quan_sql =  "SELECT SUM(`stock_quantity_in`) - SUM(`stock_quantity_out`) as result FROM `stock_master_details` WHERE `product_code`='".$request_product->product_code."' AND branch_master_id = '".$values['request_branch_id_to']."'";
            $result_product_check_details = $conn->query($check_product_quan_sql);
            $row_product_available = $result_product_check_details->fetch_all(MYSQLI_ASSOC); 
                
                
                $product_check_count =  $row_product_available[0]['result'];
                
                if($request_product->quantity > $product_check_count)
                {
                    echo json_encode(array("message"=>"Stock not available","status_code"=>400));
                    exit;
                    
                }
            }
        }
            $check_emp_sql =  "select request_code + 1 as request_code,bill_no from request_management ORDER BY request_management_id DESC limit 1";
            $result_emp_details = $conn->query($check_emp_sql);
            $row_emp_available = $result_emp_details->fetch_all(MYSQLI_ASSOC);
            
            $request_code =  (!empty($row_emp_available)) ? $row_emp_available[0]['request_code'] :"100" ;
        
             if($row_emp_available[0]['bill_no'])
             {
                //new billno     
                  $explode_billno=  explode('NKT',$row_emp_available[0]['bill_no']);
                  $billinc = $explode_billno[1] + 1;
                  $actualbillno="NKT".$billinc;
                  
            }else{
                 $actualbillno = "NKT10001";
                 }
         
            
            $tracking_status = ($values['department_id'] == 5) ? "5" :"1";
        
            //new request add  
            $request_insert_sql = " INSERT INTO request_management (request_code,request_mode,request_branch_id_from,request_branch_id_to,bill_no,tracking_status,request_product_details,employee_id,request_status,remarks,created_by,vendor_id,product_total,department_id) VALUES ('".$request_code."','".$values['request_mode']."','".$values['request_branch_id_from']."','".$values['request_branch_id_to']."','".$actualbillno."','".$tracking_status."','".$values['request_product_details']."','".$values['employee_id']."','1','".$values['remarks']."','".$values['employee_id']."','".$values['vendor_id']."','".$values['product_total']."','".$values['department_id']."')";
                    
            $request_insert_result= $conn->query($request_insert_sql); 
        
            if($request_insert_result){
            // new request traking insert 
            echo json_encode(array("message"=>"success","status_code"=>200));
            }else{
                echo json_encode(array("message"=>"Failed in details","status_code"=>400));
            }
        
        
        // new request	End	
        }else{
            
            $request_product_details_array = json_decode($values['request_product_details']);
            
            $check_branch_sql =  "select bill_no,request_branch_id_from,request_branch_id_to,vendor_id,department_id from request_management WHERE request_code ='".$values['request_code']."' ";
            $result_branch_details = $conn->query($check_branch_sql);
            $row_branch_available = $result_branch_details->fetch_all(MYSQLI_ASSOC);
            
            $nkt_bill =  $row_branch_available[0]['bill_no'];
            $branch_from =  $row_branch_available[0]['request_branch_id_from'];
            $branch_to =  $row_branch_available[0]['request_branch_id_to'];
            $vendor_id =  $row_branch_available[0]['vendor_id'];
            $department_id =  $row_branch_available[0]['department_id'];
            
            if(($values['tracking_status'] == 6) || ($values['tracking_status'] == 4)) 
            {
            
              if($vendor_id !=0){
              // tracking_status complete or incomplete    
               foreach($request_product_details_array as $request_product)
                {
                     $nkt_bill= $this->get_nkt_bill($values['request_code'],$conn);
                   $values['stock_date'] = date("Y-m-d h:i:s");
                   if($request_product->status == 2)
                   {
                    
                    // skip its already exists
                    $check_res_sql = "SELECT stock_master_details_id from stock_master_details WHERE request_code='".$nkt_bill."' AND product_code='".$request_product->product_code."'";
                    $result_details = $conn->query($check_res_sql);
                    $row_res_available = $result_details->fetch_all(MYSQLI_ASSOC);

        
                        if ($result_details->num_rows > 0) {
                            continue;
                        }
                    
                   
                     $branch_dept = $this->get_department_id($branch_to,$conn);
                     
                     $branch_dept_from = $this->get_department_id($branch_from,$conn);
                     $nkt_bill= $this->get_nkt_bill($values['request_code'],$conn);
                    
                       
                     $stock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,stock_date,request_code,product_code,stock_quantity_in,employee_id,status,department_id,product_price,from_branch,from_department) VALUES ('".$branch_to."','".$values['stock_date']."','".$nkt_bill."','".$request_product->product_code."','".$request_product->quantity."','".$values['employee_id']."','1','".$branch_dept."','".$request_product->cost."','".$branch_from."','".$branch_dept_from."')";
                    
                     $request_stock_result = $conn->query($stock_master_details_insert_sql);  
                    
                      
                     }
                     
                     
                    }
            }else{
                
        if($values['request_branch_id_to'] == $values['request_branch_id_from'])
        {
             $request_product_details_check = json_decode($values['request_product_details']);
              $values['stock_date'] = date("Y-m-d h:i:s");
            foreach($request_product_details_check as $request_product)
            {
                 $branch_dept= $this->get_department_id($values['request_branch_id_to'],$conn);
                 $nkt_bill= $this->get_nkt_bill($request_code,$conn);
                 
                $stock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,stock_date,request_code,product_code,stock_quantity_out,employee_id,status,department_id,from_branch,from_department) VALUES ('".$values['request_branch_id_to']."','".$values['stock_date']."','".$nkt_bill."','".$request_product->product_code."','".$request_product->quantity."','".$values['employee_id']."','1','".$branch_dept."','".$branch_from."','".$branch_dept."')";
                    
                     $request_stock_result = $conn->query($stock_master_details_insert_sql); 
            
            }
            $branch_dept= $this->get_department_id($branch_from,$conn);
            $nkt_bill= $this->get_nkt_bill($values['request_code'],$conn);
            
            $samestock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,stock_date,request_code,product_code,stock_quantity_in,employee_id,status,department_id,from_branch,from_department) VALUES ('".$branch_from."','".$values['stock_date']."','".$nkt_bill."','".$values['item_code']."','".$values['item_quantity']."','".$values['employee_id']."','1','".$branch_dept."','".$branch_from."','".$branch_dept."')";
                    
                     $samerequest_stock_result = $conn->query($samestock_master_details_insert_sql);
            
            
            
            
         }else{
                foreach($request_product_details_array as $request_product)
                {
                   $values['stock_date'] = date("Y-m-d h:i:s");
                    $branch_dept= $this->get_department_id($branch_from,$conn);
                    $branch_dept_from= $this->get_department_id($branch_to,$conn);
                    $nkt_bill= $this->get_nkt_bill($values['request_code'],$conn);
                   $stock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,stock_date,request_code,product_code,stock_quantity_in,employee_id,status,department_id,product_price,from_branch,from_department) VALUES ('".$branch_from."','".$values['stock_date']."','".$nkt_bill."','".$request_product->product_code."','".$request_product->quantity."','".$values['employee_id']."','1','".$branch_dept."','".$request_product->cost."','".$branch_to."','".$branch_dept_from."')";
                    
                     $request_stock_result = $conn->query($stock_master_details_insert_sql);  
                 }
                 
            } 
                
            }
                  
            $request_status = (empty($values['request_status'])) ? "1" :"2";
              $update_tracking_sql = "UPDATE request_management SET request_product_details = '".$values['request_product_details']."',  tracking_status='".$values['tracking_status']."', request_status='".$request_status."',remarks= '".$values['remarks']."' WHERE request_code = '".$values['request_code']."'";
              
            if($conn->query($update_tracking_sql)) {
                  }
            echo json_encode(array("message"=>"Update success","status_code"=>200));
                
            }else if(($values['tracking_status'] == 7) & ($vendor_id == 0)){
                
                foreach($request_product_details_array as $request_product)
                {
                    $values['stock_date'] = date("Y-m-d h:i:s");
                   $branch_dept= $this->get_department_id($branch_to,$conn);
                    $branch_dept_from= $this->get_department_id($branch_from,$conn);
                     $nkt_bill= $this->get_nkt_bill($values['request_code'],$conn); 
                     $stock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,stock_date,request_code,product_code,stock_quantity_out,employee_id,status,department_id,product_price,from_branch,from_department) VALUES ('".$branch_to."','".$values['stock_date']."','".$nkt_bill."','".$request_product->product_code."','".$request_product->quantity."','".$values['employee_id']."','1','".$branch_dept."','".$request_product->cost."','".$branch_from."','".$branch_dept_from."')";
                    
                     $request_stock_result = $conn->query($stock_master_details_insert_sql);  
                     
                 }
                 
              $request_status = (empty($values['request_status'])) ? "1" :"2";
              $update_tracking_sql = "UPDATE request_management SET request_product_details = '".$values['request_product_details']."',  tracking_status='".$values['tracking_status']."', request_status='".$request_status."',remarks= '".$values['remarks']."' WHERE request_code = '".$values['request_code']."'";
              
            if($conn->query($update_tracking_sql)) {
                  }
            echo json_encode(array("message"=>"Update success","status_code"=>200)); 
                 
                
            }
            else{
            // tracking_update
          $available_status = array();
         
         // $request_product_details_avai = $values['request_product_details'];
         if(($values['tracking_status'] == 3) && ($values['vendor_id'] == 0)){
              $request_product_details_avai = json_decode($values['request_product_details']);
             foreach($request_product_details_avai as $request_product)
            {
                  
                   
                 $check_product_av = "select stock_master_details.product_code,SUM(stock_master_details.stock_quantity_in) - SUM(stock_master_details.stock_quantity_out) as availabilty,product_master.product_name FROM stock_master_details JOIN product_master ON product_master.product_code = stock_master_details.product_code WHERE stock_master_details.branch_master_id = '".$branch_to."' AND stock_master_details.product_code='".$request_product->product_code."' GROUP BY stock_master_details.product_code";
                   
                  $result_check_product_av = $conn->query($check_product_av);
                $row_res_available = $result_check_product_av->fetch_all(MYSQLI_ASSOC);

           
            $availabilty =  $row_res_available[0]['availabilty'];
            
              if($availabilty < $request_product->quantity)
                {
                    $available_status[]['code'] = $request_product->product_code;
                
                }
                     
                    
            }
            
            }
             if(empty($available_status)){
            $request_status = (empty($values['request_status'])) ? "1" :"2";
              $update_tracking_sql = "UPDATE request_management SET request_product_details = '".$values['request_product_details']."',  tracking_status='".$values['tracking_status']."', request_status='".$request_status."',remarks= '".$values['remarks']."',product_total='".$values['product_total']."',vendor_id='".$values['vendor_id']."' WHERE request_code = '".$values['request_code']."'";
             
             $request_track_insert_result= $conn->query($update_tracking_sql); 
              
              echo json_encode(array("message"=>"Update success","status_code"=>200));
              
            }else{
                   // print_r($available_status);
                    $av_json = json_encode($available_status);
                 echo json_encode(array("message"=>"stock not Available","status_code"=>400));
              
            }
            
            }
            
            }
             
        }
     
      function insert_attendence($values,$conn){
         
         
       $attendence_list = (!empty($values['attendencelist'])) ? $values['attendencelist'] : array();
         
  
    if(count($attendence_list) >=1 )
    {
         foreach($attendence_list  as $alist)
         {
             
            $check_res_sql = "SELECT employee_id from attandance_master WHERE employee_id='".$alist['employee_id']."' AND attendence_date ='".$values['attendence_date']."'";
            $result_details = $conn->query($check_res_sql);
            $row_res_available = $result_details->fetch_all(MYSQLI_ASSOC);
           
            
            if ($result_details->num_rows <= 0) {
                
          $attendence_insert_sql = " INSERT INTO attandance_master (employee_id,attendence_date,attendence_in,attendence_out,attendence_ot,attendence_leave,created_by) VALUES ('".$alist['employee_id']."','".$values['attendence_date']."','".$alist['attendence_in']."','".$alist['attendence_out']."','".$alist['attendence_ot']."','".$alist['attendence_leave']."','".$values['created_by']."')";
              
             $attendence_insert_result= $conn->query($attendence_insert_sql);
            
            }else{
                
              $attendence_update_sql="UPDATE attandance_master SET employee_id='".$alist['employee_id']."',attendence_date='".$values['attendence_date']."',attendence_in='".$alist['attendence_in']."',attendence_out='".$alist['attendence_out']."',attendence_ot='".$alist['attendence_ot']."',attendence_leave = '".$alist['attendence_leave']."',created_by='".$values['created_by']."' WHERE employee_id='".$alist['employee_id']."' AND attendence_date ='".$values['attendence_date']."'";
                
               $attendence_insert_result= $conn->query($attendence_update_sql);
                
            }
            
        }
        echo json_encode(array("message"=>"success","status_code"=>200));
        
    }else{
        echo json_encode(array("message"=>"Invalid Input","status_code"=>400));
    }
     }
     
     
     function outlet_billing($values,$conn)
     {
        
        
        if(empty($values['bill_no'])){
            
             $todaydate = date('dmy');
             $bill_base = "INV".$values['branch_id']."/".$values['department_id']."/".$todaydate."/";
             
            $check_emp_sql =  "SELECT bill_no FROM `outlet_billing`  WHERE bill_no LIKE '%$bill_base%' ORDER BY bill_no DESC LIMIT 1";
            $result_emp_details = $conn->query($check_emp_sql);
            $row_emp_available = $result_emp_details->fetch_all(MYSQLI_ASSOC);
            if($row_emp_available[0]['bill_no'])
             {
                //new billno
                $bill_val=   $row_emp_available[0]['bill_no'];
                $explode_billno=  explode($bill_base,$bill_val);
                $billinc = $explode_billno[1] + 1;
                $actualbillno=$bill_base.$billinc;   
                  
                  
            }else{
                 $actualbillno = "INV".$values['branch_id']."/".$values['department_id']."/".$todaydate."/1001";
                 }
       /*  $check_emp_sql =  "select bill_no  as bill_no from outlet_billing ORDER BY outlet_billing_id DESC limit 1";
            $result_emp_details = $conn->query($check_emp_sql);
            $row_emp_available = $result_emp_details->fetch_all(MYSQLI_ASSOC);
            if($row_emp_available[0]['bill_no'])
             {
                //new billno     
                  $explode_billno=  explode('INV',$row_emp_available[0]['bill_no']);
                  $billinc = $explode_billno[1] + 1;
                 $actualbillno="INV".$billinc;
                  
                  
                  
            }else{
                 $actualbillno = "INV10001";
                 }*/
         // insert Bill
          
            $insert_bill = "INSERT INTO outlet_billing (bill_no,orderby,gst_no,payment_type,cgst,sgst,total,customer_given,need_to_return,bill_details,created_by,status,branch_id,department_id) VALUES ('".$actualbillno."','".$values['orderby']."','".$values['gst_no']."','".$values['payment_type']."','".$values['cgst']."','".$values['sgst']."','".$values['total']."','".$values['customer_given']."','".$values['need_to_return']."','".$values['bill_details']."','".$values['created_by']."',1,'".$values['branch_id']."','".$values['department_id']."')";
           
           if($conn->query($insert_bill)) {
               
               
                $bill_details = json_decode($values['bill_details']);
         $values['stock_date'] = date("Y-m-d h:i:s");
         foreach($bill_details as $details)
         {
             $product_code = $details->product_id;
             $quantity_out = $details->quantity;
             $costperunit = $details->costperunit;
             
             $stock_master_details_insert_sql = " INSERT INTO stock_master_details (branch_master_id,department_id,stock_date,request_code,product_code,stock_quantity_out,employee_id,status,product_price,from_branch,from_department) VALUES ('".$values['branch_id']."','".$values['department_id']."','".$values['stock_date']."','".$actualbillno."','".$product_code."','".$quantity_out."','".$values['created_by']."','1','".$costperunit."','".$values['branch_id']."','".$values['department_id']."')";
                    
                     $request_stock_result = $conn->query($stock_master_details_insert_sql); 
             
         }
               
               $sql_bill = "SELECT outlet_billing.*,branch_master.branch_name,department_master.department_name,employee_master.employee_name 
                    FROM `outlet_billing`
                    JOIN employee_master ON employee_master.employee_id = outlet_billing.created_by
                    JOIN branch_master ON branch_master.branch_master_id = outlet_billing.branch_id
                    JOIN department_master ON department_master.department_master_id = outlet_billing.department_id
                    WHERE outlet_billing.bill_no='".$actualbillno."'";

                 $result = $conn->query($sql_bill);
                   if ($result->num_rows > 0) {
                		$row = $result->fetch_all(MYSQLI_ASSOC);
                		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
                	}else{
                	     echo json_encode(array("message"=>"Failed in details","status_code"=>400));
                	}
        
                  }
                  else{
                      echo json_encode(array("message"=>"Failed in details","status_code"=>400));
                  }
                  
        }else{
            
            
            $update_sql = "UPDATE outlet_billing SET bill_no='".$values['bill_no']."',orderby='".$values['orderby']."',gst_no='".$values['gst_no']."',sgst='".$values['sgst']."',cgst='".$values['cgst']."',total='".$values['total']."',customer_given='".$values['customer_given']."',need_to_return='".$values['need_to_return']."',bill_details='".$values['bill_details']."' ,branch_id='".$values['branch_id']."',department_id='".$values['department_id']."',status='".$values['status']."'";
            
            if($conn->query($update_sql)) {
               echo json_encode(array("message"=>"Updated Successfully","status_code"=>200));
                  }
                  else{
                      echo json_encode(array("message"=>"Failed in details","status_code"=>400));
                  }
            
        }
        
     }
}

?>