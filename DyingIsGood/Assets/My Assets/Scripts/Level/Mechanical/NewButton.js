var door : GameObject[];
var found : boolean = false;
var currentTimeScale : float = 0;
var sprites : Sprite[];
private var myRenderer;
var lastName = "";
function Start(){
	myRenderer = GetComponent(SpriteRenderer);
	lastName = gameObject.name;
}
function gateSwitch(){
	for(i=0;i<door.Length;i++){
	if(door[i].active == true){
		door[i].active = false;
		myRenderer.sprite = sprites[0];
	}
	else{
		door[i].active = true;
		myRenderer.sprite = sprites[1];
	}
	}
}
function doorCheck(){
	currentTimeScale = Time.timeScale;
	var potentials : GameObject[] = GameObject.FindObjectsOfType(GameObject);
	var actuals : Array = [];
	for(i=0;i < potentials.Length;i++){
		if(potentials[i].gameObject.name == this.transform.gameObject.name && potentials[i] != this.gameObject){
			actuals.Add(potentials[i]);
		}
	}
	if(actuals.length > 0){
		door = actuals;
	}
	else{
		for(i=0;i < potentials.Length;i++){
			if(potentials[i].gameObject.name == "Door(Clone)"||potentials[i].gameObject.name == "Door"||potentials[i].gameObject.name == "Door(Clone) "){
				actuals.Add(potentials[i]);
			}
		}
		door = actuals;
	}
}
function Update(){
	if(found == false){ //Without this if statement, the door can only open, not close.
		if(this.gameObject.transform.parent == null){
			doorCheck();
			found = true;
		}
	}
	if(currentTimeScale != Time.timeScale){
		found = false;
	}
	else{
		if(lastName != gameObject.name && door.Length <= 0){
			found = false;
			lastName = gameObject.name;
		}
}
	
}
function OnTriggerEnter2D(otherobj : Collider2D){
	if(otherobj.tag == "Player"||otherobj.tag == "Enemy"||otherobj.tag == "Activator"){
		if(door != null){
			gateSwitch();
		}
	}
}