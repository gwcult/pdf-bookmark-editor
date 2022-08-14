import { PDFName } from "pdf-lib";

export class Keys {
    static readonly Type = PDFName.of("Type");
    static readonly Outline = PDFName.of("Outlines");
    static readonly Prev = PDFName.of("Prev");
    static readonly Next = PDFName.of("Next");
    static readonly First = PDFName.of("First");
    static readonly Last = PDFName.of("Last");
    static readonly Parent = PDFName.of("Parent");
    static readonly Count = PDFName.of("Count");
    static readonly Dest = PDFName.of("Dest");
    static readonly Title = PDFName.of("Title");
    static readonly Action = PDFName.of("A");
    static readonly ActionType = PDFName.of("S");
    static readonly ActionDest = PDFName.of("D");
}