import { PDFDocument, PDFRef, PDFArray, PDFNull, PDFName } from "pdf-lib";
import { InsertRelationType, PDFOutlineItem, PDFOutlineService } from "./api/pdf-outline";
import { Bookmark, BookmarkItem, BookmarkTree } from "./pdf-bookmark.model";

export interface InsertionLocation {
    targetRef: PDFRef, 
    relType: InsertRelationType,
}

export class PDFBookmarkService {
    private pageRef = this.pdf.getPages().map(i => i.ref);
    private outlineService = new PDFOutlineService(this.pdf);

    constructor(private pdf: PDFDocument) { }

    getBookmarkTreeRoot(): BookmarkTree {
        let root = this.outlineService.getOutlineRoot();
        if(!root) {
            root = this.outlineService.createOutlineItem();
            this.outlineService.setOutlineRoot(root);
        }
        return {
            ref: root.ref,
            children: root.getChildren().map(i => this.getBookmarkItem(i))
        };
    }

    createBookmark(location: InsertionLocation, bookmark: Bookmark) {
        const item = this.outlineService.createOutlineItem();
        item.setTitle(bookmark.title);
        if (bookmark.page) {
            item.setDest(this.createSimpleDest(bookmark.page - 1))
        }
        const target = this.outlineService.getOutlineByRef(location.targetRef) as PDFOutlineItem;
        target.insert(item, location.relType);
    }

    editBookmark(ref: PDFRef, bookmark: Bookmark) {
        const item = this.outlineService.getOutlineByRef(ref) as PDFOutlineItem;
        item.setTitle(bookmark.title);
        if (bookmark.page) {
            item.setAnyDest(this.createSimpleDest(bookmark.page - 1));
        }
    }

    deleteBookmark(ref: PDFRef) {
        const target = this.outlineService.getOutlineByRef(ref) as PDFOutlineItem;
        this.outlineService.deleteOutlineItem(target);
    }

    private getBookmarkItem(item: PDFOutlineItem): BookmarkItem {
        const page = this.getDestPageNumber(item);
        return {
            ref: item.ref,
            page: page !== undefined ? page + 1 : undefined,
            title: item.getTitle(),
            children: item.getChildren().map(i => this.getBookmarkItem(i)),
        };
    }

    private getDestPageNumber(item: PDFOutlineItem): number | undefined {
        let dest = item.getAnyDest();
        if (dest instanceof PDFArray) {
            return this.pageRef.indexOf(dest.get(0) as PDFRef)
        }
        return undefined;
    }

    private createSimpleDest(pageIndex: number) {
        const page = this.pageRef[pageIndex];
        const array = PDFArray.withContext(this.pdf.context);
        array.set(0, page);
        array.set(1, PDFName.of("XYZ"));
        array.set(2, PDFNull);
        array.set(3, PDFNull);
        array.set(4, PDFNull);
        return array;
    }
}
