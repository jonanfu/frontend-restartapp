import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabscPage } from './tabsc.page';

describe('TabscPage', () => {
  let component: TabscPage;
  let fixture: ComponentFixture<TabscPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabscPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabscPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
