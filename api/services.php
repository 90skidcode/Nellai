<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);
include("connection.php");
require_once("service_add.php");
require_once("service_select.php");
require_once("service_update.php");
$insert_class = new InsertProject;
$select_class = new SelectProject;
$update_class = new UpdateProject;


 $json = json_encode($_REQUEST); 
// $json = '{"list_key":"createrequest","vendor_id":"1","request_code":"102","tracking_status":6,"employee_id":"10006","remarks":" ","product_total":"Rs.4,50,900","request_product_details":"[{\"status\":\"2\",\"product_id\":\"1\",\"quantity\":\"10010\",\"cost\":\"45\",\"total\":\"450450\"},{\"status\":\"1\",\"product_id\":\"2\",\"quantity\":\"330\",\"cost\":\"10\",\"total\":\"3300\"}]"}';
 // $json = '{"list_key":"outletBill","branch_id":"1","department_id":"1","orderby":"Direct","gst_no":"ASDWE1232SD","payment_type":"Online","cgst":"2.5","sgst":"2.5","total":"378","customer_given":"400","need_to_return":"22","created_by":"10010","status":"1","bill_details":"[{\"product_id\":\"1005\",\"quantity\":\"3\",\"costperunit\":\"20\",\"cost\":\"60\"},{\"product_id\":\"1004\",\"quantity\":\"6\",\"costperunit\":\"50\",\"cost\":\"300\"}]"}';

 // $json = '{"list_key":"Report360"}';


if(!empty($json)){
    $data = json_decode($json,true);
    if (is_null($data)) {
      echo json_encode(array("message"=>"Not a proper Json values","status_code"=>400));
    }else{
        
       if(!empty($data['list_key'])){
            $where_values = (!empty($data['condition'])) ? whereCondition($data['condition']) :'';
            $where_in_values = (!empty($data['condition_in'])) ? whereINCondition($data['condition_in'],$where_in_values) :'';
            
            $where_not_in_values = (!empty($data['condition_not_in'])) ? whereNotINCondition($data['condition_not_in'],$where_in_values,$where_values) :'';
            $like_values = (!empty($data['like'])) ? likeCondition($data['like'],$where_values) :'';
            $limit_values =(!empty($data['limit'])) ? limitCondition($data['limit']):"";

           switch($data['list_key'])
           {
               
             case "loginMaster":
               
                $result = $select_class->login_master($data,$conn,$where_values,$like_values,$limit_values);
                
             break;
             
            /** Employee Management  **/
             case "employee_insert":
               
                $result = $insert_class->insert_employee($data,$conn);
                
             break;
             
             case "employee_update":
               
                $result = $update_class->update_employee($data,$conn);
                
             break;
             
             case "updatePriceOutlet":
               
                $result = $update_class->price_outlet_update($data,$conn);
                
             break;
             
             case "deleteRequest":
               
                $result = $update_class->delete_request($data,$conn);
                
             break;
              
              case "trackingUpdate":
               
                $result = $update_class->update_tracking($data,$conn);
                
             break;
             
             case "ProductUpdate":
               
                $result = $update_class->update_product($data,$conn);
                
             break;
             
             case "Report360":
               
                $result = $select_class->report_360_nellai($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "getEmployee":
               
                $result = $select_class->getEmployeeDetails($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "getDashboardDetails":
               
                $result = $select_class->getDashboard_details($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "getProductReport":
               
                $result = $select_class->get_product_report($data,$conn,$where_values,$like_values,$limit_values);
            break; 
            
             case "getOutletstockReport":
               
                $result = $select_class->get_outlet_stockreport($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "getInvoiceReport":
               
                $result = $select_class->get_invoice_report($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "ListPriceOutlet":
               
                $result = $select_class->list_product_outlet($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "salaryList":
               
                $result = $select_class->salary_list($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "AttendenceReport":
               
                $result = $select_class->getAttendence_report($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "getBillingReport":
             
                $result = $select_class->getBilling_report($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "getsalaryProceesing":
               
                $result = $select_class->getsalary_process($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "getBillingavalablity":
               
                $result = $select_class->getBilling_detail($data,$conn,$where_values,$like_values,$limit_values);
            break;
             
             case "getIngProducts":
               
                $result = $select_class->getproductIngDetails($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "login_insert":
               
                $result = $insert_class->insert_login($data,$conn);
                
             break;
             
             
            case "insert_leave":
               
                $result = $insert_class->insert_leave($data,$conn);
                
            break; 
             
             case "attendence_insert":
               
                $result = $insert_class->insert_attendence($data,$conn);
                
             break;
             
             
             
              case "salary_insert":
               
                $result = $insert_class->insert_salary($data,$conn);
                
             break;
             
             case "getAttendenceIndication":
               
                $result = $select_class->getAttendence_indication($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            
             case "getAttendenceDatewise":
                $result = $select_class->getAttendence_datewise($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             /** Employee Management  **/
            
            case "get_master":
               
                $result = $select_class->generalMaster($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "getBranch":
               
                $result = $select_class->getBranchDetails($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            case "getCtc":
               
                $result = $select_class->getCtcDetails($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "getLeaveManagement":
               
                $result = $select_class->getLeaveManagementDetails($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "list_general_tables":
               
                $result = $select_class->generalMaster($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             case "getProducts":
               
                $result = $select_class->getproductDetails($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
            
             case "getIngredient":
               
                $result = $select_class->getingredientDetails($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             
             case "getRequest":
               
                $result = $select_class->get_request($data,$conn,$where_values,$like_values,$limit_values,$where_in_values,$where_not_in_values);
            break;
            
            case "SumProducts":
               
                $result = $select_class->sum_products($data,$conn,$where_values,$like_values,$limit_values,$where_in_values,$where_not_in_values);
            break;
            
             case "getRequestTracking":
               
                $result = $select_class->get_request_tracking($data,$conn,$where_values,$like_values,$limit_values);
            break;
            
             
             case "insertProduct":
               
                $result = $insert_class->insert_products($data,$conn);
                
            break;
            
             case "outletBill":
               
                $result = $insert_class->outlet_billing($data,$conn);
                
            break;
            
             case "createrequest":
               
                $result = $insert_class->request_start($data,$conn);
                
            break;
            
            case "createrequestsame":
               
                $result = $insert_class->same_request_start($data,$conn);
                
            break;
            
            default:
                $result = "invalud argument";
           }
           
           return  $result;
       }else{
            echo json_encode(array("message"=>"Invalid Json","status_code"=>404));
       }
       
    }
}else{   
        echo json_encode(array("message"=>"No post values","status_code"=>404));
}


function whereCondition($where){
    
    foreach($where as $key => $qty){
        
         if(empty($qty))
        {
            continue;
        }
        if (is_numeric($qty))
            $table_update_condition .= $key." = '".$qty."' AND ";
        else	
            $table_update_condition .= $key." = '".$qty."' AND ";
    }
		
	$table_update_condition_where = "";
	if($table_update_condition){
		$table_update_condition	= rtrim($table_update_condition, 'AND ');
	return $table_update_condition_where = " WHERE ".$table_update_condition;
	}
}


function whereINCondition($where){
    
    foreach($where as $key => $qty){
        if($qty < 0)
        {
            continue;
        }
        if (is_numeric($qty))
            $table_update_condition .= $key." IN (".$qty.") AND ";
        else	
            $table_update_condition .= $key." IN (".$qty.") AND ";
    }
		
	$table_update_condition_where = "";
	if($table_update_condition){
		$table_update_condition	= rtrim($table_update_condition, ' AND ');
	return $table_update_condition_where = " WHERE ".$table_update_condition;
	}
}

function whereNotINCondition($where,$whereIN,$nwhere){
    
    
    $where_condition =  ((!empty($whereIN)) || (!empty($nwhere))) ? " AND " : " WHERE ";
    

    foreach($where as $key => $qty){
        if (is_numeric($qty))
            $table_update_condition .= $key." NOT IN (".$qty.") $where_condition";
        else	
            $table_update_condition .= $key." NOT IN (".$qty.") $where_condition";
    }
    
    
		
	$table_update_condition_where = "";
	if($table_update_condition){
		$table_update_condition	= rtrim($table_update_condition, ' AND ');
	return $table_update_condition_where = " ".$where_condition.$table_update_condition;
	}
}

function likeCondition($like,$where){
    
        $like_key= array_keys($like);
        $where_condition =  (!empty($where)) ? " AND " : " WHERE ";
        return $table_like = $where_condition.$like_key[0]." LIKE '%".$like[$like_key[0]]."%'";
}

function limitCondition($like){
    
       
        return $table_like = " LIMIT ".$like;
}
?>