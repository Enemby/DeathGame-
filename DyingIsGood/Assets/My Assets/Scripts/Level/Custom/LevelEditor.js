var objIndex : int = 0;
var myObjs : GameObject[];
var infoUI : GameObject[]; //Our Text HUD.
function Start () {
	Time.timeScale = 0;
}
function Update () {
	if(Time.timeScale != 1){
		UpdateUI();
		myObjs[objIndex].active = true;
		if(Input.GetButtonDown("Rotate Object") && Input.GetButton("Sprint")){
			myObjs[objIndex].transform.Rotate(0,0,30);
		}
		else{
			if(Input.GetButton("Rotate Object") && !Input.GetButton("Sprint")){
				myObjs[objIndex].transform.Rotate(0,0,1);
			}
		}
		if(Input.GetButton("Scale") && !Input.GetButton("Sprint")){
			myObjs[objIndex].transform.localScale.x += Input.GetAxisRaw("Horizontal")*0.05;
			myObjs[objIndex].transform.localScale.y += Input.GetAxisRaw("Vertical")*0.05;
		}
		else{
			if(Input.GetButton("Scale") && Input.GetButton("Sprint")){
				myObjs[objIndex].transform.localScale.x += Input.GetAxisRaw("Horizontal")*0.25;
				myObjs[objIndex].transform.localScale.y += Input.GetAxisRaw("Vertical")*0.25;
				if(Input.GetButtonDown("Rotate Object")){
					myObjs[objIndex].transform.localRotation.eulerAngles.z = 0;
				}
			}
		}
		if(Input.GetButton("Sprint") && !Input.GetButton("Scale")){
			this.transform.position.x += Input.GetAxisRaw("Horizontal")*0.05;
			this.transform.position.y += Input.GetAxisRaw("Vertical")*0.05;
		}
		else{
			if(!Input.GetButton("Scale")){
				this.transform.position.x += Input.GetAxisRaw("Horizontal")*0.25;
				this.transform.position.y += Input.GetAxisRaw("Vertical")*0.25;
			}
		}
		if(Input.GetButtonDown("Jump")){
			//Place the object~!
			var newObject = Instantiate(myObjs[objIndex],myObjs[objIndex].transform.position,myObjs[objIndex].transform.rotation);
			if(newObject.gameObject.name == "Door(Clone)"){
				newObject.tag == "Door";
			}
		}
		if(Input.GetButtonDown("Switch Object")){
			objIndex+=1;
			myObjs[objIndex-1].active = false;
			if(objIndex <= myObjs.Length-1){
				myObjs[objIndex].active = true;
			}
			else{
				if(objIndex > myObjs.Length-1){
					objIndex = 0;
					myObjs[0].active = true;
				}
			}
		}
	}
	else{
		myObjs[objIndex].active = false;
	}
}
function UpdateUI(){
	infoUI[0].GetComponent(UI.Text).text = "XYZ: "+myObjs[objIndex].transform.position.x +" "+myObjs[objIndex].transform.position.y+" "+myObjs[objIndex].transform.position.z;
	infoUI[1].GetComponent(UI.Text).text = "Rot: "+myObjs[objIndex].transform.rotation.eulerAngles.x+" "+myObjs[objIndex].transform.rotation.eulerAngles.y+" "+myObjs[objIndex].transform.rotation.eulerAngles.z;
	infoUI[2].GetComponent(UI.Text).text = "Scale: "+myObjs[objIndex].transform.localScale.x+" "+myObjs[objIndex].transform.localScale.y;
}