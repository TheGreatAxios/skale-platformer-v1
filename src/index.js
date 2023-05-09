import 'index.css';
import { device } from "melonjs";
import onload from './js/index';
import "./js/wallet";
device.onReady(() => {    
    onload();
});
