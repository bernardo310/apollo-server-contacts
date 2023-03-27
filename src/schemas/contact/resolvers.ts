
export default {
    Query: {
        contactByName: async (parent, { name }, { dataSources }, info) => {
            return await await dataSources.contactsDb.getContactByName(name);
        },
        contactByNumber: async (parent, { number }, { dataSources }, info) => {
            return await await dataSources.contactsDb.getContactByNumber(number);
        },
        contacts: async (parent, args, { dataSources }, info) => {
            return await await dataSources.contactsDb.getContacts();
        },
        contactsByName: async (parent, { name }, { dataSources }, info) => {
            return await await dataSources.contactsDb.getContactsByName(name);
        },
        contactsByNumber: async (parent, { number }, { dataSources }, info) => {
            return await await dataSources.contactsDb.getContactsByNumber(number);
        },
    },
    Mutation: {
        createContact: async (parent, { name, number }, { dataSources }, info) => {
            return await await dataSources.contactsDb.createContact({ name, number });
        },
        deleteContact: async (parent, { name, number }, { dataSources }, info) => {
            return await await dataSources.contactsDb.deleteContact({ name, number });
        },
    }
};
