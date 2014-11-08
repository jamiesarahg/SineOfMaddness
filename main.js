var myMyo = Myo.create();

Myo.on('connected', function(){
    console.log('connected!', this.id)
});

myMyo.on('rest', function(edge){
    if(edge && !myMyo.isLocked) {
    	console.log('rest');
    	data=myMyo.lastIMU;
    	console.log(data);
    	myMyo.lock();
    }
});

myMyo.on('fist', function(edge){
    //Edge is true if it's the start of the pose, false if it's the end of the pose
    myMyo.timer(edge, 500, function(){
    	console.log('fist');
    	myMyo.unlock(2000);
        myMyo.zeroOrientation();
    })
});