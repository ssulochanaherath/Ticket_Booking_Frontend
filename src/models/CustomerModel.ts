export class CustomerModel {
    id?: string;      // Optional id field, useful for tracking customer records
    name: string;
    nic: string;
    email: string;
    phone: string;

    constructor(name: string, nic: string, email: string, phone: string, id?: string) {
        this.name = name;
        this.nic = nic;
        this.email = email;
        this.phone = phone;
        if (id) this.id = id;
    }
}
