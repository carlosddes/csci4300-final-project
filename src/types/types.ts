export type PaymentMethod = {
    cardNetwork: string,
    lastFourDigits: string
}

export type Transaction = {
    title: string,
    amount: string,
    date: string,
    description: string,
    imageUrl:  string,
    paymentMethod: string,
  };