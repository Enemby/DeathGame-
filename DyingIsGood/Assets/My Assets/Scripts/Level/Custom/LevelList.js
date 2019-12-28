import System.IO;
var myButton : GameObject;
function Start () {
	var info;
	if(Application.platform == RuntimePlatform.OSXPlayer){
		info = new DirectoryInfo("CustomContent"+ Path.DirectorySeparatorChar);
	}
	else{
	 info = new DirectoryInfo("CustomContent/");
	}
	 var fileInfo = info.GetFiles();
	 var counter = 0;
	 for (file in fileInfo){
	 	counter +=1;
	 	var myPosition = Vector3(8,-130+counter*20,0);
	 	var fileButton = Instantiate(myButton,this.transform.position,Quaternion.identity);
	 	fileButton.transform.parent = this.gameObject.transform;
	 	fileButton.transform.localPosition = myPosition;
	 	fileButton.transform.localScale = Vector3(3,0.5,1);
	 	fileButton.BroadcastMessage("SetFile",file.Name);
	  } 
}