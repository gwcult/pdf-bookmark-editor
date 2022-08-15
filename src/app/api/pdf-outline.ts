import { PDFDocument, PDFName, PDFDict, PDFRef, PDFArray, PDFString, PDFHexString, PDFObject, PDFNumber, PDFNull } from "pdf-lib";
import { PDFAction } from "./pdf-action";
import { Keys } from "./pdf-keys";

export class PDFOutlineService {
    context = this.pdf.context;

    constructor(private pdf: PDFDocument) { }

    setOutlineRoot(item: PDFOutlineItem) {
        item.dict.set(Keys.Type, Keys.Outline);
        this.pdf.catalog.set(Keys.Outline, item.ref);
    }

    getOutlineRoot(): PDFOutlineItem | undefined {
        const ref = this.pdf.catalog.get(Keys.Outline) as PDFRef;
        const dict = this.pdf.catalog.lookupMaybe(Keys.Outline, PDFDict);
        return dict ? new PDFOutlineItem(ref, dict) : undefined;
    }

    getOutlineByRef(ref: PDFRef): PDFOutlineItem | undefined {
        const dict = this.context.lookupMaybe(ref, PDFDict);
        return dict ? new PDFOutlineItem(ref, dict) : undefined;
    }

    createOutlineItem(): PDFOutlineItem {
        const dict = PDFDict.withContext(this.context);
        const ref = this.context.register(dict);
        return new PDFOutlineItem(ref, dict);
    }

    deleteOutlineItem(item: PDFOutlineItem) {
        const parent = item.getParent();
        if (parent) {
            parent.remove(item);
        }
        this.deleteOutlineItemR(item);
    }

    private deleteOutlineItemR(item: PDFOutlineItem) {
        this.context.delete(item.ref);
        item.getChildren().forEach(child => this.deleteOutlineItemR(child));
    }
}

export type InsertRelationType = 'before' | 'after' | 'inside';

export class PDFOutlineItem {
    constructor(
        readonly ref: PDFRef,
        readonly dict: PDFDict,
    ) {}

    getFirst() {
        return this.getByName(Keys.First);
    }

    setFirst(item: PDFOutlineItem | undefined) {
        this.setByName(Keys.First, item);
    }

    getLast() {
        return this.getByName(Keys.Last);
    }

    setLast(item: PDFOutlineItem | undefined) {
        this.setByName(Keys.Last, item);
    }

    getNext() {
        return this.getByName(Keys.Next);
    }

    setNext(item: PDFOutlineItem | undefined) {
        this.setByName(Keys.Next, item);
    }

    getPrev() {
        return this.getByName(Keys.Prev);
    }

    setPrev(item: PDFOutlineItem | undefined) {
        this.setByName(Keys.Prev, item);
    }

    getParent() {
        return this.getByName(Keys.Parent);
    }

    setParent(item: PDFOutlineItem | undefined) {
        this.setByName(Keys.Parent, item);
    }

    getCount() {
        const count = this.dict.lookupMaybe(Keys.Count, PDFNumber);
        return count ? count.asNumber() : 0;
    }

    setCount(count: number) {
        this.dict.set(Keys.Count, PDFNumber.of(count));
    }

    getTitle() {
        return this.dict.lookup(Keys.Title, PDFString, PDFHexString).decodeText();
    }

    setTitle(title: string) {
        return this.dict.set(Keys.Title, PDFHexString.fromText(title));
    }

    getAction() {
        const ref = this.dict.get(Keys.Action) as PDFRef;
        const dict = this.dict.lookupMaybe(Keys.Action, PDFDict);
        return dict ? new PDFAction(ref, dict) : undefined;
    }

    getDest() {
        return this.dict.lookupMaybe(Keys.Dest, PDFString, PDFHexString, PDFArray);
    }

    getAnyDest(): PDFArray | PDFHexString | PDFString | undefined {
        const action = this.getAction();
        const actionDest = action ? action.getDest() : undefined;
        return this.getDest() || actionDest
    }

    setAnyDest(dest: PDFArray) {
        if (this.dict.has(Keys.Action)) {
            this.dict.delete(Keys.Action)
        }
        this.setDest(dest);
    }

    setDest(arr: PDFArray) {
        this.dict.set(Keys.Dest, arr);
    }

    private getByName(key: PDFName) {
        const ref = this.dict.get(key) as PDFRef;
        const dict = this.dict.lookupMaybe(key, PDFDict);
        return dict ? new PDFOutlineItem(ref, dict) : undefined;
    }

    private setByName(key: PDFName, item: PDFOutlineItem | undefined) {
        if (item) {
            this.dict.set(key, item.ref);
        } else {
            this.dict.delete(key);
        }
    }

    insert(item: PDFOutlineItem, relType: InsertRelationType) {
        if (relType == 'after') {
            this.getParent()?.insertBetween(item, this, this.getNext());
        } else if (relType == 'before') { 
            this.getParent()?.insertBetween(item, this.getPrev(), this);
        } else {
            this.insertBetween(item, this.getLast());
        }
    }

    private insertBetween(node: PDFOutlineItem, prev?: PDFOutlineItem, next?: PDFOutlineItem) {
        if (prev) {
            node.setPrev(prev);
            prev.setNext(node);
        } else {
            this.setFirst(node);
        }
        if (next) {
            node.setNext(next);
            next.setPrev(node);
        } else {
            this.setLast(node);
        }
        node.setParent(this);
        this.setCount(this.getCount() + 1);
        
    }

    remove(node: PDFOutlineItem) {
        const prev = node.getPrev();
        const next = node.getNext();
        if (prev) {
            prev.setNext(next);
        } else {
            this.setFirst(next);
        }
        if (next) {
            next.setPrev(prev);
        } else {
            this.setLast(prev);
        }
        this.setCount(this.getCount() + 1);
    }

    getChildren(): PDFOutlineItem[] {
        const children = [];
        let child = this.getFirst();
        while (child) {
            children.push(child);
            child = child.getNext();
        }
        return children;
    }
}