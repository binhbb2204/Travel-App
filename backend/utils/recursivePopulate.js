import mongoose from 'mongoose';

export const recursivePopulate = async (doc, populateFields) => {
    const promises = populateFields.map(async (field) => {
        const populated = await doc.populate(field);
        if (Array.isArray(populated[field.path])) {
            const nestedPopulateFields = field.populate || [];
            const nestedPromises = populated[field.path].map(async (nestedDoc) => {
                return recursivePopulate(nestedDoc, nestedPopulateFields);
            });
            await Promise.all(nestedPromises);
        }
        return populated;
    });
    await Promise.all(promises);
    return doc;
};
