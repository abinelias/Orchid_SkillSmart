using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SpecialityCourse : MongoEntity
    {
        /// <summary>
        /// EducationId
        /// </summary>
        [BsonElement("EducationId")]
        public string EducationId { get; set; }

        /// <summary>
        /// CourseTitle
        /// </summary>
        [BsonElement("CourseTitle")]
        public string CourseTitle { get; set; }

        /// <summary>
        /// CourseDescription
        /// </summary>
        [BsonElement("CourseDescription")]
        public string CourseDescription { get; set; }

        /// <summary>
        /// Grade
        /// </summary>
        [BsonElement("Grade")]
        public string Grade { get; set; }

    }
}
