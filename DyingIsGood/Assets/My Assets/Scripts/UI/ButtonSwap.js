var index : int = 0;
var buttonArray : GameObject[];
function Swap(){
	buttonArray[index].gameObject.active = false;
	index+=1;
	if(index > buttonArray.Length-1){
		index = 0;
	}
	buttonArray[index].gameObject.active = true;
}