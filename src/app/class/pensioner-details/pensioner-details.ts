import { BankDetails } from "./bank-details";

export class PensionerDetails {
    aadharNumber!: string;
    name!: string;
    dateOfBirth!: any;
    pan!: string;
	salaryEarned!: number;
	allowances!: number;
	selfOrFamily!: string;
	bankDetails = new BankDetails();
}
