void illuminateLed(int number){
  
 
  number = number - 1;
  int x;
  int y;
  x = number % 6 + 1;
  y = number / 6 + 7;
  
  digitalWrite(x, HIGH);
  digitalWrite(y, LOW);
  //delay(1000);
  digitalWrite(x, LOW);
  digitalWrite(y, HIGH);
  //delay(1000);
}
  void setup()
{
  for(int ledPin = 1; ledPin < 13; ledPin++) {
    pinMode(ledPin, OUTPUT);
  }
  for(int ledPin = 1; ledPin < 7; ledPin++) {
    digitalWrite(ledPin, LOW);
  }
  for(int ledPin = 7; ledPin < 13; ledPin++){
    digitalWrite(ledPin, HIGH);
  }
}
void loop(){
   int incomingByte;
  // Center Flashing
  
     if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();
  
  
  for(int duration = 1; duration < 10; duration++){ // Loops through the number of times we want to flash the lights
    if (incomingByte==0){
    for (int flashTime =1; flashTime <5000; flashTime++){ // loops through for the amount of time we want each flash to last
      illuminateLed(15);
      illuminateLed(22);
    }
    for (int flashTime =1; flashTime <5000; flashTime++){ // This is to alternate flashign of LEDs
      illuminateLed(16);
      illuminateLed(21);
    }
  }
 }
 
 if (incomingByte == 1){
  //Middle Layer of Flashing
   for(int duration = 1; duration < 10; duration++){
    for (int flashTime =1; flashTime <2000; flashTime++){
      illuminateLed(8);
      illuminateLed(10);
      illuminateLed(17);
      illuminateLed(20);
      illuminateLed(27);
      illuminateLed(29);
    }
    for (int flashTime =1; flashTime <2000; flashTime++){
      illuminateLed(9);
      illuminateLed(11);
      illuminateLed(14);
      illuminateLed(23);
      illuminateLed(26);
      illuminateLed(28);
    }
  }
 }
  
  //Outer Layer of flashing
  if (incomingByte ==2){
  for(int duration = 1; duration < 10; duration++){
    for (int flashTime =1; flashTime <1000; flashTime++){
      illuminateLed(1);
      illuminateLed(3);
      illuminateLed(5);
      illuminateLed(12);
      illuminateLed(24);
      illuminateLed(36);
      illuminateLed(34);
      illuminateLed(32);
      illuminateLed(25);
      illuminateLed(13);
    }
    for (int flashTime =1; flashTime <1000; flashTime++){
      illuminateLed(2);
      illuminateLed(4);
      illuminateLed(6);
      illuminateLed(18);
      illuminateLed(30);
      illuminateLed(35);
      illuminateLed(33);
      illuminateLed(31);
      illuminateLed(19);
      illuminateLed(7);
    }
  }
}
 }
}


