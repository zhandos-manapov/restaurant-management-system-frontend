import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective } from './accordion/accordion.directive';



@NgModule({
  declarations: [
    AccordionDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
