import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
    name: string;
    artists: Artist[];
    album: Album;
    href: string;
}