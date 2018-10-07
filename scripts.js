
var seq;
var minLength;
var readingFrames;
var orfsPerReadingFrame;
var outputDivs;
var orfs;

document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("submit").addEventListener("click", function(){
	debugger;
	removeOldResults();
	seq = document.getElementById("input").value.replace(/\s+/g, '');
	minLength = document.getElementById("minLength").value;
	readingFrames = [1, 2, 3, -1, -2, -3];
	outputDivs = document.getElementsByClassName("readingFrame");
	orfs = [];
	for (readingFrame in readingFrames){
		orfsPerReadingFrame = [];
		if (readingFrames[readingFrame] === -1){
			//debugger;
			//reverse string for first negative reading frame
			seq = seq.split("").reverse().join("");
		}
		for (let i = Math.abs(readingFrames[readingFrame])-1; i < seq.length-2; i+=3){
			if (seq.substring(i, i+3) === "ATG"){
				//search for stop codon
				let lastCodon = seq.length-(seq.length%3)-3
				for (let j = i+3; j <= lastCodon; j+=3){
					if ((seq.substring(j,j+3) === "TAA" 
						|| seq.substring(j,j+3) === "TAG" 
						|| seq.substring(j,j+3) === "TGA" 
						|| j === lastCodon)
						&& j+3-i>=minLength){
						outputORF(i, j, j===lastCodon);
						break;
					}

				}
			}
		}			
		orfs.push(orfsPerReadingFrame);
		}	
		console.log(orfs)
	}

);
});

var removeOldResults = function(){
	debugger;
	var results = document.getElementsByClassName("result")
	while (results.length > 0){
		results[0].remove();
	}
}
var outputORF = function(i, j, lastCodon){
	let start = i+1;
	let stop = j+3;
	let length = j+3-i;
	let sequence = seq.substring(i, j+3);
	if (lastCodon === true){
		stop = ">" + stop;
		length = length + "+"
	}
	orfsPerReadingFrame.push({start : start, stop : stop, length : length, sequence : sequence});
	let newDiv = document.createElement("div");
	let outputString = "<b>start:</b> " + start + "  <b>stop:</b> " + stop + "  <b>length:</b> " + length + "</br> <b>sequence:</b> " +sequence;
	newDiv.innerHTML = outputString;
	newDiv.classList.add("result");
	outputDivs[readingFrame].appendChild(newDiv);
	stopCodonPresent = true;
};
