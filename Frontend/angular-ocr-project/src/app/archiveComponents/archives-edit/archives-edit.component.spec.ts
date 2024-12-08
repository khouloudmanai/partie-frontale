import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesEditComponent } from './archives-edit.component';

describe('ArchivesEditComponent', () => {
  let component: ArchivesEditComponent;
  let fixture: ComponentFixture<ArchivesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
