var myName;
var myObjectName : String;
var action : String;
var acted : boolean = false;
var timerArray : GameObject[];
function Start(){
	this.transform.tag = "Modifier";
}
function FixedUpdate () {
	if(acted == false){
		myName = this.transform.name;
		myObjectName = myName.Substring(GetObjectName(myName,0),GetObjectName(myName,1)-1-GetObjectName(myName,0));
		action = myName.Substring(0,GetObjectName(myName,0)-1); //What modification are we making?
		var myObjects  = FindGameObjectsWithName(myObjectName); //Find EVERY gameobject with the correct name.
		TakeAction(myObjects);
		this.transform.tag = "Modifier";
		//Destroy(this);
		acted = true;
	}
}
function Update(){
	if(Input.GetKeyDown("p") && PlayerPrefs.GetInt("EditorInMenu") != 1){ //Preview superficial changes
		myName = this.transform.name;
		myObjectName = myName.Substring(GetObjectName(myName,0),GetObjectName(myName,1)-1-GetObjectName(myName,0));
		action = myName.Substring(0,GetObjectName(myName,0)-1); //What modification are we making?
		TakeVisualAction(FindGameObjectsWithName(myObjectName));
	}
}
function TakeVisualAction(myArray : GameObject[]){ //Stripped down TakeAction. Only acts on mods that wouldn't impact level save/load.
	var i = 0;
	if(action == "Trigger"){
		for(i = 0; i < myArray.Length;i++){
			if(myArray[i].GetComponent("BoxCollider2D")){
				myArray[i].GetComponent("BoxCollider2D").isTrigger = true;
			}
		}
	}
	if(action == "Hide"){
		for(i = 0; i < myArray.Length;i++){
			if(myArray[i].GetComponent("SpriteRenderer")){
				myArray[i].GetComponent("SpriteRenderer").enabled = false;
			}
		}
	}
	if(action == "Color"){
		index1 = 0;
		index1 = GetParentName(myObjectName,0);
		myNewDad = myObjectName.Substring(index1,myObjectName.Length-index1-1);
		var myColor : Color = Color32(int.Parse(myObjectName.Substring(GetParentName(myObjectName,0),GetParentName(myObjectName,1)-GetParentName(myObjectName,0)-1)),int.Parse(myObjectName.Substring(GetParentName(myObjectName,1),GetParentName(myObjectName,2)-GetParentName(myObjectName,1)-1)),int.Parse(myObjectName.Substring(GetParentName(myObjectName,2),GetParentName(myObjectName,3)-GetParentName(myObjectName,2)-1)),int.Parse(myObjectName.Substring(GetParentName(myObjectName,3),GetParentName(myObjectName,4)-GetParentName(myObjectName,3)-1)));
		myArray = FindGameObjectsWithName(myObjectName.Substring(0,index1-1));
		for(i = 0; i < myArray.Length;i++){
			myArray[i].GetComponent(SpriteRenderer).color = myColor;
			Debug.Log(myColor);
		}
	}
	if(action == "Background"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].GetComponent(SpriteRenderer).sortingOrder = -2;
		}
	}
	if(action == "Foreground"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].GetComponent(SpriteRenderer).sortingOrder = 2;
		}
	}
}
function TakeAction(myArray : GameObject[]){
	var i = 0;
	if(action == "Trigger"){
		for(i = 0; i < myArray.Length;i++){
			if(myArray[i].GetComponent("BoxCollider2D")){
				myArray[i].GetComponent("BoxCollider2D").isTrigger = true;
			}
		}
	}
	if(action == "Hide"){
		for(i = 0; i < myArray.Length;i++){
			if(myArray[i].GetComponent("SpriteRenderer")){
				myArray[i].GetComponent("SpriteRenderer").enabled = false;
			}
		}
	}
	if(action == "Disable"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].active = false;
		}
	}
	if(action == "Rotator"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].AddComponent(Rotator);
		}
	}
	if(action == "Parent"){
		var myNewDad : String;
		var index1 = 0;
		index1 = GetParentName(myObjectName,0);
		myNewDad = myObjectName.Substring(index1,myObjectName.Length-index1-1);
		Debug.Log("Dad: "+myNewDad);
		Debug.Log("Object: " +myObjectName.Substring(0,index1-1));
		var newParent = GameObject.Find(myNewDad);
		myArray = FindGameObjectsWithName(myObjectName.Substring(0,index1-1));
		for(i = 0; i < myArray.Length;i++){
			myArray[i].transform.parent = newParent.transform;
		}
	}
	if(action == "Sound"){
		var soundName = myObjectName;
		var myobj = new GameObject();
		myobj.transform.position = this.transform.position;
		myobj.name = soundName;
		myobj.AddComponent(AudioSource);
		myobj.AddComponent(TestExternalSound);
	}
	if(action == "NoGravity"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].BroadcastMessage("NoGravity");
			if(myArray[i].GetComponent("Rigidbody2D") != null){
				myArray[i].GetComponent("Rigidbody2D").gravityScale = 0;
			}
		}
	}
	if(action == "Tag"){
		index1 = 0;
		index1 = GetParentName(myObjectName,0);
		myNewDad = myObjectName.Substring(index1,myObjectName.Length-index1-1);
		myArray = FindGameObjectsWithName(myObjectName.Substring(0,index1-1));
		for(i = 0; i < myArray.Length;i++){
			myArray[i].transform.tag = myNewDad;
		}
	}
	if(action == "Color"){
		index1 = 0;
		index1 = GetParentName(myObjectName,0);
		myNewDad = myObjectName.Substring(index1,myObjectName.Length-index1-1);
		var myColor : Color = Color32(int.Parse(myObjectName.Substring(GetParentName(myObjectName,0),GetParentName(myObjectName,1)-GetParentName(myObjectName,0)-1)),int.Parse(myObjectName.Substring(GetParentName(myObjectName,1),GetParentName(myObjectName,2)-GetParentName(myObjectName,1)-1)),int.Parse(myObjectName.Substring(GetParentName(myObjectName,2),GetParentName(myObjectName,3)-GetParentName(myObjectName,2)-1)),int.Parse(myObjectName.Substring(GetParentName(myObjectName,3),GetParentName(myObjectName,4)-GetParentName(myObjectName,3)-1)));
		myArray = FindGameObjectsWithName(myObjectName.Substring(0,index1-1));
		for(i = 0; i < myArray.Length;i++){
			myArray[i].GetComponent(SpriteRenderer).color = myColor;
			Debug.Log(myColor);
		}
	}
	if(action == "Background"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].GetComponent(SpriteRenderer).sortingOrder = -2;
		}
	}
	if(action == "Foreground"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].GetComponent(SpriteRenderer).sortingOrder = 2;
		}
	}
	if(action == "AddPhysics"){
		for(i = 0; i < myArray.Length;i++){
			myArray[i].AddComponent(Rigidbody2D);
			myArray[i].AddComponent.<PhysicsObject>();
		}
	}
	if(action == "Spawner"){
		var mySpawner = new GameObject("Spawner");
		mySpawner.transform.position = this.transform.position;
		mySpawner.AddComponent.<Spawner>();
		mySpawner.GetComponent("Spawner").myObject = myArray[0].gameObject;
	}
	if(action.Length > 4){
		if(action.Substring(0,5) == "Timer"){
			var myTime = float.Parse(action.Substring(5,action.Length-5));
			Debug.Log("Timer found! Time: "+myTime);
			for(i=0;i<myArray.Length;i++){
				myArray[i].active = false;
			}
			timerArray = myArray;
			Invoke("EnableObjects",myTime);
		}
	}
}
function GetObjectName(plsline: String,index : int){ //Find ()s in text, and return the index of it in the string.
	var myCount = 0; //Amount of ()s
	for(i=0;i<plsline.Length;i++){
		if(plsline.Substring(i,1) == "(" || plsline.Substring(i,1) == ")"){
			if(myCount != index){
				myCount+=1;
			}
			else{
				return i+1;
			}
		}
	}
}
function GetParentName(plsline: String,index : int){ //Find ()s in text, and return the index of it in the string.
	var myCount = 0; //Amount of ()s
	for(i=0;i<plsline.Length;i++){
		if(plsline.Substring(i,1) == "."){
			if(myCount != index){
				myCount+=1;
			}
			else{
				return i+1;
			}
		}
	}
}
function FindGameObjectsWithName(name : String){
	var gameObjects = GameObject.FindObjectsOfType(GameObject);
	var arr = gameObjects;
	var FluentNumber = 0;
	for(var i = 0; i< gameObjects.Length;i++){
		if(gameObjects[i].name == name){
			arr[FluentNumber] = gameObjects[i];
			FluentNumber++;
		}
	}
	
	var finalArray : GameObject[];
	finalArray = new GameObject[FluentNumber];
	for(a=0;a<finalArray.Length;a++){
		finalArray[a] = arr[a];
	}
	return finalArray;
}
function EnableObjects(){
	for(i=0;i<timerArray.Length;i++){
			timerArray[i].active = true;
		}
}
function ConvertColor(r:int,g:int,b:int,a:int) : Color{
	return Color(r/255.0,g/255.0,b/255.0,a/255.0);
}