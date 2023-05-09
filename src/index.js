import 'index.css';
import { device } from "melonjs";
import * as me from "melonjs";
import onload from './js/index';
import "./js/wallet";
import * as wagmi from "@wagmi/core";
import { getAccount } from "@wagmi/core";
import { utils } from "ethers";
import web3modal from './js/wallet';

device.onReady(() => {
    setup();     
});

const setup = () => {
    if (utils.isAddress(getAccount().address)) {
        document.getElementById("introduction").style.display = "none";
        onload();
    } else {
        web3modal.openModal();
    }
}

wagmi.watchAccount((client) => {
    if (!client) web3modal.openModal();
})