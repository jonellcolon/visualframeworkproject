// Jonell Colon
// Term 1204
// Project 2 VFW
// Local Storage

// Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){
	
	// getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array.
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=contactGroups.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = contactGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	// Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].style;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				partStyle = radios[i].style;
			}
		}
		
	}
		
	function toggleControls(n){
		switch(n){
			case "on":
				$("partList").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":	
				$("partList").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(){
		
		var id			= Math.floor(Math.random()*100000001);
		
		getSelectedRadio();
		
		var item		= {};
			item.group	= ["Group: ", $("groups").value];
			item.fullname	= ["Full Name: ", $("fullname").value];
			item.phone	= ["Phone Number: ", $("phone").value];
			item.cpart	= ["Car Part: ", $("cpart").value];
			item.hmany	= ["How Many: ", $("hmany").value];
			item.ctype	= ["Car Type: ", $("ctype").value];
			item.ycar	= ["Car Year: ", $("ycar").value];
			item.style	= ["Value: ", partStyle];
			item.special	= ["Special Request: ", $("special").value];
			
			//Save data to Local Storage: Stringify.
			localStorage.setItem(id, JSON.stringify(item));
			alert("Part Information Saved!");
		
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage.");
		}
		// Write Data into Local Storage
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
			
		}
			
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All Data is deleted!");
			window.location.reload();
			return false;
		}
	}
	
	// Variable defaults
	var contactGroups = ["--Choose One--", "Motor", "Cabin", "Wheels", "Body", "Trunk", "Exhaust"],
		partValue
	;
	makeCats();
	
	// Set Link & Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);
	


});