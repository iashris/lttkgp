var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 5000));
var graph = require('fbgraph');
var hbs = require('express-handlebars');
graph.setAccessToken("EAACZCGzCLR30BAK2bI6BvzVvUHa5jhZBHzhbavXIIi4XwaA8K8GvU3gZAdhhYquhowuJUWOfbjanITbKyqLWJlSzN9yGNM7Ov11C5ORWRzGHzrXmfGxTGYJCzMVtZBwh2zs9tI4jtMGBA9tZBuhdJcduOa2ArHdMZD");
graph.setVersion("2.10");
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('Heyo curious friend, sorry to interrupt you in your investigative venture. If you are trying to look for the source code, it is on Github under the account iashris in the repo lttkgp and brace yourself for some really weird variable names in code. I made this project to take a break from the nervewrecking AR/VR project I am doing now now. So as a gift for finding this easter egg, here\'s an awesome short film I watched yesterday  : https://www.youtube.com/watch?v=0krwKbsQscw This will blow your mind');
})

var daySetter = 0;
var Musicsa = [];
var Images = [];
var TIMECONS = 1800000;
var albumoverride = undefined;

app.get('/generate', [DoItForToday, DoItForToday2], function(reqa, resa) {
    //check if the data for today is set.
    //console.log('musics are',Musics);

    var pickmusic = Musicsa[parseInt(Musicsa.length * Math.random())];
    var pickimg = Images[parseInt(Images.length * Math.random())];
    //resa.render('index',{songtime:555})
    if (pickmusic.message == "") songmsg = "this is dedicated to mah Prof who I have a crush on.";
    else songmsg = pickmusic.message;
    return resa.render('index', { "postername": pickmusic.poster.split(' ')[0], "songlink": pickmusic.link, "songposter": pickmusic.poster, "title": pickmusic.title, "howago": pickmusic.howago, "songmsg": songmsg, "photosource": pickimg.photosource, "photoalbum": pickimg.albumname, "photopage": pickimg.photopage, "photolink": pickimg.photolink, "perma": pickmusic.perma });
});
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}
app.get('/serve', [DoItForToday, DoItForToday2], function(reqa, resa) {
    //check if the data for today is set.
    //console.log('musics are',Musics);

    Imagesa=getRandom(Images,120);
    var tosend = { musics: [], images: [] };
    for (var i = 0; i < Musicsa.length; i++) {
        var pickmusic = Musicsa[i];
        tosend["musics"].push({ "postername": pickmusic.poster.split(' ')[0], "songlink": pickmusic.link, "songposter": pickmusic.poster, "title": pickmusic.title, "howago": pickmusic.howago, "songmsg": pickmusic.message });
    }
    for (var i = 0; i < Imagesa.length; i++) {
        var pickimg = Imagesa[i];
        if (!pickmusic.message) pickmusic.message = "this is dedicated to mah Prof who I have a crush on.";
        tosend["images"].push({ "photosource": pickimg.photosource, "photoalbum": pickimg.albumname, "photopage": pickimg.photopage, "photolink": pickimg.photolink, "perma": pickmusic.perma });
    }
    return resa.send(tosend);
});

app.get('/broadcast/:id', function(reqa, resa) {
    var ytid = reqa.params.id;
    resa.send('<iframe width="560" height="395" src="https://www.youtube.com/embed/' + ytid + '?ecver=1&autoplay=1" frameborder="0" autoplay="autoplay" allowfullscreen></iframe>')
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

function DoItForToday(reqq, ress, next) {
if(new Date().getTime()-daySetter<16000000)next();
    var firstbool = false;
    Images = [];
    //Parse Listen To This KGP for latest 30 posts and then store the video links into them.
    //Now pick a random album of a photography page
    var PHOTOGRAPHY = ["187392001335138", "431982946812424", "179692545405825", "1389536757943518", "453979384633804", "637309269662192", "1684834808457693"];
    var ALBUMS=["194944550579883","194505023957169","238929672848037","243855245688813","414246398649696","199557176785287","190069184400753","270599473014390","1159011797506482","1166130790127916","1166191723455156","190093604398311","656759624398371","1263319897075671","1285253298215664","1284599398281054","1285884901485837","1286991988041795","1291815640892763","1294668067274187","1305067426234251","1303289169745410","1295885283819132","1286540648086929","1345195572221436","1341683459239314","1382653558475637","1408624235878569","1540526402688351","1529005637173761","1530725490335109","1513877848686540","200054530068885","190540381020300","1670210746542783","1636923573204834","1682048332025691","1598889993674859","1692500170980507","1698067003757157","1705957499634774","1928948057335716","1933256626904859","1941802899383565","1851830575047465","1847621972134992","1842345639329292","1635453590018499","1732789786951545","1633006910263167","1684872845120556","1684875425120298","1953665868241251","1763606367247203","1768476783426828","1772352183039288","254350607940018","612306125477796","424115727630171","590502680991474","522749561100120","258742584167487","565845090123900","509539879087755","494165433958533","1604890709542660","1493612224003843","1017162278315509","1013072338724503","1233727526658982","957864524245285","240607279406228","220530734747216"];
    pickedsource = PHOTOGRAPHY[parseInt(PHOTOGRAPHY.length * Math.random())];

    var extractphotos = function(photonodes) {
        for (var i = 0; i < photonodes.length; i++) {
            var thisphoto = photonodes[i];
            if (thisphoto.images[0].width > thisphoto.images[0].height &&Math.random()<0.25 && !Images.some(function(el) { return el.photosource === thisphoto.images[0].link })) Images.push({ photosource: thisphoto.images[0].source, albumname: thisphoto.album.name, photopage: thisphoto.from.name, photolink: thisphoto.link });
        		//console.log('Images is ',Images.length);
        		if(Images.length>=200 && !firstbool){firstbool=true;next();}
        }
    };
    //while (Images.length < 200) {
    	var redoit=function(){
        var albumid = ALBUMS[parseInt(ALBUMS.length * Math.random())];

        graph.get(albumid + "/photos?fields=images,name,album,link,from&limit=200", function(err, photos) {
            extractphotos(photos.data);
            if (photos.paging && photos.paging.next) {
                graph.get(photos.paging.next, function(err, photos2) {
                    extractphotos(photos2.data);
                });
            }
            if(Images.length<200)redoit();
        });
}
    //}
redoit();


    // graph.get(pickedsource + "/albums?limit=20", function(err, res) {

    //     //fetched the results is res.data

    //     for (var j = 0; j < 10; j++) {
    //         var albumid = res.data[parseInt(res.data.length * Math.random())].id;
    //         if (albumoverride != undefined) albumid = albumoverride; //override custom album/
    //         graph.get(albumid + "/photos?fields=images,name,album,link,from", function(err, photores) {


    //             //pick all images
    //             //do this block for 5times
    //             for (var i = 0; i < 5; i++) {
    //                 var randomphotonum = parseInt(photores.data.length * Math.random());
    //                 var nodepp = photores.data[randomphotonum];
    //                 var linko = nodepp.images[0].source;
    //                 if (nodepp.images[0].width > nodepp.images[0].height && !Images.some(function(el) { return el.photosource === linko })) Images.push({ photosource: linko, albumname: nodepp.album.name, photopage: nodepp.from.name, photolink: nodepp.link });
    //                 //console.log('Images is ',Images.length);
    //                 if (Images.length >= 15 && !firstbool) { console.log('Images length ', Images.length);
    //                     firstbool = true;
    //                     next(); }
    //             }


    //         });
    //     }

    // });

}

function msToDHM(v) {
    var days = v / 8.64e7 | 0;
    var hrs = (v % 8.64e7) / 3.6e6 | 0;
    var mins = Math.round((v % 3.6e6) / 6e4);

    if (days != 0) {
        return days != 1 ? days + ' days and ' + z(hrs) + " hours ago" : '1 day and ' + z(hrs) + " hours ago";
    } else {
        return z(hrs) + ' hours and ' + z(mins) + " minutes ago";
    }
}

function z(n) { return (n < 10 ? '0' : '') + n; }

function howago(d) {
    var timesofar = new Date().getTime() - Date.parse(d);
    return msToDHM(timesofar);
}
var youtube_parser = function(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}




function DoItForToday2(reqq, ress, next) {
	if(new Date().getTime()-daySetter<16000000)next();
    var extractor = function(kernel) {
        kernel.forEach(function(v) {
            if (v.story && v.link) {
                var poster = v.story.split(' ').slice(0, 2).join(' ');
                var a = youtube_parser(v.link);
                if (a != false && !Musicsa.some(function(el) { return el.link === a })) { Musicsa.push({ "link": a, "poster": poster, "message": v.message, "howago": howago(v.updated_time), "title": v.attachments.data[0].title, "perma": v.permalink_url }) }
                validate();
            }
        })
    };
    var validate = function() {
        if (Musicsa.length == 60 && !secondbool) { //console.log(Musicsa);
            secondbool = true;
            daySetter=new Date().getTime();
            next() }
    };
    secondbool = false;
    Musicsa = [];
    graph.get("/1488511748129645/feed?fields=permalink_url,attachments,story,link,message,updated_time&limit=50", function(err, res) {

        //fetched the results is res.data
        ker = res.data;
        extractor(ker);
        if (res.paging && res.paging.next) {
            graph.get(res.paging.next, function(err, res2) {
                extractor(res2.data);
            })
        }
    });
}
