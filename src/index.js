import './style.css'
import Icon from './0.png'
import {cube} from './math.js';
if (process.env.NODE_ENV !== 'production') {
        console.log('Looks like we are in development mode!');
}
function component() {
        var element = document.createElement('pre');

        element.innerHTML = [
                'Hello webpack!', '5 cubed is equal to ' + cube(5)
        ].join('\n\n');;

        var myIcon = new Image();
        myIcon.src = Icon;
        element.appendChild(myIcon)

        return element;
}
document.body.appendChild(component());
