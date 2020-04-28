export const State = Object.freeze({
    Susceptible: 0,
    Exposed: 1,
    Infected: 2,
    Symptomatic: 3,
    Removed: 4
})


export let unit_square_distribution = () => ({x: Math.random(), y: Math.random()})


export class Population {


    constructor(individuals) {
        this.asArray = Object.freeze(Array.from(individuals)) //Shallow freeze ... individuals are still mutable.
        this.asArray.forEach((individual) => {
            if (individual.hasOwnProperty('id')) {
                this[individual.id] = individual
            }
        })
        Object.freeze(this) //Shallow freeze ... individuals are still mutable.
    }

    static of(count, idfn = index => index) {
        return new Population(Array.from({length: count},
            (individual, index) => ({state: State.Susceptible, id: idfn(index)})
        ));
    }

    with(fn) {
        this.asArray.forEach((individual, index) => {
            Object.assign(individual, fn(individual, index)) //Individuals are mutable. References to them are not.
        })
        return this;
    }
}