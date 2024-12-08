import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesAddComponent } from './archives-add.component';

describe('ArchivesAddComponent', () => {
  let component: ArchivesAddComponent;
  let fixture: ComponentFixture<ArchivesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
