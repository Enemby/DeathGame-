function OnTriggerEnter2D(myobj: Collider2D){
	if(myobj.gameObject.tag == "Untagged" || myobj.gameObject.tag == "DeadCharacter"){
		if(myobj.gameObject.name == "PlayerCharacter(Clone)"||myobj.gameObject.name == "PlayerCharacter"){
			myobj.gameObject.BroadcastMessage("Revive");
		}
		if(myobj.gameObject.name == "DumbEnemy"||myobj.gameObject.name == "DumbEnemy(Clone)"){
			myobj.gameObject.BroadcastMessage("Revive");
		}
	}
}
function OnTriggerStay2D(myobj: Collider2D){
	if(myobj.gameObject.tag == "Untagged" || myobj.gameObject.tag == "DeadCharacter"){
		if(myobj.gameObject.name == "PlayerCharacter(Clone)"||myobj.gameObject.name == "PlayerCharacter"){
			myobj.gameObject.BroadcastMessage("Revive");
		}
		if(myobj.gameObject.name == "DumbEnemy"||myobj.gameObject.name == "DumbEnemy(Clone)"){
			myobj.gameObject.BroadcastMessage("Revive");
		}
	}
}