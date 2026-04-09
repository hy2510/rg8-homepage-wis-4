export const paymentKeys = {
  root: () => ['payment'] as const,
  unpaidBalance: () => ['payment', 'unpaid-balance'] as const,
  adjust: () => ['payment', 'adjust'] as const,
  purchaseProduct: () => ['payment', 'purchase-product'] as const,
  paymentHistory: () => ['payment', 'history'] as const,
}
