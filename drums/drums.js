document.addEventListener("DOMContentLoaded", () => {
const buttons = Array.from(document.querySelectorAll(".drum-pad"));
const powerBtn = document.querySelector("#power div");
const bankBtn = document.querySelector("#bank div");
const display = document.querySelector("#display");
const volumeEl = document.querySelector("#volume div");

let audio;
let bankID;
let power;
let volume;

let xCoordinate;
let xVolume;

class DrumPad {
	constructor(key, name1, name2, source1, source2) {
		this.key = key;
		this.name = [name1, name2];
		this.source = [source1, source2];
	}
}

const q = new DrumPad("q", "Heater 1", "Chord1", "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", "../sounds/chord1.mp3");

const w = new DrumPad("w", "Heater 2", "Chord2", "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", "../sounds/chord2.mp3");

const e = new DrumPad("e", "Heater 3", "Chord3", "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", "../sounds/chord3.mp3");

const a = new DrumPad("a", "Heater 4", "Shaker", "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", "../sounds/shaker.mp3");

const s = new DrumPad("s", "Clap", "Open HH", "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", "../sounds/open-hh.mp3");

const d = new DrumPad("d", "Open-HH", "Closed HH", "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", "../sounds/closed-hh.mp3");

const z = new DrumPad("z", "Kick-n'-Hat", "Punchy Kick", "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", "../sounds/punchy-kick.mp3");

const x = new DrumPad("x", "Kick", "Side Stick", "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", "../sounds/side-stick.mp3");

const c = new DrumPad("c", "Closed-HH", "Snare", "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", "../sounds/snare.mp3");

const keys = [q, w, e, a, s, d, z, x, c];

/* START **********************************************************/
bankID = 0;
power = true;
display.innerHTML = "";
volume = 0.2;
volumeEl.style.marginLeft = `${volume * 100}%`;

/* UPDATE ***********************************************************/
powerBtn.addEventListener("click", () => {
	
	if(power === true) {
		power = false;
		powerBtn.style.marginLeft = "0";
		display.innerHTML = "";
	} else {
		power = true;
		powerBtn.style.marginLeft = "1.4rem";
	}
	
});

bankBtn.addEventListener("click", () => {
	
	if(power === true) {
		if(bankID == 0) {
			bankID = 1;
			bankBtn.style.marginLeft = "1.4rem";
			display.innerHTML = "Smooth Piano Kit";
		} else {
			bankID = 0;
			bankBtn.style.marginLeft = "0";
			display.innerHTML = "Heater Kit";
		}
	}
	
});

volumeEl.addEventListener("mousedown", (e) => {
	
	xCoordinate = e.clientX;
	xVolume = volume;
	document.addEventListener("mousemove", MouseMove);
	
});

document.addEventListener("mouseup", () => {
	
	document.removeEventListener("mousemove", MouseMove);
	
});

buttons.forEach((item, index) => {
	
	item.addEventListener("click", () => {
		
		if(power === true) {
			ButtonClickStyle(index);
			PlayAudio(index);
			Display(index);
		} else {
			ButtonClick(index);
		}
		
	});
	
});

document.addEventListener("keydown", KeyDown);
function KeyDown(e) {
	if(power === true) {
		switch(e.key) {
			case "q":
				ButtonClickStyle(0);
				PlayAudio(0);
				Display(0);
				break;
			case "w":
				ButtonClickStyle(1);
				PlayAudio(1);
				Display(1);
				break;
			case "e":
				ButtonClickStyle(2);
				PlayAudio(2);
				Display(2);
				break;
			case "a":
				ButtonClickStyle(3);
				PlayAudio(3);
				Display(3);
				break;
			case "s":
				ButtonClickStyle(4);
				PlayAudio(4);
				Display(4);
				break;
			case "d":
				ButtonClickStyle(5);
				PlayAudio(5);
				Display(5);
				break;
			case "z":
				ButtonClickStyle(6);
				PlayAudio(6);
				Display(6);
				break;
			case "x":
				ButtonClickStyle(7);
				PlayAudio(7);
				Display(7);
				break;
			case "c":
				ButtonClickStyle(8);
				PlayAudio(8);
				Display(8);
				break;
		}
	} else {
		switch(e.key) {
			case "q":
				ButtonClick(0);
				break;
			case "w":
				ButtonClick(1);
				break;
			case "e":
				ButtonClick(2);
				break;
			case "a":
				ButtonClick(3);
				break;
			case "s":
				ButtonClick(4);
				break;
			case "d":
				ButtonClick(5);
				break;
			case "z":
				ButtonClick(6);
				break;
			case "x":
				ButtonClick(7);
				break;
			case "c":
				ButtonClick(8);
				break;
		}
	}
}

function ButtonClickStyle(index) {
	buttons[index].style.marginTop = "0.2rem";
	buttons[index].style.backgroundColor = "darkorange";
	buttons[index].style.boxShadow = "none";
	setTimeout(() => {buttons[index].style.marginTop = "0";
	buttons[index].style.backgroundColor = "gray"; buttons[index].style.boxShadow = "0.1rem 0.1rem 0.4rem 0.1rem";}, 50);
}

function PlayAudio(index) {
	audio = new Audio(keys[index].source[bankID]);
	audio.volume = volume;
	audio.play();
}

function ButtonClick(index) {
	buttons[index].style.marginTop = "0.2rem";
	buttons[index].style.boxShadow = "none";
	setTimeout(() => {buttons[index].style.marginTop = "0"; buttons[index].style.boxShadow = "0.1rem 0.1rem 0.4rem 0.1rem";}, 50);
}

function Display(index) {
	display.innerHTML = keys[index].name[bankID];
}

function MouseMove(event) {
	volume = xVolume + ((event.clientX - xCoordinate) / 220);
	if(volume > 1) {
		volume = 1;
	} else if(volume < 0) {
		volume = 0;
	}
	volumeEl.style.marginLeft = `${volume * 100}%`;
	if(power === true) {
		display.innerHTML = `Volume: ${(volume * 100).toFixed(0)}`;
	}
}
});