
export default class Person {
    constructor(name, hometown) {
        this.name = name;
        this.hometown = hometown;
    }

    sayHello(toName) {
        return `Hello this is ${this.name} from ${this.hometown.shortName()} to ${toName}`;
    }
}
