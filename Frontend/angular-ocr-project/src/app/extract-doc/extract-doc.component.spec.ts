import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractDocComponent } from './extract-doc.component';

describe('ExtractDocComponent', () => {
  let component: ExtractDocComponent;
  let fixture: ComponentFixture<ExtractDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
