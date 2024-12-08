import { User } from "../auth/auth.model";

export interface createDoc{
    id?:string,
    docImage: File,
    title: string,
    description: string,
    modelType: string,
    owner: string,
}

export interface listDocs{
    id?:string,
    docImage: File,
    title: string,
    description: string,
    modelType: string,
    owner: string,
    creationDate: Date,   
    data?:string,
    vitale_data?:string,
}

export interface passport{
     id?: string,
     nationality: string,
     names: string,
     surname: string,
     type: Date,
     date_of_birth: string,
     sex: string,
     expiration_date: string

}

export interface listDocss{
    owner : string
}

export class Document{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public creationDate: Date,
        public modelType: string,
        public owner: User,
        public file: string,
        
        public data: string,
        public vitale_data: string,
        public docImage?: File,
        public ownerMail?: string,
        public dataP?: PassportModel,
        public dataV?: VitaleModel,

    ){}
    }

export class PassportModel{
    constructor(
        public id: string,
        public nationality: string,
        public names: string,
        public surname: string,
        public type: string,
        public date_of_birth: string,
        public sex: string,
        public expiration_date: string,

    ){}

    }


export class VitaleModel{
    constructor(
        public id: string,
        public ref: string,
        public full_name: string,
        public emise_date: string,
        public gender: string,
        public date_of_birth: string,
        public cle_de_securite: string,
        
            ){}
        
            }

export class ReceiptModel{
    constructor(
        public id: string,
        public ref: string,
        public Merchant_Name: string,
        public Merchant_Address: string,
        public Merchant_Phone: string,
        public Receipt_Number: string,
        public Total_Amount: string,
        public Tax_Amount: string,
        public productList: Product[],
        
            ){}
        
            }
    

export class VitaleDoc{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public creationDate: string,
        public modelType: string,
        public full_name: string,
        public emise_date: string,
        public gender: string,
        public date_of_birth: string,
        public cle_de_securite: string,
        ){}
    
        }

export class PassportDoc{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public creationDate: string,
        public modelType: string,

        public nationality: string,
        public names: string,
        public surname: string,
        public date_of_birth: string,
        public sex: string,
        public expiration_date: string,

        
        ){}
    
        }

export class ReceiptDoc{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public creationDate: string,
        public modelType: string,
        public ref: string,
        public Merchant_Name: string,
        public Merchant_Address: string,
        public Merchant_Phone: string,
        public Receipt_Number: string,
        public Total_Amount: string,
        public Tax_Amount: string,
        public productList: Product,
        
            ){}
        
            }
export class Product{

 constructor(
        public Description: string,
        public Line_Amount: string,
        public Quantity: string,
    ){}
}


