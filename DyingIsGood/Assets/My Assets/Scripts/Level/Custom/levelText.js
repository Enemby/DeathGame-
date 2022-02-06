function Start () {
	var myname = this.gameObject.name;
	if(myname.StartsWith("#")){
		var localizationManager = GameObject.FindGameObjectWithTag("Localization Manager");
		if(localizationManager != null){
			myname = localizationManager.getText(myname.Substring(1));
		}
	}
	else{
		myname = myname.Replace("_"," "); //Change _ into spaces
	}
	this.GetComponent("TextMesh").text = myname;
	this.GetComponent("Text").text= myname;
}
