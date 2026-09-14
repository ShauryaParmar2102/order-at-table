// Create the base data model
export class DataModel {

    static data = null; // Store the model data

    // Set the data source for the model
    static setDataSource(data) {
        this.data = data;
    }

    // Select data from the model
    static select(filter) {

        // Check that the data source has been initialised
        if (!this.data) {
            throw new Error("Data source is not initialised")
        }

        // Check if a filter function was provided
        if(typeof filter === "function") {
            return this.data.filter(filter).map(e => e.clone()) // Return cloned items that match the filter
        } else {
            return this.data.map(e => e.clone()) // Return cloned copies of all items
        }
    }

    // Update matching entries in the data source
    static update(filter, entry) {
        // Check that the data source has been initialised
        if(!this.data) {
            throw new Error("Data source not initialised");
        }

        // Check that the filter is a function
        if(typeof filter !== "function") {
            throw new Error("Filter must be a predicate function.");
        }

        let count = 0; // Keep track of how many entries are updated

        // Loop through each entry in the data source
        for (let index = 0; index < this.data.length; index++) {
            if (filter(this.data[index])) { // Check if the current entry matches the filter
                this.data[index] = entry.clone(); // Replace the matching entry with a cloned copy
                count++;  // Increase the update count
            }
        }
        return count; // Return the number of updated entries
    }

    // Add a new entry to the data source
    static insert(entry) {

        // Check that the data source has been initialised
        if (!this.data) {
            throw new Error("Data source not initialised")
        }

        this.data.push(entry.clone()); // Add a cloned copy of the entry
    }
    // Delete entries that match the filter
    static delete(filter) {
        if (!this.data) {
            throw new Error("Data source not intialised");
        }
        // Make sure the filter is a function
        if (typeof filter !=="function") {
            throw new Error("Filter must be a predicate function.");
        }

        const countBefore = this.data.length; // Store how many entries existed before deleting
        this.data = this.data.filter(entry => !filter(entry)); // Keep only entries that do NOT match the filter
        return countBefore - this.data.length; // Return how many entries were deleted
    }

    // Create a copy of the current model object
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}