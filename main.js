Status = "";
object = [];
alert = "alert.mp3";
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();


}
function start() {
    v1 = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("display").innerHTML = "Status : Detecting Objects";
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (Status == "person") {
        v1.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);

        for (i = 0; i < object.length; i++) {

            document.getElementById("display").innerHTML = "Status : Baby Detected";
            alert.stop();

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "% ", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }

    }
    else {
        document.getElementById("display").innerHTML = "Status : Baby not Detected";
        document.getElementById("number_of_object").innerHTML = "Person not Found : " + object.length;
        alert.play();
    }



}
function modelLoaded() {
    console.log("Model is Loaded");
    Status = true;

}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}
