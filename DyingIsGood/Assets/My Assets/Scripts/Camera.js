var target : GameObject;
var offset : Vector3;
var editormode : boolean = false;
function Update(){
	if(Time.timeScale == 0){
		editormode = true;
	}
	else{
		editormode = false;
	}
	if(editormode == true){
		target = GameObject.FindGameObjectWithTag("Editor");
	}
	else{
		if(GameObject.FindGameObjectWithTag("Player")){
			target = GameObject.FindGameObjectWithTag("Player");
		}
	}
	this.transform.position = target.transform.position + offset;
	if(editormode == true){
		CameraZoomLogic();
	}
}
function CameraZoomLogic(){
	if(Input.GetButtonDown("Camera Reset")){
		GetComponent.<UnityEngine.Camera>().orthographicSize = 5;
	}
	GetComponent.<UnityEngine.Camera>().orthographicSize += Input.GetAxisRaw("Camera Zoom")*0.2;
	if(GetComponent.<UnityEngine.Camera>().orthographicSize < 2){
		GetComponent.<UnityEngine.Camera>().orthographicSize= 2;
	}
}