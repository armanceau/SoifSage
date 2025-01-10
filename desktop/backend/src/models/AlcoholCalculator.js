class AlcoholCalculator {
    static calculateBAC(drinks, weight, gender) {
 
      const r = null;

      if(gender === 'male'){
        r = 0.68;
      }
      else if( gender === 'female'){
        r = 0.55
      }
      else{
        r = 0.61
      }
  
      const totalAlcoholGrams = drinks.reduce((total, drink) => {
        const alcoholGrams = drink.volume * (drink.alcoholPercentage / 100) * 0.8;
        return total + alcoholGrams;
      }, 0);
  
      const BAC = (totalAlcoholGrams * 100) / (weight * r);
      return parseFloat(BAC.toFixed(2));
    }
  }
  
  export default AlcoholCalculator;
  