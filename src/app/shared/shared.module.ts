import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective } from './accordion/accordion.directive';
import { AccordionAnchorDirective, AccordionLinkDirective } from './accordion';



@NgModule({
  declarations: [
    AccordionDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AccordionDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective
  ]
})
export class SharedModule { }
