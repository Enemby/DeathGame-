var menuObject : GameObject;
var nameMenuObj : GameObject;
var levelScript : LevelEditor;
public var setText : String = "Default Text";
function InMenu(){
	levelScript.allowInput = false;
	PlayerPrefs.SetInt("EditorInMenu",1);
}
function EscapedMenu(){
	levelScript.allowInput = true;
		PlayerPrefs.SetInt("EditorInMenu",0);
}
function closeTextMenu(){
	menuObject.active = false;
	EscapedMenu();
}
function closeNameMenu(){
	nameMenuObj.active = false;
	EscapedMenu();
}
function setMyText(myString : String){
	setText = myString;
}
function resetMostRecentText(){
	var myText = GameObject.Find("NewText");
	myText.name = "Text(Clone)";
}
function resetMostRecentObject(){
	var myObject = GameObject.Find("NamedObject");
	myObject.name = myObject.tag+"(Clone)";
}
function markMostRecentText(){
	setText = setText.Replace(" ","_");
	var myText = GameObject.Find("NewText");
	myText.name = setText;
	myText.BroadcastMessage("Start");
}
function SetRecentObjectName(){
	var myObject = GameObject.Find("NamedObject");
	setText = setText.Replace(" ","_");
	myObject.name = setText;
}