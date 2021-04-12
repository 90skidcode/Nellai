<?php

class SelectProject
{
    
    function generalMaster($values,$conn,$where_values,$like_values,$limit_values)
    {
       
       if($values['table_name']){
         
      $sql = "select ".$values['column']." from ".$values['table_name'].$where_values.$like_values.$limit_values;
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
       }else{
    		$row = "";
    		echo json_encode(array("message"=>"Invalid Json","status_code"=>404,));
    	}
    }
    
    function getDatesFromRange($start, $end, $format = 'Y-m-d') { 
          
        // Declare an empty array 
        $array = array(); 
          
        // Variable that store the date interval 
        // of period 1 day 
        $interval = new DateInterval('P1D'); 
      
        $realEnd = new DateTime($end); 
        $realEnd->add($interval); 
      
        $period = new DatePeriod(new DateTime($start), $interval, $realEnd); 
      
        // Use loop to store date into array 
        foreach($period as $date) {                  
            $array[] = $date->format($format);  
        } 
      
        // Return the array elements 
        return $array; 
    } 
    
    
    function login_master($values,$conn,$where_values,$like_values,$limit_values)
    {
       
       $sql="SELECT login_master.*,employee_master.employee_name,employee_master.department_id,employee_master.branch_id,employee_master.employee_designation_id
FROM `login_master`
JOIN `employee_master` ON employee_master.employee_id = login_master.login_username WHERE login_master.login_username='".$values['login_username']."' AND login_master.login_password='".$values['login_password']."'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    	    $val_pass=	bin2hex(random_bytes(32));
    	    
$update_sql ="UPDATE SET login_master SET pass_key='".$val_pass."' AND login_status='1' WHERE login_username='".$values['login_username']."' AND login_password='".$values['login_password']."' ";
    		
    		
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"Invalid UserName/Password","status_code"=>200,"result"=>$row));
    	}
       
    }
    
    
     function salary_list($values,$conn,$where_values,$like_values,$limit_values)
    {
       
       $department_id = (empty($values['department_id'])) ? "employee_master.department_id":$values['department_id'];
       $branch_id = (empty($values['branch_id'])) ? "employee_master.branch_id":$values['branch_id'];
       $employee_type = (empty($values['employee_type'])) ? "employee_master.employee_type":$values['employee_type'];
       
       $sql="SELECT employee_master.employee_id,employee_master.employee_name,employee_master.department_id,employee_master.branch_id,IFNULL(salary_master.employee_id, 0) as salary_process_status,salary_master.salary_total,branch_master.branch_name,department_master.department_name,consultancy_master.consultancy_name FROM employee_master
JOIN department_master  ON department_master.department_master_id = ".$department_id."
JOIN branch_master ON branch_master.branch_master_id = ".$branch_id."
JOIN consultancy_master ON consultancy_master.consultancy_master_id = ".$employee_type."
LEFT JOIN salary_master ON salary_master.employee_id = employee_master.employee_id AND salary_master.salary_month='".$values['salary_month']."' AND salary_master.salary_year='".$values['salary_year']."'".$where_values.$like_values.$limit_values;;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"No Records Found","status_code"=>200,"result"=>$row));
    	}
       
    }
 
 
     function getBilling_report($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT outlet_billing.*,branch_master.branch_name,department_master.department_name,employee_master.employee_name 
                    FROM `outlet_billing`
                    JOIN employee_master ON employee_master.employee_id = outlet_billing.created_by
                    JOIN branch_master ON branch_master.branch_master_id = outlet_billing.branch_id
                    JOIN department_master ON department_master.department_master_id = outlet_billing.department_id".$where_values.$like_values.$limit_values;
      // exit; //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
      function list_product_outlet($values,$conn)
    {
         
       $sql = "SELECT product_code,product_name,outlet_price FROM product_master WHERE status =1";
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
   
    function getBilling_detail($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT stock_master_details.`product_code`,product_master.product_name,SUM(stock_master_details.stock_quantity_in) - SUM(stock_master_details.stock_quantity_out) as available_quantity,product_master.outlet_price  as price
            FROM `stock_master_details`
            JOIN product_master ON product_master.product_code = stock_master_details.product_code
            WHERE stock_master_details.branch_master_id = '".$values['branch_id']."'
            GROUP BY stock_master_details.product_code".$where_values.$like_values.$limit_values;
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
    function getBranchDetails($values,$conn,$where_values,$like_values,$limit_values)
    {
         
      $sql = "SELECT branch_master.*,department_master.*,employee_master.employee_name
               FROM branch_master
               JOIN department_master ON department_master.department_master_id = branch_master.department_master_id
               JOIN employee_master ON employee_master.employee_id = branch_master.created_by".$where_values.$like_values.$limit_values;
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
     function getDashboard_details($values,$conn,$where_values,$like_values,$limit_values)
    {
         
      $department_sql = "SELECT (SELECT count(1) FROM branch_master WHERE department_master_id =2) as department_count,(SELECT count(1) FROM branch_master WHERE department_master_id =4) as outlet_count,(SELECT count(1) FROM branch_master WHERE department_master_id =1) as store_count,(SELECT count(1) FROM branch_master WHERE department_master_id =3) as kitchen_count".$where_values.$like_values.$limit_values;
        //echo $sql;
      $department_result = $conn->query($department_sql);
      $row['department'] = $department_result->fetch_all(MYSQLI_ASSOC);
        
      $revenue_sql = "SELECT (SELECT SUM(outlet_billing.total) FROM outlet_billing WHERE date(outlet_billing.created_at) = CURRENT_DATE) AS current_sales_date,( SELECT IFNULL(SUM(outlet_billing.total),0) FROM outlet_billing WHERE date(outlet_billing.created_at) = CURRENT_DATE - INTERVAL 1 DAY) as previous_date_sales;".$where_values.$like_values.$limit_values;
        //echo $sql;
      $revenue_result = $conn->query($revenue_sql); 
      $row['revenue'] = $revenue_result->fetch_all(MYSQLI_ASSOC);
      
      
       $orders_sql = "SELECT (SELECT count(outlet_billing.total) FROM outlet_billing WHERE date(outlet_billing.created_at) = CURRENT_DATE) AS current_sales_date,( SELECT IFNULL(count(outlet_billing.total),0) FROM outlet_billing WHERE date(outlet_billing.created_at) = CURRENT_DATE - INTERVAL 1 DAY) as previous_date_sales;".$where_values.$like_values.$limit_values;
        //echo $sql;
      $orders_result = $conn->query($orders_sql); 
      $row['orders'] = $orders_result->fetch_all(MYSQLI_ASSOC);
        
    $earning_sql = "SELECT (SELECT SUM(outlet_billing.total) FROM outlet_billing WHERE MONTH(outlet_billing.created_at) = MONTH(CURRENT_DATE)) AS current_month_sales,( SELECT SUM(outlet_billing.total) FROM outlet_billing WHERE MONTH(outlet_billing.created_at) = MONTH(CURRENT_DATE) - 1) as previous_month_sales".$where_values.$like_values.$limit_values;
        //echo $sql;
      $earning_result = $conn->query($earning_sql); 
      $row['earning'] = $earning_result->fetch_all(MYSQLI_ASSOC);   
      
       $sales_analytics_sql = " SELECT (SELECT SUM(request_management.product_total) FROM request_management WHERE request_management.vendor_id !=0 AND request_management.tracking_status =4 AND MONTH(request_management.created_at) = MONTH(CURRENT_DATE)) as purchase, (SELECT SUM(outlet_billing.total) FROM outlet_billing WHERE MONTH(outlet_billing.created_at) = MONTH(CURRENT_DATE)) AS sales".$where_values.$like_values.$limit_values;
        //echo $sql;
      $sales_analytics_result = $conn->query($sales_analytics_sql); 
      $row['sales_analytics'] = $sales_analytics_result->fetch_all(MYSQLI_ASSOC);  
     
   if ($row) {
    	//	$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}
    }
    
     function getCtcDetails($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT ctc_master.*,employee_master.employee_name
               FROM ctc_master
               JOIN employee_master ON employee_master.employee_id = ctc_master.created_by".$where_values.$like_values.$limit_values;
               
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    function sum_products($data,$conn,$where_values,$like_values,$limit_values,$where_in_values,$where_not_in_values)
    {
         
        $sql = "select stock_master_details.product_code,SUM(stock_master_details.stock_quantity_in) - SUM(stock_master_details.stock_quantity_out) as availabilty,product_master.product_name
FROM stock_master_details 
JOIN product_master ON product_master.product_code = stock_master_details.product_code".$where_values.$where_in_values.$like_values.$limit_values."
GROUP BY stock_master_details.product_code ORDER BY availabilty DESC";
               
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
     
     
     function get_product_report_old($values,$conn,$where_values,$like_values,$limit_values)
    {
        if((!empty($values['from_date'])) && (!empty($values['to_date'])))  
        { 
             if($where_values){
                 $between_date = " AND stock_master_details.stock_date BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }else{
                  $between_date = " WHERE stock_master_details.stock_date BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }
        } else if((!empty($values['from_date'])) && (empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['from_date']."' <= stock_master_details.stock_date ";
             }else{
                  $between_date = " WHERE '".$values['from_date']."' <= stock_master_details.stock_date ";
             }
        } else if((empty($values['from_date'])) && (!empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['to_date']."' >= stock_master_details.stock_date  ";
             }else{
                  $between_date = " WHERE '".$values['to_date']."' >= stock_master_details.stock_date  ";
             }
        }else{
            $between_date ="";
        }
         
         
     $sql = "SELECT stock_master_details.*,  product_master.product_name,branch_master.branch_name,employee_master.employee_name,department_master.department_name,request_management.bill_no,request_management.request_branch_id_from,request_management.damage_images,request_management.request_branch_id_to,branch_from.branch_name as from_branch,branch_to.branch_name as to_branch
FROM `stock_master_details`
JOIN product_master ON product_master.product_code = stock_master_details.product_code
JOIN employee_master ON employee_master.employee_id = stock_master_details.employee_id
JOIN request_management ON request_management.request_code = stock_master_details.request_code
JOIN branch_master as branch_from ON branch_from.branch_master_id = request_management.request_branch_id_from 
JOIN branch_master as branch_to ON branch_to.branch_master_id = request_management.request_branch_id_to
LEFT JOIN department_master ON department_master.department_master_id = stock_master_details.department_id
LEFT JOIN branch_master ON branch_master.branch_master_id = stock_master_details.branch_master_id".$where_values.$between_date.$like_values.$limit_values;
               
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    function get_product_report($values,$conn,$where_values,$like_values,$limit_values)
    {
        if((!empty($values['from_date'])) && (!empty($values['to_date'])))  
        { 
             if($where_values){
                 $between_date = " AND DATE(stock_master_details.stock_date)  BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }else{
                  $between_date = " WHERE DATE(stock_master_details.stock_date) BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }
        } else if((!empty($values['from_date'])) && (empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['from_date']."' <= stock_master_details.stock_date ";
             }else{
                  $between_date = " WHERE '".$values['from_date']."' <= stock_master_details.stock_date ";
             }
        } else if((empty($values['from_date'])) && (!empty($values['to_date'])))
        {
            $to_date_new =date('y-m-d',strtotime($values['to_date'] . "+1 days"));
             if($where_values){
                 $between_date = " AND '".$to_date_new."' >= stock_master_details.stock_date  ";
             }else{
                  $between_date = " WHERE '".$to_date_new."' >= stock_master_details.stock_date  ";
             }
        }else{
            $between_date ="";
        }
         
         
     $sql = "SELECT stock_master_details.*, product_master.product_name,branch_master.branch_name,employee_master.employee_name,department_master.department_name,branch_from.branch_name as from_branch,branch_to.branch_name as to_branch ,stock_master_details.request_code as bill_no,request_management.damage_images,request_management.tracking_status
FROM `stock_master_details` JOIN product_master ON product_master.product_code = stock_master_details.product_code 
JOIN employee_master ON employee_master.employee_id = stock_master_details.employee_id 
LEFT JOIN request_management ON request_management.bill_no = stock_master_details.request_code
JOIN branch_master as branch_from ON branch_from.branch_master_id = stock_master_details.from_branch 
JOIN branch_master as branch_to ON branch_to.branch_master_id = stock_master_details.branch_master_id 
LEFT JOIN department_master ON department_master.department_master_id = stock_master_details.department_id
LEFT JOIN branch_master ON branch_master.branch_master_id = stock_master_details.branch_master_id".$where_values.$between_date.$like_values.$limit_values."  ORDER BY stock_master_details.stock_date DESC";
               
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
     function get_outlet_stockreport($values,$conn,$where_values,$like_values,$limit_values)
    {
        if((!empty($values['from_date'])) && (!empty($values['to_date'])))  
        { 
             if($where_values){
                 $between_date = " AND stock_master_details.stock_date BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }else{
                  $between_date = " WHERE stock_master_details.stock_date BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }
        } else if((!empty($values['from_date'])) && (empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['from_date']."' <= stock_master_details.stock_date ";
             }else{
                  $between_date = " WHERE '".$values['from_date']."' <= stock_master_details.stock_date ";
             }
        } else if((empty($values['from_date'])) && (!empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['to_date']."' >= stock_master_details.stock_date  ";
             }else{
                  $between_date = " WHERE '".$values['to_date']."' >= stock_master_details.stock_date  ";
             }
        }else{
            $between_date ="";
        }
         
         
     $sql = "SELECT stock_master_details.*, product_master.product_name,branch_master.branch_name,employee_master.employee_name,department_master.department_name 
     FROM `stock_master_details` 
     JOIN product_master ON product_master.product_code = stock_master_details.product_code 
     JOIN employee_master ON employee_master.employee_id = stock_master_details.employee_id 
     LEFT JOIN department_master ON department_master.department_master_id = stock_master_details.department_id 
     LEFT JOIN branch_master ON branch_master.branch_master_id = stock_master_details.branch_master_id ".$where_values.$between_date.$like_values.$limit_values;
               
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
      function get_invoice_report($values,$conn,$where_values,$like_values,$limit_values)
    {
        if((!empty($values['from_date'])) && (!empty($values['to_date'])))  
        { 
             if($where_values){
                 $between_date = " AND outlet_billing.created_at BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }else{
                  $between_date = " WHERE outlet_billing.created_at BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }
        } else if((!empty($values['from_date'])) && (empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['from_date']."' <= outlet_billing.created_at ";
             }else{
                  $between_date = " WHERE '".$values['from_date']."' <= outlet_billing.created_at ";
             }
        } else if((empty($values['from_date'])) && (!empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['to_date']."' >= outlet_billing.created_at  ";
             }else{
                  $between_date = " WHERE '".$values['to_date']."' >= outlet_billing.created_at  ";
             }
        }else{
            $between_date ="";
        }
         
         
     $sql = "SELECT outlet_billing.*,outlet_billing.created_at as stock_date,branch_master.branch_name,employee_master.employee_name,department_master.department_name,'' as from_branch, '' as to_branch
FROM `outlet_billing` 
JOIN employee_master ON employee_master.employee_id = outlet_billing.created_by 
JOIN department_master ON department_master.department_master_id = outlet_billing.department_id 
JOIN branch_master ON branch_master.branch_master_id = outlet_billing.branch_id ".$where_values.$between_date.$like_values.$limit_values;
               
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    function getproductIngDetails($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT product_master.*,employee_master.employee_name
               FROM product_master
               JOIN employee_master ON employee_master.employee_id = product_master.created_by".$where_values.$like_values.$limit_values;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		$i=0;
    		foreach($row as $resultIng)
    		{
    		    if($resultIng['ingredient_status'] == 1)
    		    {
    		        $ing_sql = "SELECT ingredient_master.* ,product_master.product_name
                            FROM ingredient_master
                            JOIN product_master ON product_master.product_code = ingredient_master.ingredient_product_code
                            WHERE ingredient_master.product_code='".$resultIng['product_code']."'";
    		         $ing_result = $conn->query($ing_sql);
    		        $ingrow = $ing_result->fetch_all(MYSQLI_ASSOC);
    		        
    		        $finalresult[$i]=$resultIng;
    		        $finalresult[$i][]=$ingrow;
    		        
    		        
    		    }else{
    		        
    		        $finalresult[$i]=$resultIng;
    		    }
    		    
    	$i++;	}
    		
    	//	print_r($finalresult);
    		
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$finalresult));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    function getproductDetails($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT product_master.*,employee_master.employee_name
               FROM product_master
               JOIN employee_master ON employee_master.employee_id = product_master.created_by".$where_values.$like_values.$limit_values;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
    function getingredientDetails($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT ingredient_master.*
               FROM ingredient_master".$where_values.$like_values.$limit_values;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
    
     function get_request($values,$conn,$where_values,$like_values,$limit_values,$where_in_values,$where_not_in_values)
    {
        
        if((!empty($values['from_date'])) && (!empty($values['to_date'])))  
        { 
             if($where_values){
                 $between_date = " AND request_management.created_at BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }else{
                  $between_date = " WHERE request_management.created_at BETWEEN '".$values['from_date']."' AND '".$values['to_date']."'";
             }
        } else if((!empty($values['from_date'])) && (empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['from_date']."' <= request_management.created_at ";
             }else{
                  $between_date = " WHERE '".$values['from_date']."' <= request_management.created_at ";
             }
        } else if((empty($values['from_date'])) && (!empty($values['to_date'])))
        {
             if($where_values){
                 $between_date = " AND '".$values['to_date']."' >= request_management.created_at  ";
             }else{
                  $between_date = " WHERE '".$values['to_date']."' >= request_management.created_at  ";
             }
        }else{
            $between_date ="";
        }
         
      $sql = "SELECT request_management.request_code,request_management.request_mode,request_management.request_branch_id_from,request_management.request_branch_id_to, request_management.request_product_details,request_management.bill_no,request_management.tracking_status,request_management.employee_id,request_management.request_status,request_management.remarks,request_management.remarks,request_management.vendor_id,request_management.product_total,request_management.item_quantity,request_management.item_code,request_management.created_at,request_management.damage_images,b1.branch_name as branch_from ,b1.department_master_id as department_id,b2.branch_name as branch_to,IFNULL(vendor_master.vendor_name , '') as vendor_name
FROM request_management 
JOIN branch_master as b1 ON b1.branch_master_id = request_management.request_branch_id_from 
JOIN branch_master as b2 ON b2.branch_master_id = request_management.request_branch_id_to
LEFT JOIN vendor_master ON vendor_master.vendor_master_id = request_management.vendor_id".$where_values.$between_date.$where_in_values.$where_not_in_values.$like_values.$limit_values." ORDER BY request_management.bill_no DESC";
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
     function get_request_tracking($values,$conn,$where_values,$like_values,$limit_values)
    {
         
        $sql_master = "SELECT request_management.request_code,request_management.request_mode,request_management.request_branch_id_from,request_management.request_branch_id_to, request_management.request_product_details,request_management.bill_no,request_management.tracking_status,request_management.employee_id,request_management.request_status,request_management.remarks,request_management.remarks,request_management.vendor_id,request_management.product_total,request_management.item_quantity,request_management.item_code,request_management.created_at,request_management.damage_images,b1.branch_name as branch_from ,b1.department_master_id as department_id,b2.branch_name as branch_to,IFNULL(vendor_master.vendor_name , '') as vendor_name,department_name,IFNULL(product_master.product_name , '') as item_name
FROM request_management 
JOIN branch_master as b1 ON b1.branch_master_id = request_management.request_branch_id_from 
JOIN branch_master as b2 ON b2.branch_master_id = request_management.request_branch_id_to
JOIN department_master  ON department_master.department_master_id = request_management.department_id
JOIN product_master  ON product_master.product_code = request_management.item_code
LEFT JOIN vendor_master ON vendor_master.vendor_master_id = request_management.vendor_id".$where_values.$like_values.$limit_values;

 $result_master = $conn->query($sql_master);
         
       $sql = "SELECT tracking_request_management.request_code,tracking_request_management.request_mode,tracking_request_management.request_branch_id_from,tracking_request_management.request_branch_id_to, tracking_request_management.request_product_details,tracking_request_management.bill_no,tracking_request_management.tracking_status,tracking_request_management.employee_id,tracking_request_management.request_status,tracking_request_management.remarks,tracking_request_management.remarks,tracking_request_management.vendor_id,tracking_request_management.product_total,tracking_request_management.item_quantity,tracking_request_management.item_code,tracking_request_management.created_at,b1.branch_name as branch_from ,b1.department_master_id as department_id,b2.branch_name as branch_to,IFNULL(vendor_master.vendor_name , '') as vendor_name,department_name,e1.employee_name as employee_name,e2.employee_name as created_by_name
FROM tracking_request_management 
JOIN branch_master as b1 ON b1.branch_master_id = tracking_request_management.request_branch_id_from 
JOIN branch_master as b2 ON b2.branch_master_id = tracking_request_management.request_branch_id_to
JOIN department_master  ON department_master.department_master_id = tracking_request_management.department_id
JOIN employee_master as e1 ON e1.employee_id = tracking_request_management.employee_id
JOIN employee_master as e2 ON e2.employee_id = tracking_request_management.employee_id
LEFT JOIN vendor_master ON vendor_master.vendor_master_id = tracking_request_management.vendor_id".$where_values.$like_values.$limit_values." ORDER BY tracking_request_management_id DESC";
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
            $row['request'] = $result_master->fetch_all(MYSQLI_ASSOC);
    		$row['tracking'] = $result->fetch_all(MYSQLI_ASSOC);
    		
    		
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
    function getAttendence($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT attandance_master_id,employee_id,attendence_date,attendence_in,attendence_out,attendence_ot,attendence_leave FROM `attandance_master` WHERE `employee_id`='".$values['employee_id']."' AND `attendence_date` BETWEEN ('".$values['attendence_date_from']."') AND ('".$values['attendence_date_to']."')";
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row['attendence_details'] = $result->fetch_all(MYSQLI_ASSOC);
    		
    	$leave_sql = "SELECT GROUP_CONCAT(leave_shortname) as leave_shortname  from  leave_master WHERE status=1";
        $leave_result = $conn->query($leave_sql);	
        
        $leave_row = $leave_result->fetch_all(MYSQLI_ASSOC);
        	$row['leave_master'] = $leave_row[0]['leave_shortname'];
    		
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
     function getAttendence_indication($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql = "SELECT attandance_master.`attendence_date`, count(employee_master.`employee_id`) as employee_count
        FROM `attandance_master`
        JOIN employee_master ON employee_master.employee_id = attandance_master.employee_id
        WHERE MONTH(attandance_master.`attendence_date`) = '".$values['attendence_month']."' AND YEAR(attandance_master.`attendence_date`) = '".$values['attendence_year']."' AND employee_master.branch_id='".$values['branch_id']."' AND employee_master.department_id = '".$values['department_id']."' AND attandance_master.attendence_in !='' AND attandance_master.attendence_out !=''
        GROUP BY attandance_master.`attendence_date`";
        $result = $conn->query($sql);
        
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
     function getAttendence_datewise($values,$conn,$where_values,$like_values,$limit_values)
    {
         
        $sql = "SELECT attandance_master.employee_id,attandance_master.attandance_master_id,attandance_master.attendence_date,attandance_master.attendence_in,attandance_master.attendence_out,attandance_master.attendence_ot,attandance_master.attendence_leave
        FROM `attandance_master`
        JOIN employee_master ON employee_master.employee_id = attandance_master.employee_id
        WHERE `attendence_date`='".$values['attendence_date']."' AND employee_master.branch_id='".$values['branch_id']."' AND employee_master.department_id = '".$values['department_id']."'";
        $result = $conn->query($sql);
        
       
    		$row['attendence'] = $result->fetch_all(MYSQLI_ASSOC);
    		
    		$sql_leave = "SELECT leave_management.*, leave_master.*
FROM `leave_management`
JOIN `leave_master` ON leave_master.leave_master_id = leave_management.leave_master_id
JOIN `employee_master` ON employee_master.employee_id = leave_management.employee_id
WHERE employee_master.branch_id='".$values['branch_id']."' AND employee_master.department_id='".$values['department_id']."' AND '".$values['attendence_date']."' BETWEEN `start_date` AND `end_date`";
        
         $result_leave = $conn->query($sql_leave);
        $row['leave'] = $result_leave->fetch_all(MYSQLI_ASSOC);
        
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	
    }
    
    function getsalary_process($values,$conn,$where_values,$like_values,$limit_values)
    {
        
     $sql_check_salary_sql="SELECT IFNULL(salary_master.employee_id, 0) as salary_process_status,salary_master.salary_total 
     FROM employee_master 
     LEFT JOIN salary_master ON salary_master.employee_id =employee_master.employee_id AND salary_master.salary_month='".$values['salary_month']."' AND salary_master.salary_year='".$values['salary_year']."'
     WHERE employee_master.status = 1 AND employee_master.employee_id ='".$values['employee_id']."'";
        $result_sal_check = $conn->query($sql_check_salary_sql);    
        
        
        $check_row= $result_sal_check->fetch_all(MYSQLI_ASSOC);
        
    if($check_row[0]['salary_process_status'] == 0){
         
        $sql = "SELECT employee_master.employee_name,employee_grade.employee_grade ,employee_grade.allowance ,employee_grade.deductions,(select consultancy_master.consultancy_name FROM employee_master JOIN consultancy_master ON consultancy_master.consultancy_master_id = employee_master.employee_type WHERE employee_master.employee_id='".$values['employee_id']."' ) AS employee_type FROM employee_master
            JOIN employee_grade ON employee_grade.employee_grade_id = employee_master.employee_grade_id
            WHERE employee_master.employee_id='".$values['employee_id']."' AND employee_grade.status=1";
        $result = $conn->query($sql);
       
       
    	$row['grade'] = $result->fetch_all(MYSQLI_ASSOC);
    	
    }else
    {
        
      $sql = "SELECT employee_master.employee_name,employee_grade.employee_grade ,salary_master.allowance,salary_master.deductions,salary_master.remarks,(select consultancy_master.consultancy_name 
     FROM employee_master 
     JOIN consultancy_master ON consultancy_master.consultancy_master_id = employee_master.employee_type 
     WHERE employee_master.employee_id='".$values['employee_id']."' ) AS employee_type 
     FROM employee_master
     JOIN employee_grade ON employee_grade.employee_grade_id = employee_master.employee_grade_id
     JOIN salary_master ON salary_master.employee_id = employee_master.employee_id
            WHERE employee_master.employee_id='".$values['employee_id']."' AND employee_grade.status=1";
        
        $result = $conn->query($sql);
       
    	$row['grade'] = $result->fetch_all(MYSQLI_ASSOC);
    }
    
        $salary_month_year = $values['salary_year']."-".$values['salary_month']."-01";
        $from_m_y = date('Y-m',strtotime('first day of previous month', strtotime($salary_month_year)));
        $check_date_sql = "SELECT from_date,to_date from salary_process_date";
        $result_date = $conn->query($check_date_sql);
        $val_get_date = $result_date->fetch_all(MYSQLI_ASSOC);
        
        $from_date = $from_m_y."-".$val_get_date[0]['from_date'];
        $to_date = $values['salary_year']."-".$values['salary_month']."-".$val_get_date[0]['to_date'];
    		
       
        $between = " attandance_master.attendence_date BETWEEN '".$from_date."' AND '".$to_date."'"; 
        
         
        $sql_attendence = "select  (SELECT DATEDIFF('".$to_date."', '".$from_date."')) AS no_of_working, 
        (SELECT COUNT(1) FROM attandance_master WHERE attandance_master.attendence_leave=1 AND attandance_master.employee_id='".$values['employee_id']."' AND ".$between.") AS present, 
        (SELECT COUNT(1) FROM attandance_master WHERE attandance_master.attendence_leave=2 AND attandance_master.employee_id='".$values['employee_id']."' AND ".$between.") AS absent,
        (SELECT sum(attandance_master.attendence_ot) FROM attandance_master WHERE attandance_master.attendence_leave=1 AND attandance_master.employee_id='".$values['employee_id']."' AND ".$between.") AS ot,
        (SELECT count(1) FROM attandance_master WHERE attandance_master.attendence_in='' AND attandance_master.attendence_out='' AND attandance_master.attendence_leave='' AND attandance_master.employee_id='".$values['employee_id']."' AND ".$between.") AS lop,
        (select consultancy_master.consultancy_name 
        FROM employee_master 
        JOIN consultancy_master ON consultancy_master.consultancy_master_id = employee_master.employee_type WHERE employee_master.employee_id='".$values['employee_id']."' ) AS employee_type";
        
        $result_leave = $conn->query($sql_attendence);
        $row['attendence'] = $result_leave->fetch_all(MYSQLI_ASSOC);
        
        
    	echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	
    }
    
    
    
     function getAttendence_report($values,$conn,$where_values,$like_values,$limit_values)
    {
         
        $sql ="SELECT employee_id,employee_name FROM `employee_master` WHERE employee_master.department_id=2 AND employee_master.branch_id=2 AND employee_master.status =1";
        $result = $conn->query($sql);
        $employee_list = $result->fetch_all(MYSQLI_ASSOC);
        
        $from_date = $values['from_date'];
        $to_date = $values['to_date'];
        $between = " attandance_master.attendence_date BETWEEN '".$from_date."' AND '".$to_date."'";
        $Date_list = $this->getDatesFromRange($from_date, $to_date);
        
        $sql_leave ="SELECT leave_master_id,leave_name,leave_shortname FROM `leave_master` WHERE status =1";
        $result_leave = $conn->query($sql_leave);
        $leave_list = $result_leave->fetch_all(MYSQLI_ASSOC);
        
        $result_array=array();
            
        foreach($Date_list as $ch_av)
        {
            $sql_check ="SELECT * FROM `leave_management` JOIN leave_master ON leave_master.leave_master_id = leave_management.leave_master_id  WHERE '".$ch_av."' BETWEEN DATE(leave_management.`start_date`) and DATE(leave_management.`end_date`) OR DATE(leave_management.`end_date`) = '".$ch_av."'";
                $result_leave = $conn->query($sql_check);
                $check_list[$ch_av] = $result_leave->fetch_all(MYSQLI_ASSOC);
                
              //  print_r($check_list[$ch_av]);
               if($result_leave->num_rows !=0 )
               {
                   foreach ($check_list[$ch_av] as $element) {
                                // $result_array[$element['leave_management_id']][] = $element;
                                $result_array[] = $element;
                   }
               }
        }
            
      $result_array_1=array();
      
      foreach ($result_array as $element_1) {
                                 $result_array_1[$element_1['employee_id']][] = $element_1;
                   }
        
      print_r($result_array_1);
   
   
   
   
    }
    
    
    function getEmployeeDetails($values,$conn,$where_values,$like_values,$limit_values)
    {
         
    $sql = "SELECT employee_master.*,department_master.*,employee_master.employee_name,employee_designation.employee_designation as employee_designation_name,employee_grade.employee_grade,employee_qualification.employee_qualification,branch_master.branch_name
               FROM employee_master
               JOIN department_master ON department_master.department_master_id = employee_master.department_id
               JOIN employee_grade ON employee_grade.employee_grade_id = employee_master.employee_grade_id
               JOIN branch_master ON branch_master.branch_master_id = employee_master.branch_id
               JOIN employee_designation ON employee_designation.employee_designation_id = employee_master.employee_designation_id
               JOIN employee_qualification ON employee_qualification.employee_qualification_id = employee_master.employee_qualification_id".$where_values.$like_values.$limit_values;
       // echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    
    
    
     function getLeaveManagementDetails($values,$conn,$where_values,$like_values,$limit_values)
    {
         
       $sql =  $sql = "SELECT leave_management.*,leave_master.*,employee_master.employee_name
               FROM leave_management
               JOIN leave_master ON leave_master.leave_master_id = leave_management.leave_master_id
               JOIN employee_master ON employee_master.employee_id = leave_management.employee_id".$where_values.$like_values.$limit_values;
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$row));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    function get_department_name($dept_id,$conn){
         
         $sql = "SELECT department_name from department_master WHERE department_master_id = '$dept_id'";
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		
    	    return $row[0]['department_name'];
    		
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	} 
         
         
     }
     
     function get_branch_name($branch_id,$conn){
         
         $sql = "SELECT branch_name from branch_master WHERE branch_master_id = '$branch_id'";
        //echo $sql;
        $result = $conn->query($sql);
       if ($result->num_rows > 0) {
    		$row = $result->fetch_all(MYSQLI_ASSOC);
    		
    	    return $row[0]['branch_name'];
    		
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	} 
         
         
     }
    
    function report_360_nellai_dev($values,$conn,$where_values,$like_values,$limit_values)
    {
         
        $sql_stock_in = "SELECT department_id,branch_master_id,SUM(`stock_quantity_in` * `product_price`) as total FROM `stock_master_details` WHERE `stock_quantity_in` != 0 GROUP BY 1,2
        ".$where_values.$like_values.$limit_values;
        $result_stock_in = $conn->query($sql_stock_in);

        $sql_stock_out = "SELECT department_id,branch_master_id,SUM(`stock_quantity_out` * `product_price`) as total FROM `stock_master_details` WHERE `stock_quantity_out` != 0 GROUP BY 1,2
        ".$where_values.$like_values.$limit_values;
        $result_stock_out = $conn->query($sql_stock_out);
        
       ;
        $sql_salary = " SELECT SUM(`salary_total`) as salary_total FROM salary_master".$where_values.$like_values.$limit_values;
        $result_salary = $conn->query($sql_salary);
        $row_salary = $result_salary->fetch_all(MYSQLI_ASSOC);
        
       if ($result_stock_in->num_rows > 0) {
    		$row['stockin'] = $result_stock_in->fetch_all(MYSQLI_ASSOC);
    		$row['stockout'] = $result_stock_out->fetch_all(MYSQLI_ASSOC);
    		
    		$i=0;$fresult=array();
    		foreach($row['stockin'] as $val)
    		{
    		    
    		  $department_name= $this->get_department_name($val['department_id'],$conn);
    		 $branch_name= $this->get_branch_name($val['branch_master_id'],$conn);
    		 $fresult[$department_name]['department_id'] = $val['department_id'];
    		 $fresult[$department_name]['details'][$branch_name]['branch_master_id']= $val['branch_master_id'];
    		 
    		 $fresult[$department_name]['details'][$branch_name]['details']['income'] = $row['stockout'][$i]['total']; 
    	    
    		 $fresult[$department_name]['details'][$branch_name]['details']['expenses'] = $val['total'] ;
    		 
    		 
    	$i++;	}
    		if(!empty($row_salary[0]['salary_total'])){
    		
    	    	$fresult['EmployeeSalary']['details']['expenses'] = $row_salary[0]['salary_total'];
    		}else{
    		    $fresult['EmployeeSalary']['details']['expenses'] = 0;
    		}
    		
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$fresult));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
    
    function report_360_nellai($values,$conn,$where_values,$like_values,$limit_values)
    {
         
        //SELECT `department_master_id` as department_id,`branch_master_id` FROM `branch_master` GROUP BY 1,2 
        //SELECT department_id,branch_master_id FROM `stock_master_details` GROUP BY 1,2
        $sql_stock_loop = "SELECT department_id,branch_master_id FROM `stock_master_details` GROUP BY 1,2
        ".$where_values.$like_values.$limit_values;
        $result_stock_loop = $conn->query($sql_stock_loop); 
         
        $sql_stock_in = "SELECT department_id,branch_master_id,SUM(`stock_quantity_in` * `product_price`) as total FROM `stock_master_details` WHERE `stock_quantity_in` != 0 GROUP BY 1,2
        ".$where_values.$like_values.$limit_values;
        $result_stock_in = $conn->query($sql_stock_in);

        $sql_stock_out = "SELECT department_id,branch_master_id,SUM(`stock_quantity_out` * `product_price`) as total FROM `stock_master_details` WHERE `stock_quantity_out` != 0 GROUP BY 1,2
        ".$where_values.$like_values.$limit_values;
        $result_stock_out = $conn->query($sql_stock_out);
        
       ;
        $sql_salary = " SELECT SUM(`salary_total`) as salary_total FROM salary_master".$where_values.$like_values.$limit_values;
        $result_salary = $conn->query($sql_salary);
        $row_salary = $result_salary->fetch_all(MYSQLI_ASSOC);
        
       if ($result_stock_in->num_rows > 0) {
    		$row['stockin'] = $result_stock_in->fetch_all(MYSQLI_ASSOC);
    		$row['stockout'] = $result_stock_out->fetch_all(MYSQLI_ASSOC);
    	    $row['loop'] = $result_stock_loop->fetch_all(MYSQLI_ASSOC);
    		
    		$i=0;$fresult=array();
    		foreach($row['loop'] as $val)
    		{
    		    
    		   $dept_id= $val['department_id'];
    		   $branch_id= $val['branch_master_id'];
    		 $department_name= $this->get_department_name($val['department_id'],$conn);
    		 $branch_name= $this->get_branch_name($val['branch_master_id'],$conn);
    		 
    		$fresult[$department_name]['department_id'] = $val['department_id'];
    		$fresult[$department_name]['details'][$branch_name]['branch_master_id']= $val['branch_master_id'];
    		 
    
    		foreach($row['stockout'] as $val_out){
    		    
    		    if(($val_out['department_id']) && ($dept_id))
    		    {
    		         if(($val_out['branch_master_id']) && ($branch_id))
        		    {
        		        $department_name_out= $this->get_department_name($val_out['department_id'],$conn);
        		        $branch_name_out= $this->get_branch_name($val_out['branch_master_id'],$conn);
        		       $fresult[$department_name_out]['details'][$branch_name_out]['details']['income'] = $val_out['total'];
        		           
         if(empty($fresult[$department_name_out]['details'][$branch_name_out]['details']['expenses']))
        		       {
        		           $fresult[$department_name_out]['details'][$branch_name_out]['details']['expenses'] = 0;
        		       }
        		       
        		            
        		     }else
        		     {
        		         //break;
        		     }
    		    }
    		    
    		  } 
    		  
    		  foreach($row['stockin'] as $val_in){
    		    
    		    if(($val_out['department_id']) && ($dept_id))
    		    {
    		         if(($val_out['branch_master_id']) && ($branch_id))
        		    {
        		        $department_name_in= $this->get_department_name($val_in['department_id'],$conn);
        		        $branch_name_in= $this->get_branch_name($val_in['branch_master_id'],$conn);
        		       $fresult[$department_name_in]['details'][$branch_name_in]['details']['expenses'] = $val_in['total'];
        		       if(empty($fresult[$department_name_in]['details'][$branch_name_in]['details']['income']))
        		       {
        		           $fresult[$department_name_in]['details'][$branch_name_in]['details']['income'] = 0;
        		       }
        		       
        		            
        		     }else
        		     {
        		         //break;
        		     }
    		    }
    		    
    		  } 
    		 
    	$i++; 	}
    	$fresult['EmployeeSalary']['details']['income'] = 0;
    		if(!empty($row_salary[0]['salary_total'])){
    		
    	    $fresult['EmployeeSalary']['details']['expenses'] = $row_salary[0]['salary_total'];
    		}else{
    		    $fresult['EmployeeSalary']['details']['expenses'] = 0;
    		}
    		echo json_encode(array("message"=>"success","status_code"=>200,"result"=>$fresult));
    	}else{
    		$row = array();
        	echo json_encode(array("message"=>"failed","status_code"=>200,"result"=>$row));
    	}
    }
}