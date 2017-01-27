
export default class Place {
    constructor(nation, province, town) {
        this.nation = nation;
        this.province = province;
        this.town = province;
    }

    get shortName() {
        return `${this.nation}, ${this.province}, ${this.town}`;
    }
}
