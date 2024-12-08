import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesShowComponent } from './archives-show.component';

describe('ArchivesShowComponent', () => {
  let component: ArchivesShowComponent;
  let fixture: ComponentFixture<ArchivesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
