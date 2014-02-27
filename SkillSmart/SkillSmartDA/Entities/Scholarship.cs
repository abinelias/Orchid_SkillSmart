using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Scholarship : MongoEntity
    {
        [BsonElement("EducationId")]
        public string EducationId { get; set; }

        [BsonElement("Scholarship")]
        public string ScholarshipCheck { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        [BsonElement("ScholarshipDescription")]
        public string ScholarshipDescription { get; set; }

        [BsonElement("Value")]
        public string Value { get; set; }

    }
}
