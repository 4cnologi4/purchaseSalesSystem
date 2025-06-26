import app from './app';
/*import { AppDataSource } from './database/data-source';

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
*/

// src/server.ts
app.listen(3000, () => console.log('Server running on http://localhost:3000'));