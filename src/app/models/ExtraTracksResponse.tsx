import { PlaylistItem } from "./PlaylistItem";

export interface ExtraTracksResponse {
    items: PlaylistItem[];
    next: string;
}
