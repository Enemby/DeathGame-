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
}