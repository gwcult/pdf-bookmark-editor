import { PDFRef } from "pdf-lib";

export interface BookmarkTree {
    readonly ref: PDFRef;
    readonly children: BookmarkItem[];
}

export interface BookmarkItem extends BookmarkTree, Bookmark {}

export interface Bookmark {
    readonly title: string;
    readonly page?: number;
}