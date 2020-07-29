import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSprintComponent } from './list-sprint.component';

describe('ListSprintComponent', () => {
  let component: ListSprintComponent;
  let fixture: ComponentFixture<ListSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
