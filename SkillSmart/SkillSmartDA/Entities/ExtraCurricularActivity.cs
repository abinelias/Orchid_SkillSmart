using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class ExtraCurricularActivity : MongoEntity
    {
        [BsonElement("EducationId")]
        public string EducationId { get; set; }

        [BsonElement("Activity")]
        public string Activity { get; set; }

        [BsonElement("StartDate")]
        public string StartDate { get; set; }

        [BsonElement("EndDate")]
        public string EndDate { get; set; }

    }
}
