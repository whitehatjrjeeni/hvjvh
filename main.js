song="";
song2="";
leftwrist_x = 0;
leftwrist_y = 0;
rightwrist_x = 0;
rightwrist_y = 0;
scoreleftwrist = 0;
song_peter_pan = "";
scorerightwrist = 0;
song_harry_potter = "";

function preload()
{
    song =loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(450,200);

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(vedio,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw() {
    image(video,0,0,600,500);

    fill("#37ff00");
    stroke("#ff0000");

    song_peter_pan = song.isplaying();
    console.log("song = "+song_peter_pan);

    song_harry_potter = song2.isplaying();
    console.log("song2 = "+song_harry_potter);

    if(scoreleftwrist > 0.2){
        circle(rightwrist_x,rightwrist_y,20);
        song.stop();
        if(song_harry_potter == false){
            song2.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "song Name : harry potter song"
        }
    }
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("leftwrist_score = "+scoreleftwrist);

        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("rightwrist_score = "+scorerightwrist);

        leftwrist_x = results[0].pose.leftwrist_x;
        leftwrist_y = results[0].pose.leftwrist_y;
        console.log("leftwrist_x = "+leftwrist_x+" leftwrist_y = " +leftwrist_y);

        rightwrist_x = results[0].pose.rightwrist_x;
        rightwrist_y = results[0].pose.rightwrist_y;
        console.log("rightwrist_x = "+rightwrist_x+" rightwrist_y = " +rightwrist_y);
    
    }
}
