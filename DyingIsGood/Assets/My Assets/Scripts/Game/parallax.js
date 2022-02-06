var maincam : GameObject;
var speedX : float = 0.00001;
var speedY : float;
var startPosX : float = 0;
var startPosY : float = 0;
function Start(){
	startPosX = this.transform.position.x;
	startPosy = this.transform.position.y;
}
function Update () {
	this.transform.position.x =startPosX+ maincam.transform.position.x*speedX;
	this.transform.position.y =startPosY+ maincam.transform.position.y*speedY;
}