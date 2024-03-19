function start_test(){	// var time set のため必要
	$("#main").load("1.txt");
	init();
}

function preload(a){
	var qs = new Array("a","b","c","d","e","f","g","h");
//	var flag = Cookies.get('iq2016-flags');
	//var b = parseInt(flag) + 1;
	for (i =a; i <= a; i++){
		var gif_q = "img/q"+i+"/q"+i+".gif";
		$("<img>").attr("src", gif_q);
		for (j=0; j < qs.length; j++){
			var gif_a = "img/q"+i+"/q"+i+"-"+qs[j]+".gif";
			$("<img>").attr("src", gif_a);
		}
	}
}
function change_question(q){
	var flag = q;
	Cookies.set('iq2016-flags', flag, { expires: 1});
	$("#main").load("001.txt",  function(){
			var txt = $(this).html();
			$(this).html(txt.replace(/ψ/g, flag) );
		change_color();
	});
}
function change_color(){
	var flag = Cookies.get('iq2016-flags');
	var str = Cookies.get('iq2016-answers');
	var answer_list = str.split(",");		// Cookie文字列を配列へ
	for (i = 0; i<=38; i++){
		var x = i+1;
		if (answer_list[i] != 0){
			document.getElementById(i+1).style.backgroundColor = "#555";
			document.getElementById(i+1).innerHTML = x+answer_list[i];
		}
	}
}
function click_anwers(answer){
	var flag = Cookies.get('iq2016-flags');
	var str = Cookies.get('iq2016-answers');
	var answer_list = str.split(",");		// Cookie文字列を配列へ
	answer_list[flag-1] = answer;		// 対応する配列に答えを代入
	var save = answer_list.join(",");		// 配列をCookieに保存するため文字列化
	Cookies.set('iq2016-answers', save, { expires: 1}); // 保存
	flag = parseInt(flag) + 1;
	if (flag == 39){
		flag = 38;
		$("#main").load("001.txt",  function(){
			var txt = $(this).html();
			$(this).html(txt.replace(/ψ/g, flag) );
			change_color();
		});
	}
	else{
		Cookies.set('iq2016-flags', flag, { expires: 1});
		$("#main").load("001.txt",  function(){
			var txt = $(this).html();
			$(this).html(txt.replace(/ψ/g, flag) );
			change_color();
		});
		preload(flag+1);					// 次の問題をプリロード
	}
}

function result(){
	var set_time =  Cookies.get('iq2016-time');
	var send_time = new Date().getTime();
	Cookies.set('iq2016-time', set_time+":"+send_time, { expires: 1});
	var str = Cookies.get('iq2016-answers');
	var answer_list = str.split(",");		// Cookie文字列を配列へ
	var correct_list = new Array("a","e","c","b","d","h","f","b","h","b","e","g","c","b","g","c","c","c","e","e","b","e","c","a","g","f","b","d","c","c","a","b","a","d","a","a","h","e");
	var score_point = new Array(1,1,1,1,1,1.5,1,1,1.5,1.5,1,1.5,1.5,1.5,1.5,1.5,1.5,1.5,2,1.5,1.5,2.5,2,2,2,2,2,2.5,2,2.5,2.5,2,2,2.5,2,2.5,2.5,2.5,1);

	var score = 79;
	for ( i = 0; i < correct_list.length; i++){
		if (answer_list[i] == correct_list[i]){
			score = score + score_point[i];
		}
	}

	var url = "http://inspirationlife.jp/iq2016jp/txt/save_date.php"
	$.ajax(
	{
		url: url,
		cache: false,
		success: function(data){},
		error : function(){}
	});

	$("#main").load("result.txt",  function(){
			var txt = $(this).html();
			$(this).html(txt.replace(/Ο/g, score) );
			drow_chart();
		});
}

function drow_chart(){
	var data = {
		labels: ["60", "70", "80", "90", "100", "110", "120", "130", "140"],
		datasets: [{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [	  	0.011396,
						0.053991,
						0.1640101,
						0.319448,
						0.3989423,
						0.319448,
						0.1640101,
						0.053991,
						0.011396
			 		]
		}]
	};
	var option = {
		scaleBeginAtZero : true,
		scaleShowLabels : false,
		scaleShowGridLines : false,
		showTooltips: false
	}
	var ctx = $("#graph").get(0).getContext("2d");
	var graph = new Chart(ctx).Line(data);
}

function init(){
	var anser_list = new Array("0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0");
	var str = anser_list.join(",");
	var now_time =  new Date().getTime();
	Cookies.set('iq2016-answers', str, { expires: 1});
	Cookies.set('iq2016-flags', '1', { expires: 1});
	Cookies.set('iq2016-time', now_time, { expires: 1});

	//location.reload();
}
