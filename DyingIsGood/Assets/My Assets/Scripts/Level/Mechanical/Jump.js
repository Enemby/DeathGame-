#pragma strict

function Start () {

}

function Update () {

}
function OnTriggerEnter2D(other: Collider2D) {
	if(other.tag == "Player" && Application.loadedLevel != 6){ //Are we in the editor?
		GameObject.Find("Game").BroadcastMessage("jumpNext");
	}
	else{
		if(other.tag == "Enemy"){
			Destroy(other.gameObject);
		}
	}
}