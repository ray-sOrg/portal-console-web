import type {
  DishCategory,
  NutritionBasis,
  ServingUnit
} from "@/api/dish";

export const FITNESS_CATEGORY: DishCategory = "FITNESS_MEAL";

export const CATEGORY_OPTIONS: Array<{
  label: string;
  value: DishCategory;
}> = [
  { value: "RECOMMENDED", label: "推荐" },
  { value: "COLD_DISH", label: "凉菜" },
  { value: "SEASONAL_VEGETABLE", label: "时令蔬菜" },
  { value: "HOT_DISH", label: "热菜" },
  { value: "SOUP", label: "汤品" },
  { value: "SNACK_STAPLE", label: "小吃主食" },
  { value: "SEAFOOD", label: "海河鲜" },
  { value: "BEVERAGE", label: "饮品" },
  { value: "BAIJIU", label: "白酒" },
  { value: "BEER", label: "啤酒" },
  { value: FITNESS_CATEGORY, label: "健身餐" },
  { value: "OTHER", label: "其他" }
];

export const CATEGORY_LABELS = Object.fromEntries(
  CATEGORY_OPTIONS.map(option => [option.value, option.label])
) as Record<DishCategory, string>;

export const NUTRITION_BASIS_OPTIONS: Array<{
  label: string;
  value: NutritionBasis;
}> = [
  { value: "PER_100G", label: "每 100g" },
  { value: "PER_100ML", label: "每 100ml" },
  { value: "PER_SERVING", label: "每份" }
];

export const SERVING_UNIT_OPTIONS: Array<{
  label: string;
  value: ServingUnit;
}> = [
  { value: "g", label: "克（g）" },
  { value: "ml", label: "毫升（ml）" },
  { value: "piece", label: "个" },
  { value: "serving", label: "份" }
];

export const SERVING_UNIT_LABELS: Record<ServingUnit, string> = {
  g: "g",
  ml: "ml",
  piece: "个",
  serving: "份"
};
