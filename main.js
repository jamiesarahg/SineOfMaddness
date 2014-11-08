var myMyo = Myo.create();
var l = 0.3;

Myo.on('connected', function(){
    console.log('connected!', this.id)
    document.getElementById('connected').innerHTML = "CONNECTED";
});

Myo.on('disconnected', function(){
    console.log('disconnected!', this.id)
    document.getElementById('connected').innerHTML = "DISCONNECTED";
});

Myo.on('arm_recognized', function(){
    console.log('arm_recognized', this.id)
    document.getElementById('arm_recognized').innerHTML = "ARM RECOGNIZED";
});

Myo.on('arm_lost', function(){
    console.log('arm_lost', this.id)
    document.getElementById('arm_recognized').innerHTML = "ARM LOST";
});

myMyo.on('rest', function(edge){
    if(edge && !myMyo.isLocked) {
    	console.log('rest');
    	data = myMyo.lastIMU;
    	console.log(data);
    	velocity = get_velocity(data);
    	console.log('velocity', velocity);
    	dist = get_distance(velocity);
    	console.log(dist);
    	myMyo.lock();
    }
});

myMyo.on('fingers_spread', function(edge){
    if(edge && !myMyo.isLocked) {
    	console.log('fingers_spread');
    	data = myMyo.lastIMU;
    	console.log(data);
    	velocity = get_velocity(data);
    	console.log('velocity', velocity);
    	dist = get_distance(velocity);
    	console.log(dist);
    	myMyo.lock();
    }
});

myMyo.on('fist', function(edge){
    //Edge is true if it's the start of the pose, false if it's the end of the pose
    myMyo.timer(edge, 500, function(){
    	console.log('fist');
    	myMyo.unlock(2000);
        myMyo.zeroOrientation();
        data = myMyo.lastIMU;
    	console.log(data);
    })
});

function get_velocity (data) {
	alpha = data.gyroscope.y*Math.PI/180;

 	w = data.orientation.x;
 	x = data.orientation.y;
 	y = data.orientation.z;
 	z = data.orientation.w;

    roll = Math.abs(Math.atan2(2*(w*x + y*z),1-2*(Math.pow(x,2)+Math.pow(y,2))));

   	xvel = Math.abs(alpha*Math.cos(roll));
    yvel = Math.abs(alpha*Math.sin(roll));

    return {'xvel':xvel, 'yvel':yvel};
}

function get_distance (velocity) {
	time = (velocity.yvel+Math.sqrt(Math.pow(velocity.yvel,2)+2*9.8))/9.8
	console.log('time', time)
    xdist = time*velocity.xvel
    return xdist
}