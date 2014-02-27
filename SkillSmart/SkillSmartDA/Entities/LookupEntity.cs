using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    public class LookupEntity: MongoEntity
    {
        [BsonElement("Name")]
        public string Name { get; set; }

    }
}
