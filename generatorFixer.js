
// FIX ADD BUTTON STATE
export function addBtnPosFix(colorElements) {
    addBtnFix(colorElements);
}
function addBtnFix(colorElements) {
    if (colorElements.length < 10) {
        colorElements.forEach((colorEl, index) => {
            const colorUI = colorEl.querySelector('.color-ui');
            colorUI.innerHTML = '';
            colorUI.innerHTML = `
            <div class="addBtn-ctr left">
                <div class="btn add-btn add-left hint--top" data-target="left"  aria-label="add new color">
                    <i class="ri-add-circle-fill"></i>
                </div>
            </div>
            <div class="addBtn-ctr right">
                <div class="btn add-btn add-right hint--top" data-target="right"  aria-label="add new color">
                    <i class="ri-add-circle-fill"></i>
                </div>
            </div>
            `
            const ctrLeft = colorUI.querySelector('.left');
            const ctrRight = colorUI.querySelector('.right');
            const btnLeft = colorUI.querySelector('.add-left');
            const btnRight = colorUI.querySelector('.add-right');
            const boxLeft = ctrLeft.getBoundingClientRect();
            const boxRight = ctrRight.getBoundingClientRect();
            const btnBoxRight = btnRight.getBoundingClientRect();
            // FIX POS
            btnRight.style.transform = `translateX(${(boxRight.width / 2)}px)`
            btnLeft.style.transform = `translateX(-${(boxRight.width / 2)}px)`
            if (index === 0) {
                btnLeft.style.transform = `translateX(-15%)`;
                btnLeft.className = 'btn add-btn add-left hint--right';
            } else if (index === colorElements.length - 1) {
                btnRight.className = 'btn add-btn add-right hint--left';
                btnRight.style.transform = `translateX(10px)`
            }
        });
    } else {
        const colorUI = document.querySelectorAll('.single-color .color-ui');
        colorUI.forEach(color => {
            color.style.display = "none";
        });
    }
    if (colorElements.length > 2) {
        refixDisplay(".remove-btn", "block");
    }
}

export function refixDisplay(elements, display) {
    const els = document.querySelectorAll(elements);
    els.forEach(el => {
        el.style.display = display;
    });
}

