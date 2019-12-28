var sceneToLoad : String = "1-1"; //Defaults
var fade : GameObject;
var plotTest : GameObject;
var increment : int = 0;
function startFade(){
	fade.active = true;
	WaitForSeconds(2);
	plotTest.active = true;
}
function Update(){
	if(Input.anyKeyDown){
		increment+=1;
	}
	if(increment == 1){
		startFade();
	}
	if( increment >= 2){
		Application.LoadLevel(sceneToLoad);
	}
}