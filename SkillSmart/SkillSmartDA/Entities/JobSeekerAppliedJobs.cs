using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobSeekerAppliedJobs : MongoEntity
    {
        /// <summary>
        /// JobId
        /// </summary>
        [BsonElement("JobId")]
        public string JobId { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// DateApplied
        /// </summary>
        [BsonElement("DateApplied")]
        public string DateApplied { get; set; }

        /// <summary>
        /// CoverLetter
        /// </summary>
        [BsonElement("CoverLetter")]
        public string CoverLetter { get; set; }

    }
}

