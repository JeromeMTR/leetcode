// Coupon Code Validator (refactored with IoC)
// This module validates and sorts coupon codes by business line.
// Responsibilities are split and injected via lightweight interfaces so
// behavior can be customized without changing core logic.

// Interface: validates the format of a coupon code
export interface CodeFormatValidator {
  isValid(code: string): boolean;
}

// Interface: defines allowed business lines and their order
export interface BusinessLinePolicy {
  isAllowed(line: string): boolean;
  getInitialBuckets(): Record<string, string[]>;
  order(): string[];
}

// Interface: sorting strategy for codes inside each bucket
export interface SortStrategy {
  sort(items: string[]): string[];
}

// Default implementation: alphanumeric + underscore only
export class DefaultCodeFormatValidator implements CodeFormatValidator {
  private readonly regex = /^[A-Za-z0-9_]+$/;
  isValid(code: string): boolean {
    return Boolean(code) && this.regex.test(code);
  }
}

// Default implementation: static set of business lines and order
export class DefaultBusinessLinePolicy implements BusinessLinePolicy {
  private readonly lines = ["electronics", "grocery", "pharmacy", "restaurant"] as const;
  private readonly set = new Set(this.lines);
  isAllowed(line: string): boolean {
    return this.set.has(line);
  }
  getInitialBuckets(): Record<string, string[]> {
    return {
      electronics: [],
      grocery: [],
      pharmacy: [],
      restaurant: [],
    };
  }
  order(): string[] {
    return [...this.lines];
  }
}

// Default implementation: simple lexicographic sort
export class AscendingSortStrategy implements SortStrategy {
  sort(items: string[]): string[] {
    return items.sort();
  }
}

// Configuration for the validator enabling IoC
export type ValidatorConfig = {
  formatValidator?: CodeFormatValidator;
  businessPolicy?: BusinessLinePolicy;
  sortStrategy?: SortStrategy;
};

/**
 * Validates and buckets coupon codes by business line, then returns
 * a merged array of sorted codes following policy-defined order.
 *
 * IoC points:
 * - Code format validation via `CodeFormatValidator`
 * - Allowed business lines and output ordering via `BusinessLinePolicy`
 * - In-bucket sorting via `SortStrategy`
 *
 * @param code - parallel array of coupon codes
 * @param businessLine - parallel array of business lines per code
 * @param isActive - parallel array indicating whether the code is active
 * @param config - optional injected dependencies to customize behavior
 * @returns merged, ordered, and sorted list of valid active coupon codes
 */
export const validateCoupons = (
  code: string[],
  businessLine: string[],
  isActive: boolean[],
  config: ValidatorConfig = {}
): string[] => {
  const formatValidator = config.formatValidator ?? new DefaultCodeFormatValidator();
  const businessPolicy = config.businessPolicy ?? new DefaultBusinessLinePolicy();
  const sortStrategy = config.sortStrategy ?? new AscendingSortStrategy();

  // Initialize buckets as defined by the business policy
  const buckets = businessPolicy.getInitialBuckets();

  // Single pass: validate and bucket
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const b = businessLine[i];

    // Guard: active, allowed business line, valid format
    if (isActive[i] && businessPolicy.isAllowed(b) && formatValidator.isValid(c)) {
      buckets[b].push(c);
    }
  }

  // Sort each bucket using injected strategy and merge following policy order
  const orderedLines = businessPolicy.order();
  const result: string[] = [];
  for (const line of orderedLines) {
    result.push(...sortStrategy.sort(buckets[line]));
  }
  return result;
};
const validateCoupons = (
  code: string[],
  businessLine: string[],
  isActive: boolean[]
): string[] => {
  // Regex: Allow only alphanumeric characters and underscores
  const regex = /^[A-Za-z0-9_]+$/;

  // Initialize buckets for allowed business lines
  const buckets: Record<string, string[]> = {
    electronics: [],
    grocery: [],
    pharmacy: [],
    restaurant: [],
  };

  // Single pass to filter and bucket data
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const b = businessLine[i];

    // Check: Active status AND Valid Format AND Valid Business Line
    if (
      isActive[i] &&
      c &&
      regex.test(c) &&
      buckets[b] !== undefined
    ) {
      buckets[b].push(c);
    }
  }

  // Sort each bucket and merge in specific order
  return [
    ...buckets.electronics.sort(),
    ...buckets.grocery.sort(),
    ...buckets.pharmacy.sort(),
    ...buckets.restaurant.sort(),
  ];
};

/* Example Usage:
console.log(
    getValidCoupons(
        ["SAVE20", "", "PHARMA5", "SAVE@20"],
        ["restaurant", "grocery", "pharmacy", "restaurant"],
        [true, true, true, true]
    )
); // Output: ["PHARMA5","SAVE20"]

console.log(
    getValidCoupons(
        ["GROCERY15", "ELECTRONICS_50", "DISCOUNT10"],
        ["grocery", "electronics", "invalid"],
        [false, true, true]
    )
); // Output: ["ELECTRONICS_50"]
*/