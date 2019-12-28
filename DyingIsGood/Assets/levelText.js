function Start () {
	var myname = this.gameObject.name;
	myname = myname.Replace("_"," "); //Change _ into spaces
	this.GetComponent("TextMesh").text = myname;
	this.GetComponent("Text").text= myname;
}
