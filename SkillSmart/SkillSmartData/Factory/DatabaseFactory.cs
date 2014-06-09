﻿using System;
using System.Reflection;
using System.Configuration;
using MongoDB.Driver;

namespace SkillSmartData.Factory
{
    using Base;
    public sealed class DatabaseFactory
    {
        public static DatabaseFactorySectionHandler sectionHandler = (DatabaseFactorySectionHandler)ConfigurationManager.GetSection("DatabaseFactoryConfiguration");

        private DatabaseFactory() { }

        public static Database CreateDatabase()
        {
            // Verify a DatabaseFactoryConfiguration line exists in the web.config.
            if (sectionHandler.Name.Length == 0)
            {
                throw new Exception("Database name not defined in DatabaseFactoryConfiguration section of web.config.");
            }

            try
            {
                // Find the class
                Type database = Type.GetType(sectionHandler.Name);

                // Get it's constructor
                ConstructorInfo constructor = database.GetConstructor(new Type[] { });

                // Invoke it's constructor, which returns an instance.
                Database createdObject = (Database)constructor.Invoke(null);

                // Initialize the connection string property for the database.
                createdObject.connectionString = sectionHandler.ConnectionString;

                // Pass back the instance as a Database
                return createdObject;
            }
            catch (Exception excep)
            {
                throw new Exception("Error instantiating database " + sectionHandler.Name + ". " + excep.Message);
            }
        }

        public static MongoDatabase CreateMongoDatabase()
        {
            // Verify a DatabaseFactoryConfiguration line exists in the web.config.
            if (sectionHandler.Name.Length == 0)
            {
                throw new Exception("Database name not defined in DatabaseFactoryConfiguration section of web.config.");
            }

            try
            {
                //// Get a thread-safe client object by using a connection string
                var mongoClient = new MongoClient(sectionHandler.ConnectionString);

                //// Get a reference to a server object from the Mongo client object
                var mongoServer = mongoClient.GetServer();

                //// Get a reference to the "retrogamesweb" database object
                //// from the Mongo server object
                var db = mongoServer.GetDatabase(sectionHandler.ConnectionStringName);
                
                // Pass back the instance as a Database
                return db;
            }
            catch (Exception excep)
            {
                throw new Exception("Error instantiating database " + sectionHandler.Name + ". " + excep.Message);
            }
        }

    }
}
