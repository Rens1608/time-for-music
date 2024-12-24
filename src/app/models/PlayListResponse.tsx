import { PlaylistItem } from "./PlaylistItem";

export interface PlaylistResponse {
    tracks: {
        items: PlaylistItem[];
    };
}
