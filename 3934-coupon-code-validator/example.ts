import { validateCoupons, DefaultBusinessLinePolicy, DefaultCodeFormatValidator, AscendingSortStrategy } from './coupon-code-validator';

const codes = ['ABC_123', 'bad-code!', 'X9', 'GROCERY_5'];
const lines = ['electronics', 'grocery', 'pharmacy', 'grocery'];
const actives = [true, true, false, true];

const resultDefault = validateCoupons(codes, lines, actives);
console.log('Default:', resultDefault);

// Example: custom policy and sort (reverse order)
class ReverseSort implements AscendingSortStrategy {
  sort(items: string[]): string[] { return items.sort().reverse(); }
}

class CustomPolicy extends DefaultBusinessLinePolicy {
  order(): string[] { return ['grocery', 'electronics', 'pharmacy', 'restaurant']; }
}

const resultCustom = validateCoupons(codes, lines, actives, {
  businessPolicy: new CustomPolicy(),
  formatValidator: new DefaultCodeFormatValidator(),
  sortStrategy: new ReverseSort(),
});
console.log('Custom:', resultCustom);
