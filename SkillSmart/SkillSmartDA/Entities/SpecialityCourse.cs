using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SpecialityCourse : MongoEntity
    {
        [BsonElement("EducationId")]
        public string EducationId { get; set; }

        [BsonElement("CourseTitle")]
        public string CourseTitle { get; set; }

        [BsonElement("CourseDescription")]
        public string CourseDescription { get; set; }

        [BsonElement("Grade")]
        public string Grade { get; set; }

    }
}
