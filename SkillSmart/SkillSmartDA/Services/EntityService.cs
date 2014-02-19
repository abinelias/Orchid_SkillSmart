using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Entities;
using SkillSmart.Base.Services;
using System;

namespace SkillSmartMongoDA.Services
{
    public abstract class EntityService<T> : IEntityService<T> where T : IEntity
    {
        protected MongoDatabase mongoDatabase;
        public MongoCollection<T> MongoCollection { get; private set; }

        public virtual void Create(T entity)
        {
            //// Save the entity with safe mode (WriteConcern.Acknowledged)
            var result = this.MongoCollection.Save(
                entity,
                new MongoInsertOptions
                {
                    WriteConcern = WriteConcern.Acknowledged
                });
        }

        protected EntityService(MongoDatabase mongoDb)
        {
            this.mongoDatabase = mongoDb;
            MongoCollection = mongoDatabase.GetCollection<T>(typeof(T).Name + "s");
        }

        public virtual T GetById(string id)
        {
            var entityQuery = Query<T>.EQ(e => e.Id, new Guid(id));
            return this.MongoCollection.FindOne(entityQuery);
        }


        public void Delete(T entity)
        {
            var entityQuery = Query<T>.EQ(e => e.Id, entity.Id);
            this.MongoCollection.Remove(entityQuery);
        }


        public void Update(T entity)
        {   
            var result = this.MongoCollection.Save(entity);
        }
    }
}
