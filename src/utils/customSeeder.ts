import { Model, Document } from 'mongoose';

// Modify the CustomSeeder class to accept a type argument for the model
class CustomSeeder<T extends Document> {
  private Model: Model<T>;
  private data: T[];

  constructor(Model: Model<T>, data: T[]) {
    this.Model = Model;
    this.data = data;
  }

  // Check if the seeder should run (based on if documents exist in the collection)
  async shouldRun(): Promise<boolean> {
    const count = await this.Model.countDocuments().exec();
    return count === 0;
  }

  // Run the seeder by creating documents if necessary
  async run(): Promise<void> {
    if (await this.shouldRun()) {
      await this.Model.create(this.data);
    }
  }
}

export default CustomSeeder;