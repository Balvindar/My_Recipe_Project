import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elRef: ElementRef) { }

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen
    }



    // if you want to open dropdown from any where in screen
    // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    //     this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false
    // }

}