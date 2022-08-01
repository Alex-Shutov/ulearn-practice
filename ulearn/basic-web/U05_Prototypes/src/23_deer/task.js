//#region Task
const deer = {
    hasHorns: true,
    habitat: 'everywhere',
    eatGrass: () => 'nom, nom'
};

function NorthReindeer(name, owner) {
	this.name = name;
	this.owner = owner;
    this.canSleepInSnow = true;
	this.habitat = 'tundra';
}

NorthReindeer.prototype = deer;
//#endregion Task

export default {
    deer,
    NorthReindeer
};
