// import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

// @Directive({
//     selector: '[appDropdown]'
// })

// export class DropdownDirective {
//     constructor(private elRef: ElementRef, private renderer: Renderer2) {}

//     @HostBinding('class.show') isOpen = false;

//     @HostListener('click') toggleOpen() {
//         this.isOpen = !this.isOpen;
//         let part = this.elRef.nativeElement.querySelector('.dropdown-menu');
//         if (this.isOpen) {
//             this.renderer.addClass(part, 'show');
//         } else {
//             this.renderer.removeClass(part, 'show');
//         }
//     }
// }


// import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
// @Directive({
//   selector: '[appDropdown]',
//   exportAs: 'appDropdown'
// })
// export class DropdownDirective {
//   @HostBinding('class.show') isOpen = false;
//   @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//     this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
//   }
//   constructor(private elRef: ElementRef) {}
// }