<?php
// Ajax以外からのアクセスを遮断
// $request = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
//if($request !== 'xmlhttprequest') exit;

$save_point_js = "count_challengers.js";

$dir_s = 'http://inspirationlife.jp/iq2016jp/txt/';
$files = scandir ($dir_s);
$count = count($files);
// $str1 = """document.write('<span class="charengers"><p class="text-center">いままでに""";
 //$str2 = """人が挑戦しました。</p></span>')""";
//$date =$str1 . $count  . $str2;

echo $count."<br>";
echo "test"."<br>";
echo $dir_s;
//$fp_add = fopen($save_point_js, "w");
//fwrite($fp_add,$date);
//fclose($fp_add);


echo '2008年', '10月', '7日', '<br />';
print "月曜日";

?>