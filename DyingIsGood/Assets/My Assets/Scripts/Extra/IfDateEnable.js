var myMonth : int = 1;
var myDay : int = 13;
var myObject : GameObject;
function Start(){
	var mySystem = System.DateTime.Now;
	if(mySystem.Month == myMonth && mySystem.Day == myDay){
		Debug.Log("It's TODAY!");
		myObject.active = true;
		Destroy(this); //Remove script, doing nothing.
	}
	else{
		Destroy(myObject.gameObject); //Remove gameobject, hiding whatever we shouldn't see.
		Destroy(this); //Remove script
	}
	Debug.Log(mySystem.Month);
	Debug.Log(mySystem.Day);
}