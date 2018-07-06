var prevPageId;
var nextPageId; 

//  loads data to DOM

function callback(data){
//if the input is not empty, then the div tag should be filled with some data 

	if($("#title").val()){

//if the total search result is not zero, rendering should proceed 		

		if(data.pageInfo.totalResults){
			$("#video_div").empty();
			for (var i  =0; i < data.items.length; i++){
				if(data.items[i].id.videoId !== undefined){
					$("#video_div").append('<div id="video"><a href="http://youtube.com/watch?v=' + data.items[i].id.videoId+ '"><img src="' + data.items[i].snippet.thumbnails.medium.url + ' " /></a><p><hr />' +  data.items[i].snippet.title +  '</p></div>');
				}
			}
		/*stores the nextpagetoken in the global variable nextTokenId
		and if it's not the first page it should save the previous page Id */
		
		nextPageId = data.nextPageToken;
		if(data.prevPageToken){
			prevPageId = data.prevPageToken
		     $("#prev-but").show();
			}
		$("#next-but").show();
		} else {
			$("#video_div").append('<h1>Sorry, No video was found </h1>')
		}
	} else {
		$("#video_div").html('<h2>Enter search title</h2>');
	}
} 

//fetches and display data with the callback 

function displayData(element){
	var url = "https://www.googleapis.com/youtube/v3/search";
	var searchItem = $(element).val();
	var query = {
		part: "snippet",
		q: searchItem,
		maxResults: 10,
		key: "AIzaSyALEV-N3oFSjwtD-75FR2VtSVmgjeYW28U"
	}
	$.getJSON(url, query, callback);

}

//fetches the next page data 

function getNextPage() {
	var url = "https://www.googleapis.com/youtube/v3/search";
	var searchItem = $("#title").val();
	var query = {
		part: "snippet",
		q: searchItem,
		maxResults: 10,
		pageToken: nextPageId,
		key: "AIzaSyALEV-N3oFSjwtD-75FR2VtSVmgjeYW28U"
	}
	$.getJSON(url, query, callback);
}

//fetches previous page data

function getPrevPage() {
	var url = "https://www.googleapis.com/youtube/v3/search";
	var searchItem = $("#title").val();
	var query = {
		part: "snippet",
		q: searchItem,
		maxResults: 10,
		pageToken: prevPageId,
		key: "AIzaSyALEV-N3oFSjwtD-75FR2VtSVmgjeYW28U"
	}
	$.getJSON(url, query, callback);
}

//add class "shadow" to the element

function inputCss(element){
	$(element).addClass("shadow");
}
//event listeners with jquery 
$(function() {
	
//hides the previous and next button when pages loads 	
	$("#next-but").hide();
	$("#prev-but").hide();

//adds shadow to box on focus and removes on blur 		
	$("#title").focus(function(){
		inputCss(this);
	});
	
	$("#title").blur(function(){
		$(this).removeClass("shadow");
	})
	
//renders data in the DOM
	$("form").submit(function(e) {
	e.preventDefault();
	displayData("#title");
	});
	
	$("#next-but").click(function(e){
		e.preventDefault();
		getNextPage();
	});
	
	$("#prev-but").click(function(e){
		e.preventDefault();
		getPrevPage();
	});
	
	}); 