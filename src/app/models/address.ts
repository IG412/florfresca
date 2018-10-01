export class Address {
      line1: string;
      line2: string;
      line3: string;
      postalCode: number;
      city: string;
      state:string;
      country: string;
      phone: number;
      constructor(){
        this.country = "CO";
        this.city = "Bogotá"
        this.state = "Bogotá";
        this.postalCode = 110111;
      }
}