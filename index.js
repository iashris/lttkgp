var express = require('express')
var app = express()
var graph = require('fbgraph');
var hbs=require('express-handlebars');
graph.setAccessToken("EAACZCGzCLR30BAK2bI6BvzVvUHa5jhZBHzhbavXIIi4XwaA8K8GvU3gZAdhhYquhowuJUWOfbjanITbKyqLWJlSzN9yGNM7Ov11C5ORWRzGHzrXmfGxTGYJCzMVtZBwh2zs9tI4jtMGBA9tZBuhdJcduOa2ArHdMZD");
graph.setVersion("2.10");
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layouts/'}));
app.set('views',__dirname+'/views');
app.set('view engine','hbs');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('Hello world');
})

var daySetter=0;var daySetterx=0;
var Musicsa=[];
var Images=[];

app.use(DoItForToday);
app.use(DoItForToday2);
app.get('/generate',function(reqa,resa){
//check if the data for today is set. 
//console.log('musics are',Musics);
	var pickmusic=Musicsa[parseInt(Musicsa.length*Math.random())];
	var pickimg=Images[parseInt(Images.length*Math.random())];
	//resa.render('index',{songtime:555})
	if(pickmusic.message=="")songmsg="this is dedicated to mah Prof who I have a crush on.";
	else songmsg=pickmusic.message;
	return resa.render('index',{"postername":pickmusic.poster.split(' ')[0],"songlink":pickmusic.link,"songposter":pickmusic.poster,"title":pickmusic.title,"howago":pickmusic.howago,"songmsg":songmsg,"photosource":pickimg.photosource,"photoalbum":pickimg.albumname,"photopage":pickimg.photopage,"photolink":pickimg.photolink,"perma":pickmusic.perma});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


function DoItForToday(reqq,ress,next){


	var timenow=new Date().getTime();
	if(timenow-daySetter>1342022){
	//Parse Listen To This KGP for latest 30 posts and then store the video links into them.


	//Now pick a random album of a photography page
	var PHOTOGRAPHY=[{"name":"Click KGP","link":"https://www.facebook.com/clickkgp/","id":"187392001335138"},
					{"name":"Paras Prateek Fotografia","link":"https://www.facebook.com/parasprateekfotografia/","id":"431982946812424"},
					{"name":"Mayank Choudhary's Photography","link":"https://www.facebook.com/mayank.photography/","id":"179692545405825"}];
	pickedsource=PHOTOGRAPHY[parseInt(PHOTOGRAPHY.length*Math.random())];
	graph.get(pickedsource.id+"/albums?limit=20", function(err, res) {
	  
		//fetched the results is res.data
		Images=[];

		for(var j=0;j<10;j++){
			var albumnode=res.data[parseInt(res.data.length*Math.random())];
			graph.get(albumnode.id+"/photos", function(err, photores) {
				for(var i=0;i<5;i++){
					var randomphotonum=photores.data[parseInt(photores.data.length*Math.random())];
					graph.get(randomphotonum.id+"?fields=images,name,album,link,from", function(err, respo) {
						var linko=respo.images[0].source;
						if(respo.images[0].width>respo.images[0].height)Images.push({photosource:linko,albumname:respo.album.name,photopage:respo.from.name,photocaption:respo.name,photolink:respo.link});
						if(Images.length==22){next()}
				});
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
	if(timenow-daySetterx>1342022){
		Musicsa=[];
		graph.get("/1488511748129645/feed?fields=permalink_url,attachments,story,link,message,updated_time&limit=30", function(err, res) {
	  
		//fetched the results is res.data
			Musics=res.data;
			Musics.forEach(function(v,i){
				var poster=v.story.split(' ').slice(0,2).join(' ');
				//console.log(v.poster);
				var a=youtube_parser(v.link);
				if(a!=false){Musicsa.push({"link":a,"poster":poster,"message":v.message,"howago":howago(v.updated_time),"title":v.attachments.data[0].title,"perma":v.permalink_url})}
				if(Musicsa.length==20){next()}
				//resa.render('index',{linkid:link},{wallp:wallpaper});

			});
		});
		daySetterx=new Date().getTime();
		console.log('Daysetterx now is ',daySetterx);
	}
	else{
		next()
	}
}