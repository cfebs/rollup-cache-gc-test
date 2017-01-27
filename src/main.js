import Person from './person'
import Place from './place'

const NewYork = new Place('US', 'NY', 'NY');

let town = {
    people: [
        new Person('Bobby', NewYork),
        new Person('Sara', NewYork),
        new Person('Justin', NewYork),
    ]
}

town.people.forEach(person => console.log(person.shortName()));
