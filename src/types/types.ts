export type Transaction = {
    _id?: string,
    title: string,
    amount: string,
    date: string,
    description: string,
    imageURL:  string,
    paymentMethod: string,
    userID: string | undefined
  };