/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */


export class World {
  constructor() {
    this.households = {};
    this.killsPowerPlant = [];
    this.id = 0;
  }

  createPowerPlant() {
    return (this.id += 1);
  }

  createHousehold() {
    this.id += 1;

    if (!this.households[this.id]) {
      this.households[this.id] = { powerPlants: [] };
    }

    return this.id;
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    if (!this.killsPowerPlant.includes(powerPlant)) {
      this.households[household].powerPlants.push(powerPlant);
    }
  }

  connectHouseholdToHousehold(household1, household2) {
    if (!this.households[household1].powerPlants.length) {
      this.households[household1].powerPlants = this.households[household2].powerPlants;
    } else {
      this.households[household2].powerPlants = this.households[household1].powerPlants;
    }
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    const index = this.households[household].powerPlants.indexOf(powerPlant);
    this.households[household].powerPlants.splice(index, 1);
  }

  killPowerPlant(powerPlant) {
    this.killsPowerPlant.push(powerPlant);

    Object.keys(this.households).forEach((household) => {
      const index = this.households[household].powerPlants.indexOf(powerPlant);

      if (index !== -1) {
        this.households[household].powerPlants.splice(index, 1);
      }
    });
  }

  repairPowerPlant(powerPlant) {
    const index = this.killsPowerPlant.indexOf(powerPlant);
    this.killsPowerPlant.splice(index, 1);

    Object.keys(this.households).forEach((household) => {
      const powerPlants = this.households[household].powerPlants;

      if (!powerPlants.includes(powerPlant)) {
        powerPlants.push(powerPlant);
      }
    });
  }

  householdHasEletricity(household) {
    return !!this.households[household]?.powerPlants.length || false;
  }
}
