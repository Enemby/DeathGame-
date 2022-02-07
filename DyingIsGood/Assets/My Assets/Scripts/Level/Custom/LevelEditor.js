var objIndex : int = 0;
var myObjs : GameObject[];
var infoUI : GameObject[]; //Our Text HUD.
var localizationManager : MonoBehaviour;
public var allowInput : boolean = true;
var textMenu : GameObject;
var nameTest : UI.Text;
var slowMovement : boolean = false;
var nameTextPanel : GameObject;
var baseMovement : float = 0.05;
var slowSpeed : float = 0.5;
public var nameObjects : boolean = false;
function Start () {
	Time.timeScale = 0;
	if(nameTest != null){
		if(PlayerPrefs.HasKey("EditedLevel")){
			nameTest.text = PlayerPrefs.GetString("EditedLevel");
		}
	}
}
function Update () {
	if(Time.timeScale != 1){
		UpdateUI();
		myObjs[objIndex].active = true;
		if(Input.GetButtonDown("Rotate Object") && Input.GetButton("Sprint")&& allowInput == true){
			myObjs[objIndex].transform.Rotate(0,0,30);
		}
		else{
			if(Input.GetButton("Rotate Object") && !Input.GetButton("Sprint")&& allowInput == true){
				myObjs[objIndex].transform.Rotate(0,0,1);
			}
		}
		if(Input.GetButton("Scale") && !Input.GetButton("Sprint")&& allowInput == true){
			myObjs[objIndex].transform.localScale.x += Input.GetAxisRaw("Horizontal")*baseMovement*Time.unscaledDeltaTime;
			myObjs[objIndex].transform.localScale.y += Input.GetAxisRaw("Vertical")*baseMovement*Time.unscaledDeltaTime;
		}
		else{
			if(Input.GetButton("Scale") && Input.GetButton("Sprint")&& allowInput == true){
				myObjs[objIndex].transform.localScale.x += Input.GetAxisRaw("Horizontal")*baseMovement*slowSpeed*Time.unscaledDeltaTime;
				myObjs[objIndex].transform.localScale.y += Input.GetAxisRaw("Vertical")*baseMovement*slowSpeed*Time.unscaledDeltaTime;
				if(Input.GetButtonDown("Rotate Object")&& allowInput == true){
					myObjs[objIndex].transform.localRotation.eulerAngles.z = 0;
				}
			}
		}
		if(Input.GetButton("Sprint") && !Input.GetButton("Scale")&& allowInput == true){
			if(slowMovement == false){
				this.transform.position.x += Input.GetAxisRaw("Horizontal")*baseMovement*slowSpeed*Time.unscaledDeltaTime;
				this.transform.position.y += Input.GetAxisRaw("Vertical")*baseMovement*slowSpeed*Time.unscaledDeltaTime;
			}
			else{
				this.transform.position.x += Input.GetAxisRaw("Horizontal")*baseMovement*slowSpeed*0.5*Time.unscaledDeltaTime;
				this.transform.position.y += Input.GetAxisRaw("Vertical")*baseMovement*slowSpeed*0.5*Time.unscaledDeltaTime;
			}
		}
		else{
			if(!Input.GetButton("Scale")&& allowInput == true){
				if(slowMovement == false){
					this.transform.position.x += Input.GetAxisRaw("Horizontal")*baseMovement*Time.unscaledDeltaTime;
					this.transform.position.y += Input.GetAxisRaw("Vertical")*baseMovement*Time.unscaledDeltaTime;
				}
				else{
					this.transform.position.x += Input.GetAxisRaw("Horizontal")*baseMovement*0.5*Time.unscaledDeltaTime;
					this.transform.position.y += Input.GetAxisRaw("Vertical")*baseMovement*0.5*Time.unscaledDeltaTime;
				}
			}
		}
		if(Input.GetButtonDown("Jump")&& allowInput == true){
			//Place the object~!
			var newObject = Instantiate(myObjs[objIndex],myObjs[objIndex].transform.position,myObjs[objIndex].transform.rotation);
			if(newObject.gameObject.name == "Door(Clone)"){
				newObject.tag == "Door";
			}
			if(newObject.gameObject.tag == "Text"){
				newObject.gameObject.name = "NewText";
				textMenu.active = true;
				allowInput = false;
			}
			if(nameObjects == true){
				newObject.name = "NamedObject";
				allowInput = false;
				nameTextPanel.active = true;
			}
		}
		if(Input.GetButtonDown("Switch Object")&& allowInput == true){
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
public function ToggleSlowMovement(){
	slowMovement = !slowMovement;
}
public function SetNameObject(mySet : boolean){
	nameObjects = mySet;
}
public function CastPosToInt(){
	this.transform.position.x = Mathf.RoundToInt(this.transform.position.x);
	this.transform.position.y = Mathf.RoundToInt(this.transform.position.y);
	this.transform.position.z = Mathf.RoundToInt(this.transform.position.z);
}
function UpdateUI(){
	infoUI[0].GetComponent(UI.Text).text = "XYZ: "+myObjs[objIndex].transform.position.x +" "+myObjs[objIndex].transform.position.y+" "+myObjs[objIndex].transform.position.z;
	infoUI[1].GetComponent(UI.Text).text =  localizationManager.getText("LEVELEDITOR_ROTATION")+myObjs[objIndex].transform.rotation.eulerAngles.x+" "+myObjs[objIndex].transform.rotation.eulerAngles.y+" "+myObjs[objIndex].transform.rotation.eulerAngles.z;
	infoUI[2].GetComponent(UI.Text).text = localizationManager.getText("LEVELEDITOR_SCALE")+myObjs[objIndex].transform.localScale.x+" "+myObjs[objIndex].transform.localScale.y;
}