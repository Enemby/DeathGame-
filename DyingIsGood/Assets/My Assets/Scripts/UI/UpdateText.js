var myTarget : GameObject;
function UpdateText(){
	myTarget.GetComponent(MonoBehaviour).fileName = this.GetComponent(UI.Text).text;
}