var door : GameObject;
function gateSwitch(){
	if(door.active == true){
		door.active = false;
	}
	else{
		door.active = true;
	}
}
function OnTriggerEnter2D(otherobj : Collider2D){
	if(otherobj.tag == "Player"||otherobj.tag == "Enemy"){
		gateSwitch();
	}
}