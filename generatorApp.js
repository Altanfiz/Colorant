import {showAlert, generateColor, addBtnEventHandler, getElements, copyBtnEventHandler, lockBtnEventHandler, removeBtnEventHandler} from "./generatorHandler.js";
import { addBtnPosFix } from "./generatorFixer.js";

const mainNav = document.getElementById('mainNav');
const uiSetting = document.getElementById('uiSetting');
const outputCtr = document.getElementById('output');
const colorElements = outputCtr.querySelectorAll('.single-color');
const uiScene = document.querySelector('[data-ui-scene]');

// BTN
const generateBtn = document.querySelector('[data-btn-generate]');


// EVENT //

// WINDOW EVENTS
window.addEventListener('keydown', e => {
    if (e.code === "Space") {
        generateColor(getElements(outputCtr, '.single-color'));
    }
})
window.addEventListener('resize', e => {
    if (window.innerWidth > 782) {
        addBtnPosFix(getElements(outputCtr, '.single-color'))
    }
});

// GENERATE EVENT
generateBtn.addEventListener('click', e => {
    generateColor(getElements(outputCtr, '.single-color'));
});

// COLOR EVENTS
outputCtr.addEventListener('click', e => {
    // ADD BUTTON
    if (e.target.classList.contains('add-btn')) {
        const colorElements = getElements(e.currentTarget, '.single-color');
        if (colorElements.length < 10 && e.target.classList.contains('add-btn')) {
            addBtnEventHandler(e.target);
        }
    }
    // COPY BUTTON
    if (e.target.classList.contains("copy-btn")) {
        copyBtnEventHandler(e.target);
        showAlert('success', "code successfully copied", uiScene);
    }
    // LOCK BUTTON
    if (e.target.classList.contains("lock-btn")) {
        lockBtnEventHandler(e.target);
    }
    // REMOVE BUTTON
    if (e.target.classList.contains("remove-btn")) {
        removeBtnEventHandler(e.currentTarget, e.target);
        addBtnPosFix(getElements(outputCtr, '.single-color'))
    }
})

// MAIN
generateColor(colorElements);
addBtnPosFix(colorElements);