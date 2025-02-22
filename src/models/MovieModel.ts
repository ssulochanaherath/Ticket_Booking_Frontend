export class MovieModel {
    name: string;
    year: string;
    image: File | null;

    constructor(name: string, year: string, image: File | null) {
        this.name = name;
        this.year = year;
        this.image = image;
    }
}
