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

  export type Goal = {
    _id?: string,
    amount: string,
    userID: string
  }