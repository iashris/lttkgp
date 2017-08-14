var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 5000));
var graph = require('fbgraph');
var hbs=require('express-handlebars');
graph.setAccessToken("EAACZCGzCLR30BAK2bI6BvzVvUHa5jhZBHzhbavXIIi4XwaA8K8GvU3gZAdhhYquhowuJUWOfbjanITbKyqLWJlSzN9yGNM7Ov11C5ORWRzGHzrXmfGxTGYJCzMVtZBwh2zs9tI4jtMGBA9tZBuhdJcduOa2ArHdMZD");
graph.setVersion("2.10");
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layouts/'}));
app.set('views',__dirname+'/views');
app.set('view engine','hbs');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('Heyo curious friend, sorry to interrupt you in your investigative venture. If you are trying to look for the source code, it is on Github under the account iashris in the repo lttkgp and brace yourself for some really weird variable names in code. I made this project to take a break from the nervewrecking AR/VR project I am doing now now. So as a gift for finding this easter egg, here\'s an awesome short film I watched yesterday  : https://www.youtube.com/watch?v=0krwKbsQscw This will blow your mind');
})

var daySetter=0;var daySetterx=0;
var Musicsa=[];
var Images=[];
var TIMECONS=1800000;


app.get('/generate',[DoItForToday,DoItForToday2],function(reqa,resa){
//check if the data for today is set. 
//console.log('musics are',Musics);

	var pickmusic=Musicsa[parseInt(Musicsa.length*Math.random())];
	var pickimg=Images[parseInt(Images.length*Math.random())];
	//resa.render('index',{songtime:555})
	if(pickmusic.message=="")songmsg="this is dedicated to mah Prof who I have a crush on.";
	else songmsg=pickmusic.message;
	return resa.render('index',{"postername":pickmusic.poster.split(' ')[0],"songlink":pickmusic.link,"songposter":pickmusic.poster,"title":pickmusic.title,"howago":pickmusic.howago,"songmsg":songmsg,"photosource":pickimg.photosource,"photoalbum":pickimg.albumname,"photopage":pickimg.photopage,"photolink":pickimg.photolink,"perma":pickmusic.perma});
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function DoItForToday(reqq,ress,next){

	var firstbool=false;
	var timenow=new Date().getTime();
	if(timenow-daySetter>TIMECONS){
	//Parse Listen To This KGP for latest 30 posts and then store the video links into them.
	//Now pick a random album of a photography page
	var PHOTOGRAPHY=["187392001335138","431982946812424","179692545405825","1389536757943518","453979384633804","637309269662192","1684834808457693"];
	pickedsource=PHOTOGRAPHY[parseInt(PHOTOGRAPHY.length*Math.random())];
	graph.get(pickedsource+"/albums?limit=20", function(err, res) {
	  
		//fetched the results is res.data
		Images=[];
		for(var j=0;j<10;j++){
			var albumnode=res.data[parseInt(res.data.length*Math.random())];
			graph.get(albumnode.id+"/photos?fields=images,name,album,link,from", function(err, photores) {

				//do this block for 5times
				for(var i=0;i<5;i++){
			var randomphotonum=parseInt(photores.data.length*Math.random());
			var nodepp=photores.data[randomphotonum];
			var linko=nodepp.images[0].source;
			if(nodepp.images[0].width>nodepp.images[0].height && !Images.some(function(el){el.photosource===linko}))Images.push({photosource:linko,albumname:nodepp.album.name,photopage:nodepp.from.name,photolink:nodepp.link});
			//console.log('Images is ',Images.length);
			if(Images.length>=25 && !firstbool){firstbool=true;next();}
		}


		});
		}

});
		daySetter=new Date().getTime();
		console.log('Daysetter now is ',daySetter);
		
	}
	else{
		next()
	}

}
function msToDHM(v) {
  var days = v / 8.64e7 | 0;
  var hrs  = (v % 8.64e7)/ 3.6e6 | 0;
  var mins = Math.round((v % 3.6e6) / 6e4);

  if(days!=0){
  	return days!=1?days + ' days and ' + z(hrs) + " hours ago":'1 day and ' + z(hrs) + " hours ago";
  }
  else{
  	return z(hrs) + ' hours and ' + z(mins)+" minutes ago";
  }
}

function z(n){return (n<10?'0':'')+n;}

function howago(d){
var timesofar=new Date().getTime()-Date.parse(d);
return msToDHM(timesofar);
}
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
function DoItForToday2(reqq,ress,next){
	var timenow=new Date().getTime();
	var secondbool=false;
	if(timenow-daySetterx>TIMECONS){
		Musicsa=[];
		graph.get("/1488511748129645/feed?fields=permalink_url,attachments,story,link,message,updated_time&limit=50", function(err, res) {
	  
		//fetched the results is res.data
			Musics=res.data;
			Musics.forEach(function(v,i){
				if(v.story){
				var poster=v.story.split(' ').slice(0,2).join(' ');
				//console.log(v.poster);
				var a=youtube_parser(v.link);
				if(a!=false && !Musicsa.some(function(el){return el.link===a}) ){Musicsa.push({"link":a,"poster":poster,"message":v.message,"howago":howago(v.updated_time),"title":v.attachments.data[0].title,"perma":v.permalink_url})}
				//console.log('Musicsa is ',Musicsa.length);
				if(Musicsa.length==30 && !secondbool){secondbool=true;next()}
				//resa.render('index',{linkid:link},{wallp:wallpaper});
		}

			});
		});
		daySetterx=new Date().getTime();
		console.log('Daysetterx now is ',daySetterx);
	}
	else{
		next()
	}
}