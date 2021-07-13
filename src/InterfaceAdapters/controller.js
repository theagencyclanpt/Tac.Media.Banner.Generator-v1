import '../ApplicationServices/service.js';
import {service} from "../ApplicationServices/service";

export class controller {

    service = service;

    constructor(service) {
        this.service = service;
    }



}