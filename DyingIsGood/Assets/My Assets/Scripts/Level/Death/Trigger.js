function OnTriggerEnter2D(otherobj : Collider2D){
	if(otherobj.tag == "Player"||otherobj.tag == "Enemy"){
		otherobj.BroadcastMessage("Die");
	}
}