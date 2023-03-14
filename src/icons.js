import moment from './moment.js'

let getCurrentDate = moment().format('Do')

var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}

link.href = `../icons/date${getCurrentDate}.png`;



