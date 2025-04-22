export type Transaction = {
    title: string,
    amount: string,
    date: string,
    description: string,
    imageURL:  string,
    paymentMethod: string,
    userID: string | undefined
  };