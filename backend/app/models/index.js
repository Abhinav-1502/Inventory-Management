import User from './user.js';
import StorageLoc from './storageLoc.js'

// Exporting an object that aggregates all these models.
// This approach makes it easy to import and use these models elsewhere in the application.
export default {
    User,
    StorageLoc
}