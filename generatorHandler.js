import { addBtnPosFix, refixDisplay } from './generatorFixer.js';
import tinycolor from './tinycolor.js';

// GENERATE RANDOM COLOR METHODS
function generateColorRandom(elements) {
    let unique = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    let colorHex = '';
    for (let x = 0; x < elements.length; x++) {
        let hexDOM = elements[x].querySelector('[data-color-code]');
        const isLock = elements[x].querySelector('[data-btn-lock]').getAttribute('data-lock');
        if (isLock === "false") {
            for (let hex = 0; hex < 6; hex++) {
                colorHex += unique[Math.floor(Math.random() * unique.length)];
            }
            elements[x].style.background = `#${colorHex}`;
            hexDOM.innerText = colorHex;
            colorHex = "";
        }
    }
}
function checkElementLight(elements) {
    for (let x = 0; x < elements.length; x++) {
        if (tinycolor(elements[x].innerText).isLight()) {
            elements[x].style.color = "#101010";
        } else {
            elements[x].style.color = "#eeeeee";
        }
    }
}
export function generateColor(elements) {
    generateColorRandom(elements);
    checkElementLight(elements);
}

// SHOW ALERT
export function showAlert(type, msg, placeDOM) {
    const div = document.createElement('div');
    div.classList.add(`alert-${type}`);
    div.classList.add('alert');
    div.classList.add('fadeAlert');
    div.innerText = msg;
    placeDOM.appendChild(div);
    // Remove alert
    setTimeout(() => {
        div.remove()
    }, 2000);
}

// ADD BTN
export function addBtnEventHandler(btn) {
        const pos = btn.getAttribute('data-target');
        const mainEl = btn.parentElement.parentElement.parentElement;
        const newEl = createNewColorEl();   
        if (pos === 'left') {
            mainEl.parentElement.insertBefore(newEl, mainEl)
        } else {
            mainEl.parentElement.insertBefore(newEl, mainEl.nextSibling);
        }
        const colorElements  = document.querySelectorAll('.single-color');
        addBtnPosFix(colorElements)
}
function createNewColorEl() {
    const div = document.createElement('div');
    div.className = "single-color";
    div.innerHTML = `
    <div class="color-ui"></div>
    <div class="color-tools">
        <div class="btn remove-btn hint--top" role="button" aria-label="remove color" data-btn-copy>
            <i class="ri-delete-bin-2-line"></i>       
        </div>
        <div class="btn drag-btn hint--top" role="button" aria-label="move color" data-btn-copy>
            <i class="ri-drag-move-line"></i>       
        </div>
        <div class="btn copy-btn hint--top" role="button" aria-label="copy hex code" data-btn-copy>
            <i class="ri-file-copy-line"></i>
        </div>
        <div class="btn lock-btn hint--top" aria-label="lock color" data-btn-lock data-lock="false">
            <i class="ri-lock-unlock-line"></i>
        </div>
    </div>
    <div class="color-info">
        <h4 class="color-hex" data-color-code></h4>
        <p class="subtitle color-name" data-color-name></p>
    </div>
    `
    generateColor([div]);
    return div;
}

// COPY BTN
export function copyBtnEventHandler(btn) {
    const colorDesc = btn.parentElement.parentElement.querySelector('[data-color-code]').innerText;
    return window.navigator.clipboard.writeText(colorDesc);
}

// LOCK BTN
export function lockBtnEventHandler(btn) {
    const isLock = eval(btn.getAttribute('data-lock'));
    if (!isLock) {
        btn.setAttribute("data-lock", "true");
        btn.classList.add('active');
        btn.innerHTML = `<i class="ri-lock-line"></i>`;
    } else {
        btn.setAttribute("data-lock", "false");
        btn.classList.remove('active');
        btn.innerHTML = `<i class="ri-lock-unlock-line"></i>`;
    }
}

// REMOVE BTN 

export function removeBtnEventHandler(ctr, btn) {
    const colorElements = getElements(ctr, '.single-color');
    if (!colorElements.length < 2) {
        removeBtnHandler(btn);
        addBtnPosFix(colorElements)
    } 
    if (colorElements.length === 3) {
        refixDisplay(".remove-btn", "none");
    }
    // RESTORE ADDBTN WHEN DELETE ELEMENT AT ELEMENT IS MAXIMUM
    if (colorElements.length === 10) {
        refixDisplay(".color-ui", "block");
    }
}

function removeBtnHandler(btn) {
    const parentEl = btn.parentElement.parentElement;
    parentEl.remove();
}

// GET COLOR ELEMENTS
export function getElements(ctr, elements) {
    return ctr.querySelectorAll(elements);
}