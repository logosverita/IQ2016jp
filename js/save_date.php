<?php
// Ajax以外からのアクセスを遮断
$request = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
if($request !== 'xmlhttprequest') exit;

	$ans = $_COOKIE["iq2016-answers"];
	$time = $_COOKIE["iq2016-time"];
	$time = explode(":", $time);
	$time[0] = ($time[0] / 1000) ;
	$time[1] = ($time[1] / 1000) ;
	$time_left = date("i:s",43*60 - ($time[1] - $time[0]) );		// 残り時間
	$time_start = date("Y/m/d H:i:s",$time[0]);				// 開始時間
	$ip = json_encode($_SERVER['REMOTE_ADDR']);
	$ip = str_replace(".", "-", $ip);
	$ip = str_replace('"', "", $ip);

	$date = $time_start."\t". $ans . "\t\t" .$time_left. "\n\n";

	$save_point = $ip.'.dat';
	if ( file_exists($save_point)){
		$fp = fopen($save_point, "a");
		fwrite($fp,$date,150);
		fclose($fp);
	}
	else{
		$fp = fopen($save_point, "w");
		fwrite($fp,$date,150);
		fclose($fp);
	}
?>
