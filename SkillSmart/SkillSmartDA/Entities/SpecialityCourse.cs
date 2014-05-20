using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SpecialityCourse : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CourseName
        /// </summary>
        [BsonElement("CourseName")]
        public string CourseName { get; set; }

        /// <summary>
        /// CourseDescription
        /// </summary>
        [BsonElement("CourseDescription")]
        public string CourseDescription { get; set; }

    }
}
