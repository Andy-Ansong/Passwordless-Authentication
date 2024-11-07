import UserSeeder from '@seeders/seedUsers';
import EventSeeder from '@seeders/seedEvents';
import EmployeeSeeder from '@seeders/seedEmployees';

type Seeder = {
    run: () => void;
};

const seedersList: Seeder[] = [
    UserSeeder,
    EventSeeder,
    EmployeeSeeder
];

const seedDatabaseService = seedersList.forEach((seeder: Seeder) => {
    seeder.run();
});

export default seedDatabaseService;
