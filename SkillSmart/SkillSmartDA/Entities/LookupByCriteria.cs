using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    public class LookupByCriteria: MongoEntity
    {
        /// <summary>
        /// Name
        /// </summary>
        [BsonElement("Name")]
        public string Name { get; set; }

        /// <summary>
        /// ParentId
        /// </summary>
        [BsonElement("ParentId")]
        public string ParentId { get; set; }

    }
}
