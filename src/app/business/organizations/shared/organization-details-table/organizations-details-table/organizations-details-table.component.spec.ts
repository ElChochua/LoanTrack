import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDetailsTableComponent } from './organizations-details-table.component';

describe('OrganizationsDetailsTableComponent', () => {
  let component: OrganizationsDetailsTableComponent;
  let fixture: ComponentFixture<OrganizationsDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationsDetailsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
