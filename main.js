var myMyo = Myo.create();
//Make this Myo a bit more sensitive
var thirdMyo = Myo.create(2, {armbusy_threshold : 10});

//After holding thumb to pinky for 1/2 a second, the Myo will be unlocked for 2 seconds
myMyo.on('thumb_to_pinky', function(edge){
    myMyo.timer(edge, 500, function(){
    	console.log('thumb_to_pinky');
        myMyo.unlock(2000);
    })
});

myMyo.on('fingers_spread', function(edge){
    if(!edge) return;
    alert('Hello Myo!');
    myMyo.vibrate();
});

myMyo.on('fist', function(edge){
    //Edge is true if it's the start of the pose, false if it's the end of the pose
    if(edge){
        alert('Hello Myo!');
    }
});