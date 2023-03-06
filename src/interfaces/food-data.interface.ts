export interface IFoodSearchProps {
  query: string
}

export interface IFoodNutrient {
  nutrientName: string
  value: number
  unitName: string
}

export interface IFoodNutrientById {
  amount: number
  nutrient: {
    name: string
  }
}

export interface IFoodItem {
  fdcId: number
  description: string
  foodNutrients: Array<IFoodNutrient>
}

export interface IFoodSearchResult {
  foods: Array<IFoodItem>
}

export interface IFoodItemById {
  fdcId: number
  description: string
  foodNutrients: Array<IFoodNutrientById>
}
