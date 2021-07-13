import '../InterfaceAdapters/usersRepository';
import {usersRepository} from "../InterfaceAdapters/usersRepository";

export class service {

    repo = usersRepository;

    constructor(userRepository){
        this.repo = userRepository;
    }

}