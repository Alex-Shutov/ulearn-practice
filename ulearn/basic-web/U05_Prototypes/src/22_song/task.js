//#region Task
function Song(title, author, album) {
    this.title = title;
    this.author = author;
    this.album = album;

    this.getFullName = function() {
        return `композиция «${this.title}», исполнитель ${this.author}, альбом «${this.album}»`;
    };
    this.setYear = function(year) {
        this.year = year;
    };
    this.setTitle = function(title) {
        this.title = title;
    };
}
//#endregion Task

export default Song;
