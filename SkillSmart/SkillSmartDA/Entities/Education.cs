using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Education : MongoEntity
    {
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        [BsonElement("InstitutionName")]
        public string InstitutionName { get; set; }

        [BsonElement("DegreeId")]
        public string DegreeId { get; set; }

        [BsonElement("StartDate")]
        public string StartDate { get; set; }

        [BsonElement("EndDate")]
        public string EndDate { get; set; }

        [BsonElement("MajorFocus")]
        public string MajorFocus { get; set; }

        [BsonElement("MinorFocus")]
        public string MinorFocus { get; set; }

        [BsonElement("CurrentlyEnrolled")]
        public string CurrentlyEnrolled { get; set; }

        [BsonElement("GPA")]
        public string GPA { get; set; }
    }
}
