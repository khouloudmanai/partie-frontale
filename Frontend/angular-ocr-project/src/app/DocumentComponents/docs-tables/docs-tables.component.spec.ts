import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsTablesComponent } from './docs-tables.component';

describe('DocsTablesComponent', () => {
  let component: DocsTablesComponent;
  let fixture: ComponentFixture<DocsTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
