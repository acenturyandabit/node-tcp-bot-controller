# node-tcp-bot-controller
A Controller that you can run on your android phone to control a robot based around a wifi chip like the NodeMCU.

## How it works


## How to use
1. Create a robot with a nodeMCU and 2 wheels, driven by a H bridge. 
2. Create a serial protocol that responds to signals like so:

```c
pins = [11,12,13,14]; // for example
void receiveSignal(char * msg, int len){
  for (int i=0;i<len;i+=2){
      digitalWrite(pins[msg[i] - '0'], msg[i+1]=='o'?1:0);
  }
}
```

3. Install Termux on your android phone, if you are using an android phone. If you are using a PC, then you can skip down to step 6.
4. Download nodejs on termux on your phone:
`pkg install nodejs`
5. Download git on your termux:
`pkg install git`
6. Clone this repository on your phone/computer.
7. Run `npm install`.
8. Run `node index.js`.
9. Start a wifi hotspot, and make sure your nodeMCU can connect to the hotspot. (Using a hotspot on your bot is precarious, as it draws a lot of power.)
9. Head to `localhost:8022`. There should be a black circle. Drag it around with your mouse / finger. 
10. Enjoy!
