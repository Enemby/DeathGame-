var pushForce : float = 100;
var pistonSprites : Sprite[]; //0/closed 1/open
var timer : float = 0;
var cooldown : float = 1;
var pistonClip : AudioClip;
function pushObject(myobj : GameObject){
	this.GetComponent(AudioSource).pitch = Random.Range(0.9,1.1);
	this.GetComponent(AudioSource).clip = pistonClip;
	this.GetComponent(AudioSource).Play();
	if(timer <= 0.01){
		this.GetComponent(SpriteRenderer).sprite = pistonSprites[1];
		myobj.GetComponent(Rigidbody2D).AddForce(Vector2(this.transform.right.x,this.transform.right.y)*pushForce);
		if(this.GetComponent("Rigidbody2D") != null){
			this.GetComponent(Rigidbody2D).AddForce(-Vector2(this.transform.right.x,this.transform.right.y)*pushForce);
		}
		timer = cooldown;
	}
}
function OnCollisionEnter2D(otherobj : Collision2D){
	if(otherobj.gameObject.tag == "Player"||otherobj.gameObject.tag == "Enemy"||otherobj.gameObject.tag == "DeadCharacter"||otherobj.gameObject.tag == "PhysicsObject"){
		pushObject(otherobj.gameObject);
		otherobj.gameObject.BroadcastMessage("randomDirection");
	}
}
function Update(){
	if(timer > 0){
		timer-=Time.deltaTime;
	}
	else{
		timer = 0;
		this.GetComponent(SpriteRenderer).sprite = pistonSprites[0];
	}
}