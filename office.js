img = "";
status = "";
objects = [];

function preload(){
    img = loadImage ("office.jpg");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center()
    obtection = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML= "Status: Detecting objects";
}

function modelloaded(){
    console.log("it works!");
    status = true;
}

function gotresults(error,results){
    if(error){
        console.error(error);
    }
    else{
    console.log(results);
    objects = results;
    }
}

function draw(){
    image(img,0,0,380,380);

    if(status != ""){

        obtection.detect(img,gotresults);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML= "Objects detected";
            document.getElementById("num_objects").innerHTML= "Number of objects detected:" + objects.length;
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}