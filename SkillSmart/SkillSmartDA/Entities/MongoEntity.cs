using MongoDB.Bson.Serialization.Attributes;
using SkillSmart.Base.Entities;
using System;
namespace SkillSmartMongoDA.Entities
{
    public class MongoEntity : IEntity
    {
        [BsonId]
        public Guid Id { get; set; }
    }
}
