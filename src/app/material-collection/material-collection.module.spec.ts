import { MaterialCollectionModule } from './material-collection.module';

describe('MaterialCollectionModule', () => {
  let materialCollectionModule: MaterialCollectionModule;

  beforeEach(() => {
    materialCollectionModule = new MaterialCollectionModule();
  });

  it('should create an instance', () => {
    expect(materialCollectionModule).toBeTruthy();
  });
});
