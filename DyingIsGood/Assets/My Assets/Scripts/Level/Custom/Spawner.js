var myTimer : float = 0;
var timerTimer : float = 5.0f;
public var myObject : GameObject;
function Update () {
	myTimer+=Time.deltaTime;
	if(myTimer > timerTimer){
		Spawn();
		myTimer = 0;
	}
}
function Spawn(){
	Instantiate(myObject,this.transform.position,Quaternion.identity);
}