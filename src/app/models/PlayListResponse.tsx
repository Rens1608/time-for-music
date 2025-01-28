import { PlaylistItem } from "./PlaylistItem";

export interface PlaylistResponse {
    name: string,
    tracks: {
        items: PlaylistItem[];
        next: string;
    };
}
