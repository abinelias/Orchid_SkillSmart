using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    public class LookupEntity: MongoEntity
    {
        /// <summary>
        /// Name
        /// </summary>
        [BsonElement("Name")]
        public string Name { get; set; }

    }
}
