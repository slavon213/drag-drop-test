let draggedItem = null;

const liItems = document.querySelectorAll("li");
liItems.forEach((item) => {
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", () => {
        draggedItem = item;
        item.style.opacity = ".5";
        item.style.cursor = "grabbing";
    });
    item.addEventListener("dragend", () => {
        item.style.opacity = "1";
        item.style.cursor = "grab";
    });
});


const containers = document.querySelectorAll(".container");

containers.forEach((container) => {
    let innerUl = container.querySelector("ul");
    const animatedWords = document.querySelector("h1 span");
    

    container.addEventListener("dragover", (e) => {
        container.classList.add("container-drag-over");
        animatedWords.classList.add("animated");
        e.preventDefault();
    });
    container.addEventListener("dragleave", (e) => {
        container.classList.remove("container-drag-over");
    });

    container.addEventListener("drop", (e) => {
        if (draggedItem && innerUl) {
            innerUl.appendChild(draggedItem);
            // innerUl.insertBefore(draggedItem, innerUl.firstChild);
        }
        animatedWords.classList.remove("animated");
        container.classList.remove("container-drag-over");
    });
});



const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const parentEl = button.closest(".container");
        const ulElement = parentEl.querySelector("ul");
        const liElems = ulElement.children.length;
        showInfo(liElems);
    });
});

function showInfo(count=0) {
    let displayElement = document.querySelector(".info");
    displayElement.innerHTML = `В цьому списку <span>&nbsp;${count}&nbsp;</span> елементи(ів)`;
    displayElement.style.visibility = "visible";
    displayElement.scrollIntoView({behavior: "smooth", block: "start"});
}
