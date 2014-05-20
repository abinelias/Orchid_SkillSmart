using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class RelatedExperience : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// JobSeekerSkillId
        /// </summary>
        [BsonElement("JobSeekerSkillId")]
        public string JobSeekerSkillId { get; set; }

        /// <summary>
        /// CompanyName
        /// </summary>
        [BsonElement("CompanyName")]
        public string CompanyName { get; set; }

        /// <summary>
        /// Position
        /// </summary>
        [BsonElement("Position")]
        public string Position { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        [BsonElement("StartDate")]
        public string StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        [BsonElement("EndDate")]
        public string EndDate { get; set; }
    }
}
