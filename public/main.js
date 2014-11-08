var myMyo = Myo.create();
var l = 0.3;
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {baudrate 9600});
Myo.on('connected', function(){
    console.log('connected!', this.id)
    document.getElementById('connected').innerHTML = "CONNECTED";
    document.getElementById('connected').classList.remove('lost');
});

Myo.on('disconnected', function(){
    console.log('disconnected!', this.id)
    document.getElementById('connected').innerHTML = "DISCONNECTED";
    document.getElementById('connected').classList.add('lost');
});

Myo.on('arm_recognized', function(){
    console.log('arm_recognized', this.id)
    document.getElementById('arm_recognized').innerHTML = "ARM RECOGNIZED";
    document.getElementById('arm_recognized').classList.remove('lost');
});

Myo.on('arm_lost', function(){
    console.log('arm_lost', this.id)
    document.getElementById('arm_recognized').innerHTML = "ARM LOST";
    document.getElementById('arm_recognized').classList.add('lost');
});

myMyo.on('rest', function(edge){
    if(edge && !myMyo.isLocked) {
    	console.log('rest');
    	data = myMyo.lastIMU;
    	console.log(data);
    	velocity = get_velocity(data);
    	console.log('velocity', velocity);
    	dist = get_distance(velocity);

        if (dist > 2 || if dist < .5){
            out = 2
        }
        else if (dist >1.5 || dist <1){
            out = 1
        }
        else{out = 0}
        serialPort.on("open", function () {
            console.log('open');
            serialPort.on('data', function(data) {
                console.log('data received: ' + data);
            });
            serialPort.write("ls\n", function(err, results) {
                console.log('err ' + err);
                console.log('results ' + results);
            });
        });
        serialPort.write(out)
        serialPort.close()
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
    	document.getElementById('readyCircle').style.display = "block";
    	myMyo.unlock(2000);
        myMyo.zeroOrientation();
        data = myMyo.lastIMU;
    	console.log(data);
    })
    if (!edge) {
    	document.getElementById('readyCircle').style.display = "none";
    };
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