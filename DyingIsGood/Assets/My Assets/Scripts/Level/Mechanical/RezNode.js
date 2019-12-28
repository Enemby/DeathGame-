function OnTriggerEnter2D(myobj: Collider2D){
	if(myobj.gameObject.tag == "Untagged"){
		if(myobj.gameObject.name == "PlayerCharacter(Clone)"||myobj.gameObject.name == "PlayerCharacter"){
			myobj.gameObject.BroadcastMessage("Revive");
		}
		if(myobj.gameObject.name == "DumbEnemy"||myobj.gameObject.name == "DumbEnemy(Clone)"){
			myobj.gameObject.BroadcastMessage("Revive");
		}
	}
}