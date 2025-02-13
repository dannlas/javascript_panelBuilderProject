const img = document.querySelector("img");
img.ondragstart = () => {
  return false;
};

document.addEventListener("dragstart", function(e) {
    if (e.target.nodeName.toUpperCase() == "IMG") {
        return false;
    }
});

function clearElements(parentElement){
    for(childElement of parentElement.children){
        childElement.remove();
    }
    document.getElementById("myFile").files[0].remove();
}

function addElements(parentElement){
    let file = document.getElementById("myFile").files[0];
    if(file != null){
        // fetch(file)
        //     .then(text => parentElement.innerHTML = text);
        parentElement.innerHTML = file;
    }
    else{
        console.log("No file selected!");
    }
}

let inputLineContainers = document.getElementsByClassName("inputLineContainer");
let inputParagraphContainer = document.getElementsByClassName("inputParagraphContainer");
let inputFormContainer = document.getElementsByClassName("inputFormContainer");
let buttonSectionContainer = document.getElementsByClassName("buttonSectionContainer");
let buttonCheckoxContainer = document.getElementsByClassName("buttonCheckoxContainer");
let imageSectionContainer = document.getElementsByClassName("imageSectionContainer");

let selectedBoxes = document.getElementsByClassName("selectedBox");
let selectedBox = selectedBoxes[0];
let selected = false;

let boxElements = document.getElementsByClassName("box");
let boxInserter = document.getElementById("boxInserter");

let buttonRemoves = document.getElementsByClassName("buttonRemove");

document.body.addEventListener("mousemove", function(event){
    //console.log("mouse move...");
    if(selectedBox != null){
        //console.log("selectedBox.style.width: " + selectedBox.style.width);
        //console.log("selectedBox.id: " + selectedBox.id);
        let grabElementSection = selectedBox.getElementsByClassName("grabElementSection")[0];
        followMousePosition(selectedBox, grabElementSection, event);

        let wedgeElement = boxInserter;
        let otherSingleElement;
        let singleElement = document.getElementById(selectedBox.id);
        let panelElements = document.getElementById("panelContainer").getElementsByClassName("panel");
        console.log("singleElement.offsetLeft: " + singleElement.offsetLeft);
        for(otherElement of boxElements){
            otherSingleElement = document.getElementById(otherElement.id);
            if(otherSingleElement.id !== wedgeElement.id || otherSingleElement.id != singleElement.id){
                // if(singleElement.offsetLeft > singleElement.parentElement.offsetLeft + singleElement.parentElement.offsetWidth){
                    if(otherSingleElement.offsetTop < singleElement.offsetTop){
                        otherSingleElement.parentElement.insertBefore(wedgeElement, otherSingleElement.nextSibling.nextSibling);
                    }
                    // else{
                    //     wedgeElement.parentElement.prepend(wedgeElement);
                    // }
                    // else{
                    //     wedgeElement.parentElement.append(wedgeElement);
                //     // }
                // }
                // else{

                // }
            }
            //console.log(`${otherSingleElement.id} offsetTop: ${otherSingleElement.offsetTop}`);
        }
        if(singleElement.offsetTop < boxElements[0].offsetTop){
            wedgeElement.parentElement.prepend(wedgeElement);
        }
        // else{
        //     wedgeElement.parentElement.append(singleElement);
        // }
        // console.log("---------------------------------");
    }
});


for(element of boxElements){
    boxElements = document.getElementsByClassName("box");
    let singleElement = document.getElementById(element.id);
    let grabElementSection = singleElement.getElementsByClassName("grabElementSection")[0];
    grabElementSection.addEventListener("mousedown", function(event){
        singleElement.parentElement.appendChild(boxInserter);
        // for(innerElement of singleElement.children){
        //     innerElement.classList.add("disabled");
        // }
        boxInserter.classList.add("show");
        boxInserter.classList.remove("hide"); //otherSingleElement.parentElement.appendChild(wedgeElement);

        //console.log(singleElement.style.width);
        selected = true;
        singleElement.classList.add("selectedBox");
        selectedBoxes = document.getElementsByClassName("selectedBox");
        selectedBox = selectedBoxes[0];
        console.log("selectedBox.classList: " + selectedBox.classList);
        // console.log(`singleElement.style.width: ${singleElement.style.height}`);
        // console.log(`singleElement.style.width: ${singleElement.style.height}`);
        singleElement.setAttribute("style", "");
        singleElement.style.width = singleElement.style.offsetWidth;//'300px';
        singleElement.style.height = singleElement.style.offsetHeight;//'50px';
        singleElement.style.right = 0;
        singleElement.style.top = 0;
    
        followMousePosition(singleElement, grabElementSection, event);
    });
}

for(element of boxElements){
    let singleElement = document.getElementById(element.id);
    let grabElementSection = singleElement.getElementsByClassName("grabElementSection")[0];
    selectedBoxes = document.getElementsByClassName("selectedBox");
    selectedBox = selectedBoxes[0];
    singleElement.addEventListener("mouseup", function(event){
        if(selectedBox != null){
            //console.log(selectedBox);
            document.body.appendChild(boxInserter);
            boxInserter.classList.add("hide");
            boxInserter.classList.remove("show");

            let wedgeElement = singleElement;
            let otherSingleElement;
            for(otherElement of boxElements){
                otherSingleElement = document.getElementById(otherElement.id);
                if(otherSingleElement.id !== singleElement.id){
                    if(otherSingleElement.offsetTop < singleElement.offsetTop){
                        wedgeElement = otherSingleElement;
                    }
                }
            }
            if(singleElement.id != wedgeElement.id){
                singleElement.parentElement.insertBefore(singleElement, wedgeElement.nextSibling);
            }
            else{
                singleElement.parentElement.prepend(singleElement);
            }
            selected = false;
            selectedBox.setAttribute("style", "");
            selectedBox.style.right = 0;
            selectedBox.style.top = 0;
            selectedBox.style.width = 'auto';
            selectedBox.style.height = 'auto';
            selectedBoxes = null;
            selectedBox = null;
            //singleElement.classList.remove("selectedBox");
            let selectedBoxElements = document.getElementsByClassName("selectedBox");
            for(selectedBoxElement of selectedBoxElements){
                // for(innerElement of selectedBoxElement.children){
                //     innerElement.classList.remove("disabled");
                // }
                selectedBoxElement.classList.remove("selectedBox");
            }
        }
    });
}

for(buttonRemove of buttonRemoves){
    let targetParent = buttonRemove.parentElement.parentElement.parentElement;
    buttonRemove.addEventListener("click", function(){
        for(childElement of targetParent.children){
            childElement.remove();
        }
        targetParent.remove();
    });
}

function followMousePosition(element, elementGrabber, event){ //
    let x = event.clientX;
    let y = event.clientY;
    // console.log(element.id);
    // console.log({x});
    // console.log({y});
    let left = element.style.left;
    let right = element.style.right;
    let width = element.style.width;
    let height = element.style.height;
    element.style.right = -((x + (parseInt(element.offsetWidth) /2)) - screen.width)+ "px"; //(x - 10) + "px";//
    element.style.top = (y - (parseInt(element.offsetHeight) /2)) + "px"; //(y - 10) + "px";//
    // console.log(element.style.width);
    // console.log(left);
    // console.log(right);
    // console.log(width);
    // console.log(height);
}