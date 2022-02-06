import System;
import System.IO;
var  fileName = "Level";
var toggle : boolean = false;
var prefabs : GameObject[];
var tempSpawn : GameObject;
var myDir : String;
function Start() {
     //WriteLevel();
     //ReadLevel();
     if(PlayerPrefs.GetInt("Campaign") == 0){
     	myDir = "CustomContent";
     	ReadTitle();
     }
     else{
     	myDir = "Campaign";
     }
}
function WriteLevel(){
	/*
   if (File.Exists(fileName))
    {
        Debug.Log(fileName+" already exists.");
        return;
    }
    */
    var sr;
    if(Application.platform == RuntimePlatform.OSXPlayer){ //Yet another thing that shouldn't change things, but does
    	sr = File.CreateText("CustomContent"+ Path.DirectorySeparatorChar+fileName+".d4h");
    }
    else{
    	sr = File.CreateText("CustomContent/"+fileName+".d4h");
    }
    var myBlocks = GameObject.FindGameObjectsWithTag("Block");
    for(i=0;i < myBlocks.Length;i++){
    	if(myBlocks[i].transform.parent == null){
    		sr.WriteLine("Block "+myBlocks[i].transform.position.x+" "+myBlocks[i].transform.position.y+" "+myBlocks[i].transform.position.z+" "+myBlocks[i].transform.rotation.eulerAngles.x+" "+myBlocks[i].transform.rotation.eulerAngles.y+" "+myBlocks[i].transform.rotation.eulerAngles.z+" "+myBlocks[i].transform.localScale.x+" "+myBlocks[i].transform.localScale.y+" "+myBlocks[i].transform.name+" ");   	
    	}
    }
    var myPlayers = GameObject.FindGameObjectsWithTag("Player");
    for(i=0;i<myPlayers.Length;i++){
    	if(myPlayers[i].transform.parent == null){
    	sr.WriteLine("Player "+myPlayers[i].transform.position.x+" "+myPlayers[i].transform.position.y+" "+myPlayers[i].transform.position.z+" "+myPlayers[i].transform.rotation.eulerAngles.x+" "+myPlayers[i].transform.rotation.eulerAngles.y+" "+myPlayers[i].transform.rotation.eulerAngles.z+" "+myPlayers[i].transform.localScale.x+" "+myPlayers[i].transform.localScale.y+" "+myPlayers[i].transform.name+" ");   	
    	}
    }
    var myPistons = GameObject.FindGameObjectsWithTag("Piston");
    for(i=0;i<myPistons.Length;i++){
    	if(myPistons[i].transform.parent == null){
    	sr.WriteLine("Piston "+myPistons[i].transform.position.x+" "+myPistons[i].transform.position.y+" "+myPistons[i].transform.position.z+" "+myPistons[i].transform.rotation.eulerAngles.x+" "+myPistons[i].transform.rotation.eulerAngles.y+" "+myPistons[i].transform.rotation.eulerAngles.z+" "+myPistons[i].transform.localScale.x+" "+myPistons[i].transform.localScale.y+" "+myPistons[i].transform.name+" ");   	
    	}
    }
    var myEnemies = GameObject.FindGameObjectsWithTag("Enemy");
    for(i=0;i<myEnemies.Length;i++){
    	if(myEnemies[i].transform.parent == null){
    	sr.WriteLine("Enemy "+myEnemies[i].transform.position.x+" "+myEnemies[i].transform.position.y+" "+myEnemies[i].transform.position.z+" "+myEnemies[i].transform.rotation.eulerAngles.x+" "+myEnemies[i].transform.rotation.eulerAngles.y+" "+myEnemies[i].transform.rotation.eulerAngles.z+" "+myEnemies[i].transform.localScale.x+" "+myEnemies[i].transform.localScale.y+" "+myEnemies[i].transform.name+" ");   	
    	}
    }
    var mySpikes = GameObject.FindGameObjectsWithTag("Spike");
    for(i=0;i<mySpikes.Length;i++){
    	if(mySpikes[i].transform.parent == null){
    	sr.WriteLine("Spike "+mySpikes[i].transform.position.x+" "+mySpikes[i].transform.position.y+" "+mySpikes[i].transform.position.z+" "+mySpikes[i].transform.rotation.eulerAngles.x+" "+mySpikes[i].transform.rotation.eulerAngles.y+" "+mySpikes[i].transform.rotation.eulerAngles.z+" "+mySpikes[i].transform.localScale.x+" "+mySpikes[i].transform.localScale.y+" "+mySpikes[i].transform.name+" ");   	
    	}
    }
     var myRezNodes = GameObject.FindGameObjectsWithTag("RezNode");
     for(i=0;i<myRezNodes.Length;i++){
    	if(myRezNodes[i].transform.parent == null){
    		sr.WriteLine("RezNode "+myRezNodes[i].transform.position.x+" "+myRezNodes[i].transform.position.y+" "+myRezNodes[i].transform.position.z+" "+myRezNodes[i].transform.rotation.eulerAngles.x+" "+myRezNodes[i].transform.rotation.eulerAngles.y+" "+myRezNodes[i].transform.rotation.eulerAngles.z+" "+myRezNodes[i].transform.localScale.x+" "+myRezNodes[i].transform.localScale.y+" "+myRezNodes[i].transform.name+" ");   	
    	}
    }
     var myDoors = GameObject.FindGameObjectsWithTag("Door");
     for(i=0;i<myDoors.Length;i++){
    	if(myDoors[i].transform.parent == null){
    		sr.WriteLine("Door "+myDoors[i].transform.position.x+" "+myDoors[i].transform.position.y+" "+myDoors[i].transform.position.z+" "+myDoors[i].transform.rotation.eulerAngles.x+" "+myDoors[i].transform.rotation.eulerAngles.y+" "+myDoors[i].transform.rotation.eulerAngles.z+" "+myDoors[i].transform.localScale.x+" "+myDoors[i].transform.localScale.y+" "+myDoors[i].transform.name+" ");   	
    	}
    }
     var myButtons = GameObject.FindGameObjectsWithTag("Button");
     for(i=0;i<myButtons.Length;i++){
    	if(myButtons[i].transform.parent == null){
    		sr.WriteLine("Button "+myButtons[i].transform.position.x+" "+myButtons[i].transform.position.y+" "+myButtons[i].transform.position.z+" "+myButtons[i].transform.rotation.eulerAngles.x+" "+myButtons[i].transform.rotation.eulerAngles.y+" "+myButtons[i].transform.rotation.eulerAngles.z+" "+myButtons[i].transform.localScale.x+" "+myButtons[i].transform.localScale.y+" "+myButtons[i].transform.name+" ");   	
    	}
     }
     var myTexts = GameObject.FindGameObjectsWithTag("Text");
     for(i=0;i<myTexts.Length;i++){
    	if(myTexts[i].transform.parent == null){
    		sr.WriteLine("Text "+myTexts[i].transform.position.x+" "+myTexts[i].transform.position.y+" "+myTexts[i].transform.position.z+" "+myTexts[i].transform.rotation.eulerAngles.x+" "+myTexts[i].transform.rotation.eulerAngles.y+" "+myTexts[i].transform.rotation.eulerAngles.z+" "+myTexts[i].transform.localScale.x+" "+myTexts[i].transform.localScale.y+" "+myTexts[i].transform.name+" ");   	
    	}
     }
     var myJumps = GameObject.FindGameObjectsWithTag("Jump");
     for(i=0;i<myJumps.Length;i++){
    	if(myJumps[i].transform.parent == null){
    		sr.WriteLine("Jump "+myJumps[i].transform.position.x+" "+myJumps[i].transform.position.y+" "+myJumps[i].transform.position.z+" "+myJumps[i].transform.rotation.eulerAngles.x+" "+myJumps[i].transform.rotation.eulerAngles.y+" "+myJumps[i].transform.rotation.eulerAngles.z+" "+myJumps[i].transform.localScale.x+" "+myJumps[i].transform.localScale.y+" "+myJumps[i].transform.name+" ");   	
    	}
     }
     var myBags = GameObject.FindGameObjectsWithTag("MoneyBag");
     for(i=0;i<myBags.Length;i++){
    	if(myBags[i].transform.parent == null){
    		sr.WriteLine("MoneyBag "+myBags[i].transform.position.x+" "+myBags[i].transform.position.y+" "+myBags[i].transform.position.z+" "+myBags[i].transform.rotation.eulerAngles.x+" "+myBags[i].transform.rotation.eulerAngles.y+" "+myBags[i].transform.rotation.eulerAngles.z+" "+myBags[i].transform.localScale.x+" "+myBags[i].transform.localScale.y+" "+myBags[i].transform.name+" ");   	
    	}
     }
     var myMods = GameObject.FindGameObjectsWithTag("Modifier");
     for(i=0;i<myMods.Length;i++){
    	if(myMods[i].transform.parent == null){
    		sr.WriteLine("Modifier "+myMods[i].transform.position.x+" "+myMods[i].transform.position.y+" "+myMods[i].transform.position.z+" "+myMods[i].transform.rotation.eulerAngles.x+" "+myMods[i].transform.rotation.eulerAngles.y+" "+myMods[i].transform.rotation.eulerAngles.z+" "+myMods[i].transform.localScale.x+" "+myMods[i].transform.localScale.y+" "+myMods[i].transform.name+" ");   	
    	}
     }
    //sr.WriteLine ("This is an index: {0}",5);
    sr.Close();
}
function Update(){
	if(toggle == true){
		ReadLevel();
		toggle = false;
	}
}
function Clear(){
	Application.LoadLevel(Application.loadedLevel);//This is Lazy ;)
}
function Exit(){
	Time.timeScale = 1;
	Application.LoadLevel("main");
}
function Test(){
	WriteTemp();
	Time.timeScale = 1;
}
function Stop(){
	Time.timeScale = 0;
	var mySpawner = Instantiate(tempSpawn,this.transform.position,Quaternion.identity);
	mySpawner.DontDestroyOnLoad(mySpawner);
	Clear();
}
function ReadTemp(){
	var sr;
	var line;
	if(Application.platform == RuntimePlatform.OSXPlayer){ //apple was a mistake
		if(File.Exists("CustomContent"+Path.DirectorySeparatorChar+"Temp.d4h")){
	        sr = File.OpenText("CustomContent"+Path.DirectorySeparatorChar+"Temp.d4h");
	        line = sr.ReadLine();
        while(line != null){
            //Debug.Log(line); // prints each line of the file
            SpawnLine(line);
            line = sr.ReadLine();
        }  
    } 
	    else {
	        //Debug.Log("Could not Open the file: " + fileName + " for reading.");
	        return;
	    }
	}
	else{ //Windows/Linux do things logically
	    if(File.Exists("CustomContent/Temp.d4h")){
	        sr = File.OpenText("CustomContent/Temp.d4h");
	        line = sr.ReadLine();
	        while(line != null){
	            //Debug.Log(line); // prints each line of the file
	            SpawnLine(line);
	            line = sr.ReadLine();
	        }  
	    } else {
	        //Debug.Log("Could not Open the file: " + fileName + " for reading.");
	        return;
	    }
	}
}
function WriteTemp(){
	var sr;
	if(Application.platform == RuntimePlatform.OSXPlayer){ //apple was a mistake
		sr = File.CreateText("CustomContent"+Path.DirectorySeparatorChar+"Temp.d4h");
	}
	else{
		sr = File.CreateText("CustomContent/Temp.d4h");
	}
    var myBlocks = GameObject.FindGameObjectsWithTag("Block");
    for(i=0;i < myBlocks.Length;i++){
    	if(myBlocks[i].transform.parent == null){
    		sr.WriteLine("Block "+myBlocks[i].transform.position.x+" "+myBlocks[i].transform.position.y+" "+myBlocks[i].transform.position.z+" "+myBlocks[i].transform.rotation.eulerAngles.x+" "+myBlocks[i].transform.rotation.eulerAngles.y+" "+myBlocks[i].transform.rotation.eulerAngles.z+" "+myBlocks[i].transform.localScale.x+" "+myBlocks[i].transform.localScale.y+" "+myBlocks[i].transform.name+" ");   	
    	}
    }
    var myPlayers = GameObject.FindGameObjectsWithTag("Player");
    for(i=0;i<myPlayers.Length;i++){
    	if(myPlayers[i].transform.parent == null){
    	sr.WriteLine("Player "+myPlayers[i].transform.position.x+" "+myPlayers[i].transform.position.y+" "+myPlayers[i].transform.position.z+" "+myPlayers[i].transform.rotation.eulerAngles.x+" "+myPlayers[i].transform.rotation.eulerAngles.y+" "+myPlayers[i].transform.rotation.eulerAngles.z+" "+myPlayers[i].transform.localScale.x+" "+myPlayers[i].transform.localScale.y+" "+myPlayers[i].transform.name+" ");   	
    	}
    }
    var myPistons = GameObject.FindGameObjectsWithTag("Piston");
    for(i=0;i<myPistons.Length;i++){
    	if(myPistons[i].transform.parent == null){
    	sr.WriteLine("Piston "+myPistons[i].transform.position.x+" "+myPistons[i].transform.position.y+" "+myPistons[i].transform.position.z+" "+myPistons[i].transform.rotation.eulerAngles.x+" "+myPistons[i].transform.rotation.eulerAngles.y+" "+myPistons[i].transform.rotation.eulerAngles.z+" "+myPistons[i].transform.localScale.x+" "+myPistons[i].transform.localScale.y+" "+myPistons[i].transform.name+" ");   	
    	}
    }
    var myEnemies = GameObject.FindGameObjectsWithTag("Enemy");
    for(i=0;i<myEnemies.Length;i++){
    	if(myEnemies[i].transform.parent == null){
    	sr.WriteLine("Enemy "+myEnemies[i].transform.position.x+" "+myEnemies[i].transform.position.y+" "+myEnemies[i].transform.position.z+" "+myEnemies[i].transform.rotation.eulerAngles.x+" "+myEnemies[i].transform.rotation.eulerAngles.y+" "+myEnemies[i].transform.rotation.eulerAngles.z+" "+myEnemies[i].transform.localScale.x+" "+myEnemies[i].transform.localScale.y+" "+myEnemies[i].transform.name+" ");   	
    	}
    }
    var mySpikes = GameObject.FindGameObjectsWithTag("Spike");
    for(i=0;i<mySpikes.Length;i++){
    	if(mySpikes[i].transform.parent == null){
    	sr.WriteLine("Spike "+mySpikes[i].transform.position.x+" "+mySpikes[i].transform.position.y+" "+mySpikes[i].transform.position.z+" "+mySpikes[i].transform.rotation.eulerAngles.x+" "+mySpikes[i].transform.rotation.eulerAngles.y+" "+mySpikes[i].transform.rotation.eulerAngles.z+" "+mySpikes[i].transform.localScale.x+" "+mySpikes[i].transform.localScale.y+" "+mySpikes[i].transform.name+" ");   	
    	}
    }
     var myRezNodes = GameObject.FindGameObjectsWithTag("RezNode");
     for(i=0;i<myRezNodes.Length;i++){
    	if(myRezNodes[i].transform.parent == null){
    		sr.WriteLine("RezNode "+myRezNodes[i].transform.position.x+" "+myRezNodes[i].transform.position.y+" "+myRezNodes[i].transform.position.z+" "+myRezNodes[i].transform.rotation.eulerAngles.x+" "+myRezNodes[i].transform.rotation.eulerAngles.y+" "+myRezNodes[i].transform.rotation.eulerAngles.z+" "+myRezNodes[i].transform.localScale.x+" "+myRezNodes[i].transform.localScale.y+" "+myRezNodes[i].transform.name+" ");   	
    	}
    }
     var myDoors = GameObject.FindGameObjectsWithTag("Door");
     for(i=0;i<myDoors.Length;i++){
    	if(myDoors[i].transform.parent == null){
    		sr.WriteLine("Door "+myDoors[i].transform.position.x+" "+myDoors[i].transform.position.y+" "+myDoors[i].transform.position.z+" "+myDoors[i].transform.rotation.eulerAngles.x+" "+myDoors[i].transform.rotation.eulerAngles.y+" "+myDoors[i].transform.rotation.eulerAngles.z+" "+myDoors[i].transform.localScale.x+" "+myDoors[i].transform.localScale.y+" "+myDoors[i].transform.name+" ");   	
    	}
    }
     var myButtons = GameObject.FindGameObjectsWithTag("Button");
     for(i=0;i<myButtons.Length;i++){
    	if(myButtons[i].transform.parent == null){
    		sr.WriteLine("Button "+myButtons[i].transform.position.x+" "+myButtons[i].transform.position.y+" "+myButtons[i].transform.position.z+" "+myButtons[i].transform.rotation.eulerAngles.x+" "+myButtons[i].transform.rotation.eulerAngles.y+" "+myButtons[i].transform.rotation.eulerAngles.z+" "+myButtons[i].transform.localScale.x+" "+myButtons[i].transform.localScale.y+" "+myButtons[i].transform.name+" ");   	
    	}
     }
     var myTexts = GameObject.FindGameObjectsWithTag("Text");
     for(i=0;i<myTexts.Length;i++){
    	if(myTexts[i].transform.parent == null){
    		sr.WriteLine("Text "+myTexts[i].transform.position.x+" "+myTexts[i].transform.position.y+" "+myTexts[i].transform.position.z+" "+myTexts[i].transform.rotation.eulerAngles.x+" "+myTexts[i].transform.rotation.eulerAngles.y+" "+myTexts[i].transform.rotation.eulerAngles.z+" "+myTexts[i].transform.localScale.x+" "+myTexts[i].transform.localScale.y+" "+myTexts[i].transform.name+" ");   	
    	}
     }
     var myJumps = GameObject.FindGameObjectsWithTag("Jump");
     for(i=0;i<myJumps.Length;i++){
    	if(myJumps[i].transform.parent == null){
    		sr.WriteLine("Jump "+myJumps[i].transform.position.x+" "+myJumps[i].transform.position.y+" "+myJumps[i].transform.position.z+" "+myJumps[i].transform.rotation.eulerAngles.x+" "+myJumps[i].transform.rotation.eulerAngles.y+" "+myJumps[i].transform.rotation.eulerAngles.z+" "+myJumps[i].transform.localScale.x+" "+myJumps[i].transform.localScale.y+" "+myJumps[i].transform.name+" ");   	
    	}
     }
     var myBags = GameObject.FindGameObjectsWithTag("MoneyBag");
     for(i=0;i<myBags.Length;i++){
    	if(myBags[i].transform.parent == null){
    		sr.WriteLine("MoneyBag "+myBags[i].transform.position.x+" "+myBags[i].transform.position.y+" "+myBags[i].transform.position.z+" "+myBags[i].transform.rotation.eulerAngles.x+" "+myBags[i].transform.rotation.eulerAngles.y+" "+myBags[i].transform.rotation.eulerAngles.z+" "+myBags[i].transform.localScale.x+" "+myBags[i].transform.localScale.y+" "+myBags[i].transform.name+" ");   	
    	}
     }
     var myMods = GameObject.FindGameObjectsWithTag("Modifier");
     for(i=0;i<myMods.Length;i++){
    	if(myMods[i].transform.parent == null){
    		sr.WriteLine("Modifier "+myMods[i].transform.position.x+" "+myMods[i].transform.position.y+" "+myMods[i].transform.position.z+" "+myMods[i].transform.rotation.eulerAngles.x+" "+myMods[i].transform.rotation.eulerAngles.y+" "+myMods[i].transform.rotation.eulerAngles.z+" "+myMods[i].transform.localScale.x+" "+myMods[i].transform.localScale.y+" "+myMods[i].transform.name+" ");   	
    	}
     }
    //sr.WriteLine ("This is an index: {0}",5);
    sr.Close();
}
function ReadTitle(){
	if(PlayerPrefs.GetString("Level") != "null"){ //If we're in campaign mode, AND we have a level selected
		var myLevel = PlayerPrefs.GetString("Level");
		var sr;
		var line;
		if(Application.platform == RuntimePlatform.OSXPlayer){
		    if(File.Exists("Campaign"+ Path.DirectorySeparatorChar+myLevel)){
		    	PlayerPrefs.SetString("Level","null");
		    	PlayerPrefs.Save();
		        sr = File.OpenText("Campaign"+ Path.DirectorySeparatorChar+myLevel);
		        line = sr.ReadLine();
		        while(line != null){
		            //Debug.Log(line); // prints each line of the file
		            SpawnLine(line);
		            line = sr.ReadLine();
		        }  
		    }
		    else {
		        //Debug.Log("Could not Open the file: " + fileName + " for reading.");
		        return;
		    }
		   }
		   else{
			   	if(File.Exists("Campaign/"+myLevel)){
			    	PlayerPrefs.SetString("Level","null");
			    	PlayerPrefs.Save();
			        sr = File.OpenText("Campaign/"+myLevel);
			        line = sr.ReadLine();
			        while(line != null){
			            //Debug.Log(line); // prints each line of the file
			            SpawnLine(line);
			            line = sr.ReadLine();
			        }  
			    }
			    else {
			        //Debug.Log("Could not Open the file: " + fileName + " for reading.");
			        return;
			    }
		   }
	 }
}
function ReadLevel(){
	var sr;
	var line;
	if(Application.platform == RuntimePlatform.OSXPlayer){
	    if(File.Exists("CustomContent"+ Path.DirectorySeparatorChar+fileName+".d4h")){
	        sr = File.OpenText("CustomContent"+ Path.DirectorySeparatorChar+fileName+".d4h");
	        line = sr.ReadLine();
	        while(line != null){
	            //Debug.Log(line); // prints each line of the file
	            SpawnLine(line);
	            line = sr.ReadLine();
	        }  
	    } else {
	        //Debug.Log("Could not Open the file: " + fileName + " for reading.");
	        return;
	    }
	 }
	 else{
	 	if(File.Exists("CustomContent/"+fileName+".d4h")){
	        sr = File.OpenText("CustomContent/"+fileName+".d4h");
	        line = sr.ReadLine();
	        while(line != null){
	            //Debug.Log(line); // prints each line of the file
	            SpawnLine(line);
	            line = sr.ReadLine();
	        }  
	    } else {
	        //Debug.Log("Could not Open the file: " + fileName + " for reading.");
	        return;
	    }
	}
}
function SpawnLine(linepls : String){
	if(linepls.Substring(0,4) == "Door"){
		var myObject = Instantiate(prefabs[6], this.transform.position,Quaternion.identity);
	}
	if(linepls.Substring(0,4) == "Text"){
		myObject = Instantiate(prefabs[8], this.transform.position,Quaternion.identity);
	}
	else if(linepls.Substring(0,5) == "Block"){
		myObject = Instantiate(prefabs[0], this.transform.position,Quaternion.identity);
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
function GetSpaceCount(plsline: String){
	var myCount = 0; //Amount of spaces
	for(i=0;i<plsline.Length;i++){
		if(plsline.Substring(i,1) == " "){
			myCount+=1;
		}
	}
	return myCount;
}
function GetSpace(plsline : String , index : int){
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
function GetSpaceDistance(plsline: String,index : int,index2 : int){ //Return the substring index between spaces ;)
	var firstIndex : int = GetSpace(plsline,index);
	var secondIndex : int = GetSpace(plsline,index2);
	return secondIndex - firstIndex;
}