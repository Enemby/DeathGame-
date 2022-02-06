public var fileName : String = "MyLevel";
var tempSpawn : GameObject;
function Press(){
	var mySpawner = Instantiate(tempSpawn,this.transform.position,Quaternion.identity);
	mySpawner.GetComponent("SpawnTemp").BroadcastMessage("setLevelName",fileName.Substring(0,fileName.Length-4));
	mySpawner.DontDestroyOnLoad(mySpawner);
	if(!Input.GetKey("left alt")){ //Play!
		Application.LoadLevel(7);
	}
	else{//Open in editor
		PlayerPrefs.SetString("EditedLevel",fileName.Substring(0,fileName.Length-4));
		PlayerPrefs.Save();
		Time.timeScale = 0;
		Application.LoadLevel(6);
	}
}
function SetFile(myString : String){
	fileName = myString;
}
function Update(){
	this.transform.GetChild(0).GetComponent(UI.Text).text = fileName;
}