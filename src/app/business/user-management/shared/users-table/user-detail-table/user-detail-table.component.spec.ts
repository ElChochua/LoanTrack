import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailTableComponent } from './user-detail-table.component';

describe('UserDetailTableComponent', () => {
  let component: UserDetailTableComponent;
  let fixture: ComponentFixture<UserDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
