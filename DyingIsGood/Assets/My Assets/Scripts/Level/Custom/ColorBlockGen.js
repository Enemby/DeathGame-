import System;
import System.IO;
var Image : Texture2D;
var block : GameObject;
var palette : Color[];
var generate : boolean = false;
var scale: Vector3 = Vector3(1,1,1);
var PosMod : float = 0.1;
var colorSensitivity : float = 0.01;
var output : String;
function Start () {

}
function SpawnBlock(){
	for(x = 0; x< Image.width;x++){
		for(y = 0; y< Image.height;y++){
			if(Image.GetPixel(x,y).a != 0){
				var myBlock : GameObject = Instantiate(block,Vector3(y,x,0)*PosMod,Quaternion.identity);
				myBlock.transform.localScale = scale;
				myBlock.GetComponent(SpriteRenderer).color = Image.GetPixel(x,y);
			var lowestDistance : float = 1;
			var index = 0;
			for(c=0;c<palette.Length;c++){
				var col1 : Vector4 = Image.GetPixel(x,y);
				var col2 : Vector4 = palette[c];
				if(Vector3.Distance(col1,col2) < lowestDistance){
					lowestDistance = Vector3.Distance(col1,col2);
					index = c;
				}
			}
			myBlock.name = ""+index;
	}
	}
	
	}
}
function RemoveDuplicates(myPal : Color[]){
	var newPalette = new Array(0);
	for(i=0;i< myPal.Length;i++){
		var count : int = 0;
		for(b=0;b< myPal.Length;b++){
			var col1 : Vector4 = myPal[b];
			var col2 : Vector4 = myPal[i];
			if(Vector4.Distance(col1,col2) < colorSensitivity){
				count+=1;
			}
		}
		if(count < 2){
			if(myPal[i].a != 0){
				newPalette.Push(myPal[i]);
			}
		}
	}
	return newPalette.ToBuiltin(Color)as Color[];
}
function SetColorOutput(){
	output = "";
	var sr;
	sr = File.CreateText("ColorMods.txt");
	for(i = 0; i < palette.Length;i++){
		var myColor : Color32 = palette[i];
		Debug.Log("Color:"+myColor);
		sr.WriteLine( "Modifier 0 0 0 0 0 0 1 1 Color("+i+"."+myColor.r+"."+myColor.g+"."+myColor.b+".255.) ");
	}
	for(b = 0; b < palette.Length;b++){
		sr.WriteLine( "Modifier 0 0 0 0 0 0 1 1 Trigger("+b+") ");
	}
	sr.Close();
}
function Update () {
	if(generate == true){
		palette = Image.GetPixels();
		palette = RemoveDuplicates(palette);
		Debug.Log(palette.Length);
		SpawnBlock();
		SetColorOutput();
		generate = false;
	}
}