import 'index.css';
import { device } from "melonjs";
import onload from './js/index';


device.onReady(() => {
    onload();
});
