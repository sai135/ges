var prediction1="";
var prediction2="";

Webcam.set ({
height:300,
width:350,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function takesnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'/>";
    });
}

console.log('ml5 version', ml5.version)

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8Hz2CeVj5/model.json', modelLoaded);

function modelLoaded() {
    console.log('model Loaded!');
}

function speak() {
    var synth=window.speechSynthesis;
    speech_data1="THe first prediction is" + prediction1;
    speech_data2="THe second prediction is" + prediction2;
    var utteThis=new SpeechSynthesisUtterance(speech_data1 + speech_data2);
    synth.speak(utteThis);
}

function check() {
   img= document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {

    if(error) {
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("result_emoji_name").innerHTML=results[0].label;
        document.getElementById("result_emoji_name2").innerHTML=results[1].label;
        prediction1=results[0];
        prediction2=results[1];
        speak();
       
        if(results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128546;";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }


        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128546;";
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}