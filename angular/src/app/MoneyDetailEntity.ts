export class MoneyDetailEntity {

    constructor(
      public inOrOut: boolean,// 入账: true or 出帐: false 
      public writeTime: string,
      public costName: string,
      public costMoney: number,
      public costType: string,
      public payMethod: string,
      public isDifferenceObject: boolean,// true: 作为当天予定与实际差额对象
      public memo: string,
      public incomeName: string,
      public incomeMoney: number,
      public incomeType: string
    ) {  }
  
  }