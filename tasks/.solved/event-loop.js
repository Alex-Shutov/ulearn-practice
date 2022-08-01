let clickCount = 0;

document.addEventListener("click", function() {
    clickCount++;
    console.log("clicked", clickCount);

    if (clickCount === 5) {
        clearInterval(timerId);
        console.log("5 clicks!");
    }
});

const timerId = setInterval(() => {
    console.log("wait");
}, 100);

