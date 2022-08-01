function NorthReindeer(name, owner) {
    this.name = name;
    this.owner = owner;
}

//#region Task
// NorthReindeer определен

function runSpring() {
	let counter = 0;
    NorthReindeer.prototype.tryToFindPartner = function() {
		if ((counter++)%2) {
			this.hasBaby = true;
			return 'success';
		}
		return 'fail';
	}
}
//#endregion Task

export default {
    NorthReindeer,
    runSpring
};
