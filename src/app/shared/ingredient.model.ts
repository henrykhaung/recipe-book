export class Ingredient {
    constructor(public name: string, public amount: number, public unit: string) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    pound_to_ounce() {
        if(this.unit === 'lb') {
            this.amount = this.amount * 16;
            this.unit = 'oz';
        }
    }

    ounce_to_pound() {
        if(this.unit === 'oz') {
            this.amount = this.amount / 16;
            this.unit = 'lb';
        }
    }

    teaspoon_to_tablespoon() {
        if(this.unit === 'tsp') {
            this.amount = this.amount / 3;
            this.unit = 'tbsp';
        }
    }

    tablespoon_to_teaspoon() {
        if(this.unit === 'tbsp') {
            this.amount = this.amount * 3;
            this.unit = 'tsp';
        }
    }

    teaspoon_to_cup() {
        if(this.unit === 'tsp') {
            this.amount = this.amount / 48;
            this.unit = 'cups';
        }
    }

    cup_to_teaspoon() {
        if(this.unit === 'cups') {
            this.amount = this.amount * 48;
            this.unit = 'tsp';
        }
    }

    tablespoon_to_cup() {
        if(this.unit === 'tbsp') {
            this.amount = this.amount / 16;
            this.unit = 'cups';
        }
    }

    cup_to_tablespoon() {
        if(this.unit === 'cups') {
            this.amount = this.amount * 16;
            this.unit = 'tbsp';
        }
    }

}
