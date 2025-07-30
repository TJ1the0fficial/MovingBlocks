const box_panel = document.getElementById("box_panel")

let box_list = []

let future_boxes = [
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "C++",
    "Java",
    "C# (not yet xd)",
]

function create_boxes() { // to create the "boxes", which is made from div/div/p
    for (let i=0; i<future_boxes.length; i++) {
        let box = document.createElement("div")
        box.classList.add("block")
        // create a box, inside a bigger box, we will put the text in this
        let inner_box = document.createElement("div")
        inner_box.classList.add("inner_block")

        // create the text, which we put into the box above
        let box_text = document.createElement("p") // we create p for later use
        box_text.innerText = future_boxes[i]
        console.log("Box_text text:" + future_boxes[i])
        inner_box.style.width = box_text.style.width

        // we check the text's width with "span", because it is accurate measure
        let temp_box_text = document.createElement("span")

        temp_box_text.innerText = future_boxes[i]
        box_panel.appendChild(temp_box_text)
        
        let box_text_width = temp_box_text.getBoundingClientRect().width + 50 + "px"
        
        // center text in box
        box_text.style.textAlign = "center"
        ///

        // span, not p
        temp_box_text.style.maxWidth = box_text_width
        console.log("Box_text width: "  + box_text_width)
        box_panel.removeChild(temp_box_text)
        ///
        box.style.width = box_text_width
        box.style.maxWidth = box_text_width
        inner_box.style.width = box_text_width
        inner_box.style.maxWidth = box_text_width 
        box_text.style.width = box_text_width
        ///
        console.log("box.style.maxWidth: " + box_text_width)

        inner_box.appendChild(box_text)
        box.appendChild(inner_box)
        ///

        // we put then ubti a list, so we can modify them later by index
        let box_list_element = {
            "box" : box,
            "inner_box" : inner_box,
            "box_p" : box_text, // I have made a mistake with the naming of the variables, but I won't fix it
            "box_text" : box_text.innerHTML
        }

        box_list.push(box_list_element)
        console.log("Box " + box_list_element.box_text + " was just created!")
        console.log("------------------")
    }
    console.log("Boxes are created!")
}

function place_boxes() {
    for (let i=0; i<box_list.length;i++) {
        box_panel.appendChild(box_list[i].box)
    }
}

function search_for_style(targetid) {
    for (let sheet of document.styleSheets) {
        for (let rule of sheet.cssRules) {
            if (rule.selectorText === `#${targetid}`) {
                return rule;
            }
        } 
    }
}

function give_ids() {
    for (let i = 0; i < box_list.length; i++) {
        if (box_list[i].box_text == future_boxes[i]) {
            console.log("<give_ids()> I have found " + future_boxes[i] + "!");
            box_list[i].box_p.id = future_boxes[i] + "_text";
            box_list[i].box.id = future_boxes[i] + "_box";
            if (box_list[i].box_text == "C++") {
                console.log("<give_ids()> I have found " + future_boxes[i] + "!");
                console.log("Special condition above! (check C++ as Cpp)")
                box_list[i].box_p.id = "Cpp_text";
                box_list[i].box.id = "Cpp_box";
            } else if (box_list[i].box_text == "C# (not yet xd)") {
                console.log("<give_ids()> I have found " + future_boxes[i] + "!");
                console.log("Special condition above! (check C# as Csharp)")
                box_list[i].box_p.id = "Csharp_text";
                box_list[i].box.id = "Csharp_box";
            }
        }
    }
    console.log("------------------")
}

function offset_positions() {
    let step = "0px"

    for (let i=0;i<box_list.length;i++) {
        let box = box_list[i].box
        step = (Math.floor(Math.random() * 1000) + 1) + "px"
        box.style.marginLeft += step
    }
}

// set shadows's direction
function shadow_setter() {
    const trigger_time = "0.5s"
    setInterval(() => {
        const window_width = window.innerWidth + "px"
        const window_center_x = window.innerWidth/2 + "px"
        const int_window_width = parseInt(window_width)
        const int_window_center_x = parseInt(window_center_x)
        const root = document.documentElement
        const shadow_length = getComputedStyle(root).getPropertyValue('--shadow_direction')
        const int_shadow_length = parseInt(shadow_length)

        for (let i=0;i<box_list.length;i++) {
            let box = box_list[i].box
            let box_marginLeft = parseInt(getComputedStyle(box).marginLeft)
            if (box_marginLeft > (int_window_center_x/2+parseInt(getComputedStyle(box).width))) {
                // above
                box.style.setProperty('--shadow_direction',"-15px")
                console.log(box_list[i].box_text + " has moved past the center!")
            } if (box_marginLeft < (int_window_center_x/2+parseInt(getComputedStyle(box).width))) {
                // below
                box.style.transition = "0s" // set transition to zero, so it visually looks like the shadow is on the left side, then turn the transition back
                box.style.setProperty('--shadow_direction',"15px")
                box.style.transition = (parseInt(getComputedStyle(box).width)/10 + Math.floor((Math.random() * 10) + 1)) + 's'
            }

            if (i == 0) { // so it doesn't need to log all of them
                // console.log(`${box_list[i].box_text}'s marginLeft : ${box_marginLeft}`)
                // console.log(`The center of the window in x vector : ${int_window_center_x}`)
                // console.log(`${box_list[i].box_text} is over the center : ${box_marginLeft > int_window_center_x}`)
                // console.log(`Condition -> box_marginLeft > (int_window_center_x/2) : ${box_marginLeft > (int_window_center_x/2)}`)
                // console.log(`Condition -> box_marginLeft < (int_window_center_x/2) : ${box_marginLeft < (int_window_center_x/2)}`)
                // console.log(`${box_list[i].box_text}'s shadow : ${getComputedStyle(root).getPropertyValue('--shadow_direction')}`)
                // console.log("---------------------------------------------------------------")
            }
            
        }
    },trigger_time)
}

function animate() {
    const step = window.innerWidth

    for (let i=0;i<box_list.length;i++) {
            let box = box_list[i].box
            if (parseInt(getComputedStyle(box).marginLeft) < window.innerWidth) {
                box.style.transition = (parseInt(getComputedStyle(box).width)/10 + Math.floor((Math.random() * 10) + 1)) + 's'
                box.style.marginLeft = parseInt(getComputedStyle(box).marginLeft) + step + "px"
            } if (parseInt(getComputedStyle(box).marginLeft) >= window.innerWidth) {
                box.style.transition = "0s"
                box.style.marginLeft = (0 - parseInt(getComputedStyle(box).width) - 15) + "px"
            } else {}
    }
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

box_panel.style.overflowX = "hidden";

create_boxes()
place_boxes()
give_ids()
offset_positions()
animate()
shadow_setter()