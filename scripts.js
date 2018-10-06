
document.addEventListener("DOMContentLoaded", function(){
	//debugger;
	document.getElementById("submit").addEventListener("click", function(){
	//debugger;
	var seq = document.getElementById("input").value.replace(/\s+/g, '');
	const readingFrames = [1, 2, 3, -1, -2, -3];
	const outputDivs = document.getElementsByClassName("readingFrame");
	console.log(outputDivs);
	const orfs = [];
	for (readingFrame in readingFrames){
		const orfsPerReadingFrame = [];
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
					if (seq.substring(j,j+3) === "TAA" 
						|| seq.substring(j,j+3) === "TAG" 
						|| seq.substring(j,j+3) === "TGA" 
						|| j === lastCodon){
						orfsPerReadingFrame.push({start : i, stop : j+3, length : j+3-i, sequence : seq.substring(i, j+3)});
						let start = i+1;
						let stop = j+3;
						let length = j+3-i;
						if (j === lastCodon){
							stop = ">" + stop;
						}
						let newDiv = document.createElement("div")
						let outputString = "<b>start:</b> " + start + "  <b>stop:</b> " + stop + "  <b>length:</b> " + length + "</br> <b>sequence:</b> " + seq.substring(i, j+3);
						newDiv.innerHTML = outputString;
						
						outputDivs[readingFrame].appendChild(newDiv);
						stopCodonPresent = true;
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



