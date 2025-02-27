export class TicketModel {
    movie: string;
    seats: string[];
    email: string;
    phone: string;

    constructor(movie: string, seats: string[], email: string, phone: string) {
        this.movie = movie;
        this.seats = seats;
        this.email = email;
        this.phone = phone;
    }
}
