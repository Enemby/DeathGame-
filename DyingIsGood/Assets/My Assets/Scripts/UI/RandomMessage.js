var myText : UI.Text;
var messages : String[] = ["Welcome!","Hi!"];
var Up : boolean = false;
var myScaleMax : float = 1.5;
var myScaleMin : float = 0.35;
var speed : float = 1;
function Start(){
	myText.text = messages[Random.Range(0,messages.Length-1)];
}
function flipScale(){
	if(Up == false){
		Up = true;
	}
	else{
		Up = false;
	}
}
function Update () {
	if(Up == false && this.transform.localScale.x > myScaleMin && this.transform.localScale.y > myScaleMin){
		this.transform.localScale.x -= Time.deltaTime* speed;
		this.transform.localScale.y -= Time.deltaTime* speed;
	}
	else{
		if(Up == true && this.transform.localScale.x < myScaleMax && this.transform.localScale.y < myScaleMax){
			this.transform.localScale.x += Time.deltaTime* speed;
			this.transform.localScale.y += Time.deltaTime* speed;
		}
	}
	if(this.transform.localScale.y > myScaleMax||this.transform.localScale.y < myScaleMin){
		flipScale();	
	 } 
}