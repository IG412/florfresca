import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanComponent} from './plan.component';

@NgModule({
  imports: [
    CommonModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [PlanComponent],
  bootstrap: [PlanComponent]
})
export class PlanModule { }

