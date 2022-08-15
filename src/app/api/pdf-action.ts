import { PDFDocument, PDFName, PDFDict, PDFRef, PDFArray, PDFString, PDFHexString, PDFObject, PDFNumber, PDFNull, PDFContext } from "pdf-lib";
import { Keys } from "./pdf-keys";

export enum ActionTypes {
    GoTo = "GoTo",
}

export class PDFAction {
    constructor(
        readonly ref: PDFRef,
        readonly dict: PDFDict,
    ) {}

    getType(): ActionTypes | undefined {
        const name = this.dict.lookupMaybe(Keys.ActionType, PDFName);
        return name ? name.asString() as ActionTypes : undefined;
    }

    getDest() {
        this.dict.context.lookupMaybe
        return this.dict.lookupMaybe(Keys.ActionDest, PDFString, PDFHexString, PDFArray);
    }
}