var prefabs : GameObject[];
var myFile : String = "Temp";
var spawned : boolean = false;
private var myDirectory : String = "CustomContent";
function Start(){
	Invoke("delayedStart",0.005);
}
function setLevelName(myLevel : String){
	myFile = myLevel;
}
function delayedStart(){
	if(Application.loadedLevel != 1){
		CampaignLevelCheck();
		ReadTemp();
		Destroy(this.gameObject);
	}
	else{
		Destroy(this.gameObject);
	}
}
function Update(){
	if(spawned == true){
		Destroy(this.gameObject);
	}
	if(spawned == false){
		if(Application.loadedLevel == 6){
			ReadTemp();
			spawned = true;
		}
	}
}
function CampaignLevelCheck(){
	if(PlayerPrefs.GetInt("Campaign") == 1){ // oh. This is a fuckin hack. 
		myFile = PlayerPrefs.GetString("Level");
		myDirectory = "Campaign"; //Ew, it's hard coded!
	}
}
function ReadTemp(){
	var sr;
	var line;
	if(Application.platform == RuntimePlatform.OSXPlayer){ //apple was a mistake
		if(File.Exists(myDirectory+Path.DirectorySeparatorChar+myFile+".d4h")){
	        sr = File.OpenText(myDirectory+Path.DirectorySeparatorChar+myFile+".d4h");
	        line = sr.ReadLine();
	        while(line != null){
	            //Debug.Log(line); // prints each line of the file
	            SpawnLine(line);
	            line = sr.ReadLine();
	        }  
    	} 
	    else {
	        Debug.Log("Could not Open the file: " + myFile + " for reading.");
	        return;
	    }
	}
	else{
	    if(File.Exists(myDirectory+"/"+myFile+".d4h")){
	        sr = File.OpenText(myDirectory+"/"+myFile+".d4h");
	        line = sr.ReadLine();
	        while(line != null){
	            //Debug.Log(line); // prints each line of the file
	            SpawnLine(line);
	            line = sr.ReadLine();
	        }  
	    } else {
	        Debug.Log("Could not Open the file: " + myFile + " for reading.");
	        Debug.Log(myDirectory+"/"+myFile+".d4h");
	        return;
	    }
	   }
	   Debug.Log("Successfully spawned "+myFile);
}
function SpawnLine(linepls : String){
	if(linepls.Substring(0,4) == "Door"){
		var myObject = Instantiate(prefabs[6], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,5) == "Block"){
		myObject = Instantiate(prefabs[0], this.transform.position,Quaternion.identity);
	}
	if(linepls.Substring(0,4) == "Text"){
		myObject = Instantiate(prefabs[8], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,5) == "Enemy"){
		myObject = Instantiate(prefabs[4], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,5) == "Spike"){
		myObject = Instantiate(prefabs[2], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,6) == "Button"){
		myObject = Instantiate(prefabs[7], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,6) == "Player"){		
		myObject = Instantiate(prefabs[3], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,6) == "Piston"){
		myObject = Instantiate(prefabs[1], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,7) == "RezNode"){
		myObject = Instantiate(prefabs[5], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,4) == "Jump"){
		myObject = Instantiate(prefabs[9], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,8) == "MoneyBag"){
		myObject = Instantiate(prefabs[10], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,8) == "Modifier"){
		myObject = new GameObject();
		myObject.transform.position = this.transform.position;
	}
		myObject.transform.position.x = float.Parse(linepls.Substring(GetSpace(linepls,0),GetSpaceDistance(linepls,0,1)));
		myObject.transform.position.y = float.Parse(linepls.Substring(GetSpace(linepls,1),GetSpaceDistance(linepls,1,2)));
		myObject.transform.position.z = float.Parse(linepls.Substring(GetSpace(linepls,2),GetSpaceDistance(linepls,2,3)));
		myObject.transform.rotation.eulerAngles.x = float.Parse(linepls.Substring(GetSpace(linepls,3),GetSpaceDistance(linepls,3,4)));
		myObject.transform.rotation.eulerAngles.y = float.Parse(linepls.Substring(GetSpace(linepls,4),GetSpaceDistance(linepls,4,5)));
		myObject.transform.rotation.eulerAngles.z = float.Parse(linepls.Substring(GetSpace(linepls,5),GetSpaceDistance(linepls,5,6)));
		myObject.transform.localScale.x = float.Parse(linepls.Substring(GetSpace(linepls,6),GetSpaceDistance(linepls,6,7)));
		myObject.transform.localScale.y = float.Parse(linepls.Substring(GetSpace(linepls,7),GetSpaceDistance(linepls,7,8)));
		if(GetSpaceCount(linepls) > 9){
			myObject.transform.name = linepls.Substring(GetSpace(linepls,8),GetSpaceDistance(linepls,8,9)-1);
			if(linepls.Substring(0,8) == "Modifier"){
				var md : Modifier;
				myObject.AddComponent(Modifier);
			}
		}
}
function GetSpace(plsline: String,index : int){
	var myCount = 0; //Amount of spaces
	for(i=0;i<plsline.Length;i++){
		if(plsline.Substring(i,1) == " "){
			if(myCount != index){
				myCount+=1;
			}
			else{
				return i+1;
			}
		}
	}
}
function GetSpaceCount(plsline: String){
	var myCount = 0; //Amount of spaces
	for(i=0;i<plsline.Length;i++){
		if(plsline.Substring(i,1) == " "){
			myCount+=1;
		}
	}
	return myCount;
}
function GetSpaceDistance(plsline: String,index : int,index2 : int){ //Return the substring index between spaces ;)
	var firstIndex : int = GetSpace(plsline,index);
	var secondIndex : int = GetSpace(plsline,index2);
	return secondIndex - firstIndex;
}