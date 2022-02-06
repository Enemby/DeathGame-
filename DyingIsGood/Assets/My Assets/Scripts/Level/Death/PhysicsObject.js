var myRB : Rigidbody2D;
var magnitudeValue : float = 60;
var myMag : float;
function Start(){
	myRB = GetComponent("Rigidbody2D");
}
function Update(){
	myMag = myRB.velocity.sqrMagnitude;
}
function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.gameObject.tag == "Player"||coll.gameObject.tag == "Enemy"){
		if(myMag > magnitudeValue){
			coll.gameObject.BroadcastMessage("Die");
		}
	}
}