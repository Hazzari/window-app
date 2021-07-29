import './slider';
import changeModalState from "./modules/changeModalState";
import modals from './modules/modals';
import tabs from "./modules/tabs";
import getForms from './modules/forms';
import timer from "./modules/timer";

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let modalState = {};
    let deadline = '2021-08-11';

    changeModalState(modalState);

    modals();
    tabs(
        '.glazing_slider',
        '.glazing_block',
        '.glazing_content',
        'active');
    tabs('.decoration_slider',
        '.no_click',
        '.decoration_content > div > div',
        'after_click');
    tabs('.balcon_icons',
        '.balcon_icons_img',
        '.big_img > img',
        'do_image_more',
        'inline-block');
    getForms(modalState);
    timer('.container1', deadline);
});



