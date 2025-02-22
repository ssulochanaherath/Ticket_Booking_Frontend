export class MovieModel {
    id: string;
    name: string;
    year: string;
    image: File | null;

    constructor(id: string, name: string, year: string, image: File | null) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.image = image;
    }
}
